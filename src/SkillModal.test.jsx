import React from 'react';
import { mount } from 'enzyme';
import SkillModal from './SkillModal.jsx';

describe('<SkillModal />', () => {
  it('should be empty by default', () => {
    const skillModalWrapper = mount(<SkillModal />);
    expect(skillModalWrapper.prop('displayedModalType')).toBe('');
    expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
  });
});
