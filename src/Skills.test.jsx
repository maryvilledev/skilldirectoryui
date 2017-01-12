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
      // Setup
      const wrapper = mount(<Skills />);
      const skillModalNode = wrapper.find('Modal').
                findWhere(n => n.debug().includes('contentLabel="SkillModal"'));
      const addSkillNode = wrapper.find('button').
                findWhere(n => n.debug().includes('name="add_skill"'));

      // Run Test
      expect(skillModalNode.prop('isOpen')).toBe(false);
      addSkillNode.simulate('click');
      expect(skillModalNode.prop('isOpen')).toBe(true);
    });

    it('has an "Add Link" button that is disabled until a Skill is selected', () => {
      const wrapper = mount(<Skills />);
      const addLinkNode = wrapper.find('button').
                 findWhere(n => n.debug().includes('name="add_link"'));
      expect(addLinkNode.props().disabled).toBe(true);
      wrapper.setState({ currentSkill: { skill_id: "1234" }});
      expect(addLinkNode.props().disabled).toBe(false);
    });

    it('has a Button that opens the LinkModal', () => {
      // Setup
      const wrapper = mount(<Skills />);
      wrapper.setState({ currentSkill: { skill_id: "1234" }});
      const linkModalNode = wrapper.find('Modal').
                 findWhere(n => n.debug().includes('contentLabel="LinkModal"'));
      const addLinkNode = wrapper.find('button').
                 findWhere(n => n.debug().includes('name="add_link"'));

      // Run Test
      expect(linkModalNode.prop('isOpen')).toBe(false);
      addLinkNode.simulate('click');
      expect(linkModalNode.prop('isOpen')).toBe(true);
    });
});
