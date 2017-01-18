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

  it('has a Button that opens the AddTeamMemberModal', () => {
    const wrapper = mount(<Team />);
    const addTeamMemberModal = wrapper.find('Modal')
      .findWhere(n => n.prop('contentLabel') == 'AddTeamMemberModal');
    const addTeamMemberButton = wrapper.find('[name="addTeamMember"]');
    expect(addTeamMemberModal.prop('isOpen')).toBe(false);
    addTeamMemberButton.simulate('click');
    expect(addTeamMemberModal.prop('isOpen')).toBe(true);
  });

  describe('the delete button', () => {
    it('does not appear when no team member is selected', () => {
      const wrapper = mount(<Team />);
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(deleteButton).toHaveLength(0);
    });
    it('appears when a team member is selected', () => {
      const wrapper = mount(<Team />);
      wrapper.setState({ selectedTeamMember: { id: "1" }});
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(deleteButton).toHaveLength(1);
    });
    it('opens a DeleteModal when clicked', () => {
      const wrapper = mount(<Team />);
      wrapper.setState({ selectedTeamMember: { id: "1" }});
      const deleteModal = wrapper.find('Modal').
                  findWhere(n => n.prop('contentLabel') == 'DeleteTeamMemberModal');
      const deleteButton = wrapper.find('[name="DeleteTeamMember"]');
      expect(deleteModal.prop('isOpen')).toBe(false);
      deleteButton.simulate('click');
      expect(deleteModal.prop('isOpen')).toBe(true);
    });
  });
});
