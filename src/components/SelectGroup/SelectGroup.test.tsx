import * as React from 'react';
import { shallow } from 'enzyme';
import SelectGroup from './SelectGroup';
import Select from '../Select/Select';

describe('Button', () => {
  it('should render without any children should throw error', () => {
    const wrapper = () => {
      shallow(<SelectGroup name="test"/>);
    };

    expect(wrapper).toThrow(TypeError);
  });

  it('should render with children without failure', () => {
    const component = shallow(
    <SelectGroup name="test">
      <Select name="test" title="test" options={[]}/>
      <Select name="test" title="test" options={[]}/>
    </SelectGroup>
  );

    expect(component.length).toBe(1);
  });  
});