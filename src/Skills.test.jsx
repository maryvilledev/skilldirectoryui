import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import SkillModal from './SkillModal.jsx';
import Skills from './Skills';

describe('<Skills />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Skills />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Skills />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('has a closeModal function to close all modals', () => {
    const wrapper = mount(<Skills />);
    const skillModalWrapper = wrapper.find(SkillModal);
    const addSkillButton = wrapper.find('[name="AddSkill"]');
    expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
    expect(skillModalWrapper.prop('displayedModalType')).toBe('');
    addSkillButton.simulate('click');
    skillModalWrapper.prop('closeModalCallback')();
    expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
    expect(skillModalWrapper.prop('displayedModalType')).toBe('');
  });

  describe('the Add Skill button', () => {
    it('should always appear', () => {
      const wrapper = shallow(<Skills />);
      const addSkillButton = wrapper.find('[name="AddSkill"]');
      expect(addSkillButton).toHaveLength(1);
    });
    it('should open a AddSkillForm when clicked', () => {
      const wrapper = mount(<Skills />);
      const skillModalWrapper = wrapper.find(SkillModal);
      const addSkillButton = wrapper.find('[name="AddSkill"]');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
      addSkillButton.simulate('click');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('AddSkill');
    });
  });

  describe('the Add Link button', () => {
    it('does not appear when no skill is selected', () => {
      const wrapper = shallow(<Skills />);
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(addLinkButton).toHaveLength(0);
    });
    it('appears when a skill is selected', () => {
      const wrapper = shallow(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(addLinkButton).toHaveLength(1);
    });
    it('opens an AddSkillLinkForm when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const skillModalWrapper = wrapper.find(SkillModal);
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
      addLinkButton.simulate('click');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('AddLink');
    });
  });

  describe('the Add Review button', () => {
    it('does not appear when no skill is selected', () => {
      const wrapper = shallow(<Skills />);
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(addReviewButton).toHaveLength(0);
    });
    it('appears when a skill is selected', () => {
      const wrapper = shallow(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(addReviewButton).toHaveLength(1);
    });
    it('opens a SkillReviewsForm when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const skillModalWrapper = wrapper.find(SkillModal);
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
      addReviewButton.simulate('click');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('AddReview');
    });
  });

  describe('the delete button', () => {
    it('does not appear when no skill is selected', () => {
      const wrapper = mount(<Skills />);
      const deleteButton = wrapper.find('[name="DeleteSkill"]');
      expect(deleteButton).toHaveLength(0);
    });
    it('appears when a skill is selected', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const deleteButton = wrapper.find('[name="DeleteSkill"]');
      expect(deleteButton).toHaveLength(1);
    });
    it('opens a DeleteModal when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: '1' } });
      const skillModalWrapper = wrapper.find(SkillModal);
      const deleteButton = wrapper.find('[name="DeleteSkill"]');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
      deleteButton.simulate('click');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('DeleteSkill');
    });
  });
});
