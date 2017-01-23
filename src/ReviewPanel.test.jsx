import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ReviewPanel from './ReviewPanel';

describe('<ReviewPanel />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReviewPanel />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<ReviewPanel />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
