import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import DeleteSkillModal from './DeleteSkillModal';

describe('<DeleteSkillModal />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeleteSkillModal />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<DeleteSkillModal />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('has a yes button that triggers delete callback and closes modal', () => {
    let didDelete = false;
    let didClose = false;
    const mockDelete = function() {didDelete = true;};
    const mockClose = function() {didClose = true;};
    const wrapper = mount(<DeleteSkillModal
      doDelete={mockDelete}
      closeModal={mockClose}
    />);
    const button = wrapper.find("button")
      .findWhere(n => n.debug().includes('name="Yes"'));
    button.simulate('click');
    expect(didDelete && didClose).toBe(true);

  });

  it('has a no button that doesn\'t trigger delete callback but closes modal',
   () => {
    let didDelete = false;
    let didClose = false;
    const mockDelete = function() {didDelete = true;};
    const mockClose = function() {didClose = true;};
    const wrapper = mount(<DeleteSkillModal
      doDelete={mockDelete}
      closeModal={mockClose}
    />);
    const button = wrapper.find("button")
      .findWhere(n => n.debug().includes('name="No"'));
    button.simulate('click');
    expect(didClose).toBe(true);
    expect(didDelete).toBe(false);
  });
});
