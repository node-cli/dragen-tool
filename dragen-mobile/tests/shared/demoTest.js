// 模式匹配
import glob from 'glob';
// 日期？？？
import MockDate from 'mockdate';
// 渲染 shallow, mount, render
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import renderer from 'react-test-renderer';

export function webDemoTest(component, options = {}){
  const files = glob.sync(`./component/${component}/demo/*.md`);
  files.forEach((file)=>{
    let testMethod = options.skip === true ? test.skip : test;
    if(Array.isArray(options.skip) && options.skip.some(c => { file.includes(c); })){
      testMethod = test.skip;
    }
    testMethod(`renders ${file} corrently`, ()=>{
      MockDate.set('08/082018', -60);
      // 将md文件，渲染后的内容
      const demo = require(`../.${file}`);
      const wrapper = render(demo);

      // 将其转换为json再比较
      expect(renderToJson(wrapper)).toMatchSnapshot();
      MockDate.reset();
    })
  })
}
