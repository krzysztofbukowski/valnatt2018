import * as React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  it('should render without failure', () => {
    const component = shallow(<Home />);

    expect(component.length).toBe(1);
  });
})