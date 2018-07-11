import * as React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render without failure', () => {
    const component = shallow(<App name="test"/>);
    
    expect(component.length).toBe(1);
  });
})