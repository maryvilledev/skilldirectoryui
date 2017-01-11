import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Team from './Team';

describe('<Team />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Team />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Team />);
    expect(wrapper).toMatchSnapshot();
  });
});