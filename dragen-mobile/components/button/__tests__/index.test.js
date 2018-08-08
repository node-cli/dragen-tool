import {render} from 'enzyme';
import {renderToJson} from 'enzyme-to-json';
import Button from '../index';
describe('Button', ()=>{
  it('renders corrently', ()=>{
    const wrapper = render(<Button>foo</Button>);
    expect(renderTOJson(wrapper)).toMatchSnapshot();
  });
});
