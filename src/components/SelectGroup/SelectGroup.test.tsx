import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import SelectGroup, { SelectGroupState } from './SelectGroup';
import Select from '../Select/Select';

describe('SelectGroup', () => {
  const countries = [
    {id: '1', name: 'Poland'},
    {id: '2', name: 'Sweden'},
    {id: '3', name: 'United Kingdom'},
  ];

  const cities = [
    {id: '11', name: 'Gdansk'},
    {id: '12', name: 'Warsaw'},
    {id: '13', name: 'Krakow'},
  ];

  it('should throw error without any children', () => {
    const wrapper = () => {
      shallow(<SelectGroup name="test" />);
    };

    expect(wrapper).toThrow(TypeError);
  });

  it('should throw error if only one child exists', () => {
    const wrapper = () => {
      shallow(
      <SelectGroup name="test" >
        <Select name="test" title="test" options={[]} />
      </SelectGroup>
      );
    };

    expect(wrapper).toThrow(TypeError);
  });

  it('should render correctly', () => {
    const tree = renderer.create(
      <SelectGroup name="area">
        <Select name="country" title="country" options={[]} />
        <Select name="city" title="city" options={[]} />
      </SelectGroup>
    ).toJSON();

    expect(tree).toMatchSnapshot();    
  });

  it('should have the default state correct', () => {
    [
      [undefined, undefined],
      ['1', undefined],
      ['1', '12']
    ].forEach((current: [string, string]) => {
      const component = shallow(
        <SelectGroup name="area">
          <Select name="country" title="country" options={countries} current={current[0]}/>
          <Select name="city" title="city" options={cities} current={current[1]}/>
        </SelectGroup>
      );
  
      const state = component.state() as SelectGroupState;
      expect(state.currentValue).toEqual(current);
    });
  });

  it('should fire change event with correct value', () => {
    const onChange = jest.fn();

    const component = mount(
      <SelectGroup name="area" onChange={onChange}>
        <Select name="country" title="country" options={countries}/>
        <Select name="city" title="city" options={cities}/>
      </SelectGroup>
    );

    component.find('select[name="country"]').simulate('change', { target: {value: '1'}});

    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('should enable next select on change', () => {
    const component = mount(
      <SelectGroup name="area">
        <Select name="country" title="country" options={countries}/>
        <Select name="city" title="city" options={cities}/>
      </SelectGroup>
    );

    const citySelect = component.find(Select).last();
    expect(citySelect.props().disabled).toBeTruthy();

    component.find('select[name="country"]').simulate('change', {target: {value: '1'}});

    expect(component.find(Select).last().props().disabled).toBeFalsy();
  });

  it('should enable next select on change', () => {
    const component = mount(
      <SelectGroup name="area">
        <Select name="country" title="country" options={countries} current="1"/>
        <Select name="city" title="city" options={cities}/>
      </SelectGroup>
    );

    // const citySelect = component.find(Select).last();
    // expect(citySelect.props().disabled).toBeTruthy();

    // component.find('select[name="country"]').simulate('change', {target: {value: '1'}});

    // expect(component.find(Select).last().props().disabled).toBeFalsy();
  });   
});