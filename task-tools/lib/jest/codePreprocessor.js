const crypto = require('crypto');
const { createTransformer } = require('babel-jest');
const getBabelCommonConfig = require('../babelConfig');
const rewriteSource = require('./rewriteSource');
const tsJest = require('ts-jest');
const pkg = require('../../package.json');

const libDir = process.env.LIB_DIR || 'components';

function processDemo({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        rewriteSource(t, path, libDir);
      },
    },
  };
}

module.exports = {
  process(src, path, config, transformOptions) {
    global.__clearBabelAntdPlugin && global.__clearBabelAntdPlugin(); // eslint-disable-line
    const babelConfig = getBabelCommonConfig();
    babelConfig.plugins = [...babelConfig.plugins];

      // babel编译配置加上处理dom组件配置
    if (/\/demo\//.test(path)) {
      babelConfig.plugins.push(processDemo);
    }

    // babel配置加上引入组件
    babelConfig.plugins.push([
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'dragen-mobile',
        libraryDirectory: '../../../../components',
      },
    ]);

    const isTypeScript = path.endsWith('.ts') || path.endsWith('.tsx');
    const isJavaScript = path.endsWith('.js') || path.endsWith('.jsx');

    if (isTypeScript) {
      config.globals['ts-jest'] = config.globals['ts-jest'] || {};
      config.globals['ts-jest'].babelConfig = babelConfig;

      // 进行测试
      return tsJest.process(src, path, config, transformOptions);
    }
    // 创建转义代码
    const babelJest = createTransformer(babelConfig);
    const fileName = isJavaScript ? path : 'file.js';
    return babelJest.process(src, fileName, config, transformOptions);
  },

  getCacheKey(...args) {
    return crypto
      .createHash('md5')
      .update(tsJest.getCacheKey.call(tsJest, ...args))
      .update('\0', 'utf8')
      .update(libDir)
      .update('\0', 'utf8')
      .update(pkg.version)
      .digest('hex');
  },
};
