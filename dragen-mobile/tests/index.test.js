
// 测试component入口文件
describe('antd dist files', () => {
  it('exports modules correctly', () => {
    const dragen = require('../components'); // eslint-disable-line global-require
    expect(Object.keys(dragen)).toMatchSnapshot();
  });
});
