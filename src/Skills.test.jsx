import React from 'react';
import ReactDOM from 'react-dom';
import Skills from './Skills';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<Skills />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Skills />, div);
    });

    it('matches the stored snapshot', () => {
      const wrapper = shallow(<Skills />);
      expect(wrapper.get(0)).toMatchSnapshot();
    });

    it('has a Button that opens the Modal', () => {
      const wrapper = mount(<Skills />);
      expect(wrapper.find('Modal').prop('isOpen')).toBe(false);
      wrapper.find('Button').simulate('click');
      expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });
});
