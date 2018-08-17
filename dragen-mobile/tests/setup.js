const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

console.log('配置时调用的');
Enzyme.configure({ adapter: new Adapter() });
