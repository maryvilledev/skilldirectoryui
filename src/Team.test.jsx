import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Team from './Team.jsx';

describe('<Team />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Team />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Team />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('has a Button that opens the SkillModal', () => {
    const wrapper = mount(<Team />);
    const skillModal = wrapper.find('Modal')
      .findWhere(n => n.prop('contentLabel') == 'AddTeamMemberModal');
    const addSkillButton = wrapper.find('button')
      .findWhere(n => n.prop('name') == 'addTeamMember');
    expect(skillModal.prop('isOpen')).toBe(false);
    addSkillButton.simulate('click');
    expect(skillModal.prop('isOpen')).toBe(true);
  });

  describe('the Delete Button', function () {
    it('should be disabled if a team member is not selected', function () {
      const teamComponent = mount(<Team />);
      const button = teamComponent.find('button')
        .findWhere(n => n.prop('name') == "TeamMemberDelete");
      expect(button.prop('disabled')).toBe(true);
      teamComponent.setState({ selectedTeamMember: { skill_id: "1234", }});
      expect(button.prop('disabled')).toBe(false);
    });
    it('Can open a DeleteTeamMemberModal when a team member has been selected', () => {
      const wrapper = mount(<Team />);
      wrapper.setState({ selectedTeamMember: { id: "1" }});
      const node = wrapper.find('Modal')
        .findWhere(n => n.prop('contentLabel') == "DeleteTeamMemberModal");
      const button = wrapper.find('button')
        .findWhere(n => n.prop('name') == "TeamMemberDelete");
      expect(node.prop('isOpen')).toBe(false);
      button.simulate('click');
      expect(node.prop('isOpen')).toBe(true);
    });
  });
});
