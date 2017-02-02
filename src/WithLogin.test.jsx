import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { mount, shallow } from 'enzyme';

import WithLogin from './WithLogin.jsx';

describe('<WithLogin />', () => {
  describe('when the user is not logged in', () => {
    cookie.remove('isLoggedIn');
    it('should not display its children', () => {
      const child = (
        <span>Foo</span>
      );
      const wrapper = shallow(
        <WithLogin>
          {child}
        </WithLogin>
      );
      expect(wrapper.contains(child)).toBe(false);
    });
  });
  describe('when the user is logged in', () => {
    it('should display its children', () => {
      cookie.save('isLoggedIn', true);
      const child = (
        <span>Foo</span>
      );
      const wrapper = mount(
        <WithLogin>
          {child}
        </WithLogin>
      );
      expect(wrapper.contains(child)).toBe(true);
      cookie.remove('isLoggedIn');
    });
  });
});
