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
      const node = wrapper.find('Modal')
       .findWhere(n => n.debug().includes('contentLabel="SkillModal"'));
      const button = wrapper.find('button')
        .findWhere(n => n.debug().includes('name="SkillAdd"'));
      expect(node.prop('isOpen')).toBe(false);
      button.simulate('click');
      expect(node.prop('isOpen')).toBe(true);
    });

    it('has a DeleteButton that enables when skill_id is not empty', () => {
      const wrapper = mount(<Skills />);
      const button = wrapper.find('button')
        .findWhere(n => n.debug().includes('name="SkillDelete"'));
      expect(button.prop('disabled')).toBe(true);
      wrapper.setState({
        currentSkill: {
          skill_id: "1",
      }});
      expect(button.prop('disabled')).toBe(false);
    });

    it('has a Button that opens the DeleteSkillModal', () => {
      const wrapper = mount(<Skills />);
      wrapper.setState({
        currentSkill: {
          skill_id: "1",
      }});
      const node = wrapper.find('Modal')
       .findWhere(n => n.debug().includes('contentLabel="DeleteSkillModal"'));
      const button = wrapper.find('button')
        .findWhere(n => n.debug().includes('name="SkillDelete"'));
      expect(node.prop('isOpen')).toBe(false);
      button.simulate('click');
      expect(node.prop('isOpen')).toBe(true);
    });
});
