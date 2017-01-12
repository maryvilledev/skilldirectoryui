import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});