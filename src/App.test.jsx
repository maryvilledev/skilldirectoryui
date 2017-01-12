import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
 
  it('matches the stored snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
