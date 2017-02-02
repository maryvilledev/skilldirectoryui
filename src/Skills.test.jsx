import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { mount, shallow } from 'enzyme';

import SkillLinksDisplay from './SkillLinksDisplay.jsx';
import SkillModalContainer from './SkillModalContainer.jsx';
import Skills from './Skills';
import WithLogin from './WithLogin.jsx'

describe('<Skills />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Skills />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Skills />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  describe('when the user is not logged in', () => {
    beforeEach(() => {
      cookie.save('isLoggedIn', false);
    })
    it('should not display the Add Skill button', () => {
      const wrapper = mount(<Skills />);
      const addSkillButton = wrapper.find('[name="AddSkill"]');
      expect(addSkillButton).toHaveLength(0);
    });
    describe('when a skill is selected', () => {
      it('should not display the Add Link button', () => {
        const wrapper = mount(<Skills/>);
        wrapper.setState({ currentSkill: { skill_id: '1' } });
        const addLinkButton = wrapper.find('[name="AddLink"]');
        expect(addLinkButton).toHaveLength(0);
      });
      it('should not display the Add Review button', () => {
        const wrapper = mount(<Skills/>);
        wrapper.setState({ currentSkill: { skill_id: '1' } });
        const addReviewButton = wrapper.find('[name="AddReview"]');
        expect(addReviewButton).toHaveLength(0);
      });
      it('should not display the Delete Skill button', () => {
        const wrapper = mount(<Skills/>);
        wrapper.setState({ currentSkill: { skill_id: '1' } });
        const deleteButton = wrapper.find('[name="DeleteSkill"]');
        expect(deleteButton).toHaveLength(0);
      });
    });
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      cookie.save('isLoggedIn', true);
    });
    afterEach(() => {
      cookie.remove('isLoggedIn');
    });
    it('has a closeModal function to close all modals', () => {
      const wrapper = mount(<Skills />);
      const skillModalWrapper = wrapper.find(SkillModalContainer);
      const addSkillButton = wrapper.find('[name="AddSkill"]');
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
      addSkillButton.simulate('click');
      skillModalWrapper.prop('closeModalCallback')();
      expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
      expect(skillModalWrapper.prop('displayedModalType')).toBe('');
    });
    describe('the Add Skill button', () => {
      it('should display the Add Skill button', () => {
        const wrapper = shallow(<Skills />);
        const addSkillButton = wrapper.find('[name="AddSkill"]');
        expect(addSkillButton).toHaveLength(1);
      });
      it('should open a AddSkillForm when clicked', () => {
        const wrapper = mount(<Skills />);
        const skillModalWrapper = wrapper.find(SkillModalContainer);
        const addSkillButton = wrapper.find('[name="AddSkill"]');
        expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
        expect(skillModalWrapper.prop('displayedModalType')).toBe('');
        addSkillButton.simulate('click');
        expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
        expect(skillModalWrapper.prop('displayedModalType')).toBe('AddSkill');
      });
    });
    describe('when a skill is not selected', () => {
      it('does not display the Delete Skill button', () => {
        const wrapper = shallow(<Skills />);
        const deleteButton = wrapper.find('[name="DeleteSkill"]');
        expect(deleteButton).toHaveLength(0);
      });
      it('does not display the Add Link button', () => {
        const wrapper = shallow(<Skills />);
        const addLinkButton = wrapper.find('[name="AddLink"]');
        expect(addLinkButton).toHaveLength(0);
      });
      it('does not display the Add Review button', () => {
        const wrapper = shallow(<Skills />);
        const addReviewButton = wrapper.find('[name="AddReview"]');
        expect(addReviewButton).toHaveLength(0);
      });
    });
    describe('when a skill is selected', () => {
      describe('the Add Link button', () => {
        it('should be displayed', () => {
          const wrapper = mount(<Skills/>);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const addLinkButton = wrapper.find('[name="AddLink"]');
          expect(addLinkButton).toHaveLength(1);
        });
        it('opens an AddSkillLinkForm when clicked', () => {
          const wrapper = mount(<Skills />);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const skillModalWrapper = wrapper.find(SkillModalContainer);
          const addLinkButton = wrapper.find('[name="AddLink"]');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('');
          addLinkButton.simulate('click');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('AddLink');
        });
      });
      describe('the Add Review button', () => {
        it('should be displayed', () => {
          const wrapper = mount(<Skills/>);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const addReviewButton = wrapper.find('[name="AddReview"]');
          expect(addReviewButton).toHaveLength(1);
        });
        it('opens a SkillReviewsForm when clicked', () => {
          const wrapper = mount(<Skills />);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const skillModalWrapper = wrapper.find(SkillModalContainer);
          const addReviewButton = wrapper.find('[name="AddReview"]');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('');
          addReviewButton.simulate('click');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('AddReview');
        });
      });
      describe('the Delete Skill button', () => {
        it('should be displayed', () => {
          const wrapper = mount(<Skills/>);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const deleteButton = wrapper.find('[name="DeleteSkill"]');
          expect(deleteButton).toHaveLength(1);
        });
        it('opens a DeleteModal when clicked', () => {
          const wrapper = mount(<Skills />);
          wrapper.setState({ currentSkill: { skill_id: '1' } });
          const skillModalWrapper = wrapper.find(SkillModalContainer);
          const deleteButton = wrapper.find('[name="DeleteSkill"]');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(false);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('');
          deleteButton.simulate('click');
          expect(skillModalWrapper.prop('isModalDisplayed')).toBe(true);
          expect(skillModalWrapper.prop('displayedModalType')).toBe('DeleteSkill');
        });
      });
    });
  });
});
