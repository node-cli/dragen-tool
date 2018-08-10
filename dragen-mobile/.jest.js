const libDir = process.env.LIB_DIR;

const transformIgnorePatterns = [
  '/dist/',
  'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
];

module.exports = {
  // 测试之前进行配置或设置测试环境
  setupFiles: [
    './tests/setup.js'
  ],
  // 支持加载的文件名
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'md',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '_site',
    'site'
  ],
  // 用于编译，配置babel-jest使用
  transform: {
    '\\.tsx?$': './node_modules/task-tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/task-tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/task-tools/lib/jest/demoPreprocessor',
  },
  // 需要测试的目录
  testRegex: libDir === 'dist' ? 'demo\\.test\\.js$' : '.*\\.test\\.js$',
  // glob模式匹配，测试文件
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/*.native.{ts,tsx}',
    '!components/*/style/*.{ts,tsx}',
  ],
  transformIgnorePatterns,
  testEnvironment: 'jsdom',
};

// test('say', ()=>{ expect()... })
// resolves, rejects
// async/await
// before, after
// describe 块，测试分组
