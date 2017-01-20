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

  it('has a Button that opens the SkillModal', () => {
    const wrapper = mount(<Skills />);
    const skillModal = wrapper.find('Modal')
      .findWhere(n => n.prop('contentLabel') == 'SkillModal');
    const addSkillButton = wrapper.find('[name="AddSkill"]');
    expect(skillModal.prop('isOpen')).toBe(false);
    addSkillButton.simulate('click');
    expect(skillModal.prop('isOpen')).toBe(true);
  });

  describe('the add link button', () => {
    it('does not appear when no skill is selected', () => {
      const wrapper = shallow(<Skills />);
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(addLinkButton).toHaveLength(0);
    });
    it('appears when a skill is selected', () => {
      const wrapper = shallow(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(addLinkButton).toHaveLength(1);
    });
    it('opens a LinkModal when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const linkModal = wrapper.find('Modal').
                  findWhere(n => n.prop('contentLabel') == 'LinkModal');
      const addLinkButton = wrapper.find('[name="AddLink"]');
      expect(linkModal.prop('isOpen')).toBe(false);
      addLinkButton.simulate('click');
      expect(linkModal.prop('isOpen')).toBe(true);
    });
  });

  describe('the add review button', () => {
    it('does not appear when no skill is selected', () => {
      const wrapper = mount(<Skills />);
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(addReviewButton).toHaveLength(0);
    });
    it('appears when a skill is selected', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(addReviewButton).toHaveLength(1);
    });
    it('opens a DeleteModal when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const addReviewModal = wrapper.find('Modal').
                  findWhere(n => n.prop('contentLabel') == 'ReviewModal');
      const addReviewButton = wrapper.find('[name="AddReview"]');
      expect(addReviewModal.prop('isOpen')).toBe(false);
      addReviewButton.simulate('click');
      expect(addReviewModal.prop('isOpen')).toBe(true);
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
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const deleteButton = wrapper.find('[name="DeleteSkill"]');
      expect(deleteButton).toHaveLength(1);
    });
    it('opens a DeleteModal when clicked', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1" }});
      const deleteModal = wrapper.find('Modal').
                  findWhere(n => n.prop('contentLabel') == 'DeleteSkillModal');
      const deleteButton = wrapper.find('[name="DeleteSkill"]');
      expect(deleteModal.prop('isOpen')).toBe(false);
      deleteButton.simulate('click');
      expect(deleteModal.prop('isOpen')).toBe(true);
    });
  });
});
