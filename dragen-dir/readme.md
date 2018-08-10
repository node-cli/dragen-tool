## 插件配置用例

````js
module.exports = {
  path: './',
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
````

## 模板配置用例

```js

module.exports = function(component){
  let Upper = `${component.substr(0,1).toUpperCase()}${component.substr(1)}`;
  let indexMd = `
  ---
  category: Components
  type: Data Entry
  title: ${Upper}
  subtitle:
  ---


  ## API

  属性 | 说明 | 类型 | 默认值
  ----|-----|------|------
  `;
  let indexTsx = `
  import React from 'react';
  import classnames from 'classnames';
  import BasePropsType from './PropsType';

  export interface ${Upper}Props extends BasePropsType {
    prefixCls?: string;
    className?: string;
  }

  export default class ${Upper} extends React.Component<${Upper}Props, any> {
    static defaultProps = {

    };
    render(){
      return(

      );
    }
  }
  `;
  let propsTsx = `
    export default interface ${Upper}Props{

    }
  `;
  let testIndex = `
  import React from 'react';
  import { render } from 'enzyme';
  import { renderToJson } from 'enzyme-to-json';
  import ${Upper} from '../index';

  describe('${Upper}', () => {
    it('renders correctly', () => {
      const wrapper = render(<${Upper}>foo</${Upper}>);
      expect(renderToJson(wrapper)).toMatchSnapshot();
    });
  });
  `;
  let testDemo = `
  import { webDemoTest } from '../../../tests/shared/demoTest';

  webDemoTest('${component}');
  `;
  let basicMdTemplate = `
  Usage cases.

  \`\`\`\`jsx
  import { List, ${Upper} } from 'dragen-mobile';
  \`\`\`\`

  \`\`\`\`css


  \`\`\`\`
  `;
  let styleIndex = `
  import '../../style/';
  import './index.less';
  `;

  return {
    indexMd: indexMd,
    indexTsx: indexTsx,
    propsTsx: propsTsx,
    testIndex: testIndex,
    testDemo: testDemo,
    basicMdTemplate: basicMdTemplate,
    styleIndex: styleIndex
  };
}
```

### 后续支持构建过的，重新构建。。。
