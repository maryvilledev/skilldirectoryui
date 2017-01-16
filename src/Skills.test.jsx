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
    const addSkillButton = wrapper.find('button')
      .findWhere(n => n.prop('name') == 'AddSkill');
    expect(skillModal.prop('isOpen')).toBe(false);
    addSkillButton.simulate('click');
    expect(skillModal.prop('isOpen')).toBe(true);
  });

  it('has an "Add Link" button that enables when a Skill is selected', () => {
    const wrapper = mount(<Skills />);
    const addLinkNode = wrapper.find('button').
                findWhere(n => n.prop('name') == 'AddLink');
    expect(addLinkNode.props().disabled).toBe(true);
    wrapper.setState({ currentSkill: { skill_id: "1234" }});
    expect(addLinkNode.props().disabled).toBe(false);
  });

  it('has a Button that opens the LinkModal', () => {
    // Setup
    const wrapper = mount(<Skills />);
    wrapper.setState({ currentSkill: { skill_id: "1234" }});
    const linkModalNode = wrapper.find('Modal').
                findWhere(n => n.prop('contentLabel') == 'LinkModal');
    const addLinkNode = wrapper.find('button').
                findWhere(n => n.prop('name') == 'AddLink');

    // Run Test
    expect(linkModalNode.prop('isOpen')).toBe(false);
    addLinkNode.simulate('click');
    expect(linkModalNode.prop('isOpen')).toBe(true);
  });

  it('has a "Delete" button that enables when a Skill is selected', () => {
    const wrapper = mount(<Skills />);
    const button = wrapper.find('button')
      .findWhere(n => n.prop('name') == "DeleteSkill");
    expect(button.prop('disabled')).toBe(true);
    wrapper.setState({ currentSkill: { skill_id: "1234", }});
    expect(button.prop('disabled')).toBe(false);
  });

  it('has a Button that opens a DeleteModal', () => {
    const wrapper = mount(<Skills />);
    wrapper.setState({ currentSkill: { skill_id: "1" }});
    const node = wrapper.find('Modal')
      .findWhere((n) => n.prop('contentLabel') == 'DeleteSkillModal');
    const button = wrapper.find('button')
      .findWhere(n => n.prop('name') == 'DeleteSkill');
    expect(node.prop('isOpen')).toBe(false);
    button.simulate('click');
    expect(node.prop('isOpen')).toBe(true);
  });
});
