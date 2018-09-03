jest.mock('./store');
import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

describe('App', () => {
  it('should render without failure', () => {
    const component = shallow(<Provider store={store}><App /></Provider>);

    expect(component.length).toBe(1);
  });
});