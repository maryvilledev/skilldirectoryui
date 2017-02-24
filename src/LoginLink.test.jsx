import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { Button } from 'react-bootstrap';
import { mount, shallow } from 'enzyme';

import LoginLink from './LoginLink.jsx';

describe('<LoginLink />', () => {
  describe('when the user is not logged in', () => {
    beforeEach(() => {
      cookie.save('isLoggedIn', false);
    });
    afterEach(() => {
      cookie.remove('isLoggedIn');
    });
    it('should display a link to Github', () => {
      const loginLink = shallow(<LoginLink />);
      const githubLink = loginLink.find(Button);
      expect(githubLink).toHaveLength(1);
    });
  });
  describe('when the user is logged in', () => {
    beforeEach(() => {
      cookie.save('isLoggedIn', true);
    });
    afterEach(() => {
      cookie.remove('isLoggedIn');
      cookie.remove('name');
      cookie.remove('login');
    });
    it('should not display the link to Github', () => {
      const loginLink = shallow(<LoginLink />);
      const githubLink = loginLink.find(Button);
      expect(githubLink).toHaveLength(0);
    });
  });
});
