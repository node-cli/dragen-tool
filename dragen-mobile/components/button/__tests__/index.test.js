import {render} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Button from '../index';
describe('Button', ()=>{
  it('renders corrently', ()=>{
    const wrapper = render(<Button>foo</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
