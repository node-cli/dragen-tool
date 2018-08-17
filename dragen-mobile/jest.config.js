const libDir = process.env.LIB_DIR;

const transformIgnorePatterns = [
  '/dist/',
  'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
];

module.exports = {
  // 支持加载的文件名
  modulePaths: [
    './components'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'md',
  ],
  verbose: true,
  // projects: [{
  //   runner: 'jest-runner',
  //   testURL: "http://localhost/",
  // }],
  // 测试之前进行配置或设置测试环境
  setupFiles: [
    './tests/setup.js'
  ],
  // moduleNameMapper 需要mock处理掉的资源, 如样式
  testPathIgnorePatterns: [
    '/node_modules/',
    '_site',
    'site',
    '__snapshots__'
  ],
  // 用于编译，配置babel-jest使用
  // transform: {
  //   '\\.tsx?$' :'babel-jest',
  //   '\\.js?$' :'babel-jest',
  //   // '\\.tsx?$' :'babel-jest',
  // },
  transform: {
    '\\.tsx?$': './node_modules/task-tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/task-tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/task-tools/lib/jest/demoPreprocessor',
  },
  // 需要测试的目录
  testRegex: libDir === 'dist' ? 'demo\\.test\\.js$' : '.*\\.test\\.js$',
  // glob模式匹配，测试文件，覆盖率报告 coverageDirectory, coverageReporters
  // 是否收集覆盖率collectCoverage
  // mapCoverage 代码是经过babel-jest转译，让jest能够把测试结果定位到源码上，而非编译的代码上
  // verbose显示每个测试用例通过与否

  // 是否收集覆盖率
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/*.native.{ts,tsx}',
    '!components/*/style/*.{ts,tsx}',
  ],
  transformIgnorePatterns,
  testEnvironment: 'jsdom',
  testURL: "http://localhost/",
  testRegex: "[a-z]+\.test\.js$"
  // setupTestFrameworkScriptFile: "./jest.setup.js"
};

// test('say', ()=>{ expect()... })
// resolves, rejects
// async/await
// before, after
// describe 块，测试分组
