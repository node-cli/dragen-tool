module.exports = {
  path: './',
  templates: [
    {
      content: string,
      name: 'mdTemplate'
    },
    template: {
      content: string,
      name: 'ReactTemplate'
    }
  ],
  dir: [
    {
      fileName: 'index.md',
      templte: 'mdTemplate'
    },
    {
      fileName: 'index.tsx',
      templte: 'ReactTemplate'
    },
    {
      fileName: 'PropsType.tsx'
    },
    {
      dirName: '__tests__',
      subDir:[{
        fileNames: ['index.test.js', 'demo.test.js']
      }]
    },
    {
      dirName: 'demo',
      subDir:[{
        fileNames: ['basic.md']
      }]
    },
    {
      dirName: 'style',
      subDir:[{
        fileNames: ['index.less', 'index.tsx']
      }]
    }
  ]
}
