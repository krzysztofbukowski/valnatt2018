import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should render without failure', () => {
    const component = shallow(<Button label="Click me"/>);

    expect(component.length).toBe(1);
  });

  it('should render label', () => {
    const component = shallow(<Button label="Click me"/>);

    expect(component.length).toBe(1);
    expect(component.text()).toEqual('Click me');
  });  
});