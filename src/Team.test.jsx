import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Team from './Team.jsx';
import TeamModalContainer from './TeamModalContainer.jsx';

describe('<Team />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Team />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<Team />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  describe('the Add Team Member button', () => {
    it('should always appear', () => {
      const wrapper = mount(<Team />);
      const addTeamMemberButton = wrapper.find('[name="addTeamMember"]');
      expect(addTeamMemberButton).toHaveLength(1);
    });
    it('should open an AddTeamMemberModal when clicked', () => {
      const wrapper = mount(<Team />);
      const teamModalContainer = wrapper.find(TeamModalContainer);
      const addTeamMemberButton = wrapper.find('[name="addTeamMember"]');
      expect(teamModalContainer.prop('isModalDisplayed')).toBe(false);
      expect(teamModalContainer.prop('displayedModalType')).toBe('');
      addTeamMemberButton.simulate('click');
      expect(teamModalContainer.prop('isModalDisplayed')).toBe(true);
      expect(teamModalContainer.prop('displayedModalType')).toBe('AddTeamMember');
    });
  });

  describe('the delete button', () => {
    it('does not appear when no team member is selected', () => {
      const wrapper = mount(<Team />);
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(deleteButton).toHaveLength(0);
    });
    it('appears when a team member is selected', () => {
      const wrapper = mount(<Team />);
      wrapper.setState({ selectedTeamMember: { id: '1' } });
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(deleteButton).toHaveLength(1);
    });
    it('opens a DeleteModal when clicked', () => {
      const wrapper = mount(<Team />);
      wrapper.setState({ selectedTeamMember: { id: '1' } });
      const teamModalContainer = wrapper.find(TeamModalContainer);
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(teamModalContainer.prop('isModalDisplayed')).toBe(false);
      expect(teamModalContainer.prop('displayedModalType')).toBe('');
      deleteButton.simulate('click');
      expect(teamModalContainer.prop('isModalDisplayed')).toBe(true);
      expect(teamModalContainer.prop('displayedModalType')).toBe('DeleteTeamMember');
    });
  });
});
