import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import DeleteTeamMemberModal from './DeleteTeamMemberModal.jsx';

describe('<DeleteTeamMemberModal />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeleteTeamMemberModal />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<DeleteTeamMemberModal />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  describe('the Yes button', () => {
    it('triggers a delete callback and closes the modal when clicked', () => {
      let didDelete = false, didClose = false;
      const mockDelete = () => {didDelete = true; };
      const mockClose = () => {didClose = true; };
      const node = shallow(<DeleteTeamMemberModal
        doDelete={mockDelete}
        closeModal={mockClose} />);
      const button = node.find("Button")
        .findWhere(n => n.prop('name') == "Yes");
      button.simulate('click');
      expect(didClose && didDelete).toBe(true);
    });
  });

  describe('the No button', () => {
    it('closes the modal and does not trigger a delete when clicked', () => {
      let didDelete = false, didClose = false;
      const mockDelete = () => {didDelete = true; };
      const mockClose = () => {didClose = true; };
      const node = shallow(<DeleteTeamMemberModal
        doDelete={mockDelete}
        closeModal={mockClose} />);
      const button = node.find("Button")
        .findWhere(n => n.prop('name') == "No");
      button.simulate('click');
      expect(didClose).toBe(true);
      expect(didDelete).toBe(false);
    });
  });
});
