
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
