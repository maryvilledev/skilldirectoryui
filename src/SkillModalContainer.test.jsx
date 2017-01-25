import React from 'react';
import { mount } from 'enzyme';
import SkillModalContainer from './SkillModalContainer.jsx';

describe('<SkillModalContainer />', () => {
  it('should be empty by default', () => {
    const skillModalWrapper = mount(<SkillModalContainer />);
    expect(skillModalWrapper.prop('displayedModalType')).toBe('');
    expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
  });
});
