const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./getTSCommonConfig')();
const babel = require('gulp-babel');
const babelConfig = require('./babelConfig');
const replaceLib = require('./replaceLib');
const tsDefaultReporter = ts.reporter.defaultReporter();
// 将流转化 buffer, 文件
const through2 = require('through2');
// 监听, 事件包含add, change, unlink; add..., unwatch, close方法
const watch = require('gulp-watch');
// 删除文件夹
const rimraf = require('rimraf');
const webpack = require('webpack');
const merge2 = require('merge2');
const stripCode = require('gulp-strip-code');
// 处理参数
const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');
const install = require('./install');
const runCmd = require('./runCmd');



gulp.task('clean', ()=>{
  rimraf.sync(path.join(cwd, '_site'));
  rimraf.sync(path.join(cwd, '_data'));
});
gulp.task('dist', (done)=>{
  dist(done);
});

// webpack编译
function dist(done){
  rimraf.sync(path.join(cwd, 'dist'));
  process.env.RUN_ENV = 'Production';
  const webpackConfig = require(path.join(cwd, 'webpack.config.js'));
  webpack(webpackConfig, (err, stats)=>{
    // 编译错误显示
    if(err){
      console.error(err.stack || err);
      if(err.details){
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();
    if(stats.hasError()){
      console.error(info.errors);
    }
    if(stats.hasWarnings()){
      console.warn(info.warnings);
    }

    // 显示编译过程内容
    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);
    done(0);
  })

 }

gulp.task('compile', ['compile-with-es'], ()=>{
  compile();
});

gulp.task('compile-with-es',()=>{
  compile(false);
});

function babelify(js, modules){
  const babelCfg = babelConfig(modules);
  delete babelCfg.cacheDirectory;
  if(modules === false){
    // ???
    babelCfg.plugins.push(replaceLib);
  }
  let stream = js.pipe(babel(babelCfg))
    .pipe(through2.obj(function z(file, encoding, next){
      // ?? babel处理之后，对路径与内容的处理
      this.push(file.clone())
      if (file.path.match(/\/style\/index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf('\'react-native\'') !== -1) {
          // actually in antd-mobile@2.0, this case will never run,
          // since we both split style/index.mative.js style/index.js
          // but let us keep this check at here
          // in case some of our developer made a file name mistake ==
          next();
          return;
        }
        file.contents = Buffer.from(content
          .replace(/\/style\/?'/g, '/style/css\'')
          .replace(/\.less/g, '.css'));
        file.path = file.path.replace(/index\.js/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }));
    if (modules === false) {
      // ???
      stream = stream.pipe(stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }));
    }
    return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

// 编译所有文件
function compile(modules){
  // 处理less编译 并输出

  // png或svg

  // ts
  // 工具目录，里面直接写项目目录？？？
  let error= 0;
  const source = [
    'components/**/*.tsx',
    'typings/**/*.d.ts'
  ]
  if(tsConfig.allowJs){
    source.unshift('component/**/*.jsx');
  }
  // 编译ts，并设置了错误与完成的处理，ts编译的结果与提供的方法？？？
  const tsResult = gulp.src(source).pipe(ts(tsConfig, {
    error(e){
      tsDefaultReporter.error(e);
      error = 1;
    },
    finish: tsDefaultReporter.finish
  }));

  function check(){
    if(error && !argv['ignore-error']){
      process.exit(1);
    }
  }
  // 监听事件，对错误进行处理
  tsResult.on('finish', check);
  tsResult.on('end', check);
  // ts编译结果再进行babel处理
  const tsFilesStream = babelify(tsResult.js, modules);
  // 这两个目录？？？
  const tsd = tsResult.dts.pipe(gulp.dest(module === false ? esDir : libDir));
  // merge2的作用 ？？？
  return merge2([tsFilesStream, tsd]);
}

gulp.task('install', (done)=>{
  install(done);
});

gulp.task('pub')

gulp.task('guard', (done)=>{

});

const tsFiles = [
  '**/*.ts',
  '**/*.tsx',
  '!node_modules/**/*.*',
  'typings/**/*.d.ts',
];

gulp.task('watch-tsc', ['tsc'], ()=>{
  watch(tsFiles, (f)=>{
    //  unlink是什么意思？
    if(f.event === 'unlink'){
      const fileToDelete = f.path.replace(/\.tsx?$/, '.js');
      if (fs.existsSync(fileToDelete)) {
        fs.unlinkSync(fileToDelete);
      }
      return;
    }
    const myPath = path.relative(cwd, f.path);
    compileTs(gulp.src([
      myPath,
      'typings/**/*.d.ts'
    ]))
  })
});

// 根据ts配置编译 ts, 并输出相应的js文件
gulp.task('tsc', ()=>{
  return compileTs(gulp.src(tsFiles, {
    base: cwd
  }))
});

function compileTs(stream){
  return stream.pipe(ts(tsConfig)).js
  .pipe(through2.obj((file, encoding, next)=>{
    file.path = file.path.replace(/\.[jt]sx$/, '.js');
    this.push(file);
    next();
  }))
  .pipe(gulp.dest(process.cwd()));
}
