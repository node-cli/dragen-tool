module.exports = {
  path: './components/',
  template:'./createDir.template.js',
  dir: [
    {
      fileName: 'index.md',
      template: 'indexMd'
    },
    {
      fileName: 'index.tsx',
      template: 'indexTsx'
    },
    {
      fileName: 'PropsType.tsx',
      template: 'propsTsx'
    },
    {
      dirName: '__tests__',
      subDir:[{
        // fileNames:[]只有文件名
        // 有模板配置
        files: [{
          fileName: 'index.test.js',
          template: 'testIndex',
        },{
          template: 'testDemo',
          fileName: 'demo.test.js'
        }]
      }]
    },
    {
      dirName: 'demo',
      subDir:[{
        files:[{
        fileName: 'basic.md',
        template: 'basicMdTemplate',
        }]
      }]
    },
    {
      dirName: 'style',
      subDir:[{
        fileNames: ['index.less'],
        files:[{
          fileName: 'index.tsx',
          template: 'styleIndex',
        }]
      }]
    }
  ]
}
