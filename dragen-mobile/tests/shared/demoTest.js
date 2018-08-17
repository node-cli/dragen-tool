// 模式匹配
import glob from 'glob';
// 日期？？？
import MockDate from 'mockdate';
// 渲染 shallow, mount, render
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';

export function webDemoTest(component, options = {}){
  const files = glob.sync(`./component/${component}/demo/*.md`);
  // 将demo下的md文件
  files.forEach((file)=>{
    // 有skip属性时跳过测试，test是什么？
    let testMethod = options.skip === true ? test.skip : test;
    if(Array.isArray(options.skip) && options.skip.some(c => { file.includes(c); })){
      testMethod = test.skip;
    }
    // testMethod调用的是？？？
    testMethod(`renders ${file} corrently`, ()=>{
      MockDate.set('08/082018', -60);
      // 将md文件，渲染后的内容
      const demo = require(`../.${file}`);
      console.log(demo);
      const wrapper = render(demo);

      // 将其转换为json再比较
      expect(toJson(wrapper)).toMatchSnapshot();
      MockDate.reset();
    })
  })
}
