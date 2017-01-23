import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import AddTeamMemberForm from './AddTeamMemberForm';

describe('<AddTeamMemberForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddTeamMemberForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<AddTeamMemberForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should not attempt to submit if a field is empty', () => {
    const handleSubmit = jest.fn();
    const form = mount(<AddTeamMemberForm onSubmit={handleSubmit} />);
    const formElem = form.find('form').first();
    formElem.simulate('submit');
    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it('will call the callback when the fields are populated', () => {
    const handleSubmit = jest.fn();
    const form = mount(<AddTeamMemberForm onSubmit={handleSubmit} />);
    form.setState({ teamMemberName: 'foo', teamMemberTitle: 'bar' });
    const formElem = form.find('form').first();
    formElem.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
