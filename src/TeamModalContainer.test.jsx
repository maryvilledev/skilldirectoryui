import React from 'react';
import { mount } from 'enzyme';
import TeamModalContainer from './TeamModalContainer.jsx';

describe('<TeamModalContainer />', () => {
  it('should be empty by default', () => {
    const teamModalContainer = mount(<TeamModalContainer />);
    expect(teamModalContainer.prop('displayedModalType')).toBe('');
    expect(teamModalContainer.prop('isModalDisplayed')).toBe(false);
  });
});
