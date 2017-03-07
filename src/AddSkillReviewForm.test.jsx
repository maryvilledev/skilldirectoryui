import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import AddSkillReviewForm from './AddSkillReviewForm';

describe('<AddSkillReviewForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddSkillReviewForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<AddSkillReviewForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes state when input to "Team Member" field changes', () => {
    const wrapper = mount(<AddSkillReviewForm />);
    expect(wrapper.state().team_member_id).toBe(0);
    const newID = 1234;
    const event = { target: { value: newID } };
    wrapper.find({ name: 'teamMemberSelect' }).simulate('change', event);
    expect(wrapper.state().team_member_id).toBe(newID);
  });

  it('changes state when input to "Positive Review" field changes', () => {
    const wrapper = mount(<AddSkillReviewForm />);
    expect(wrapper.state().positive).toBe(true);
    const newVal = false;
    const event = { target: { value: newVal } };
    wrapper.find({ name: 'positiveSelect' }).simulate('change', event);
    expect(wrapper.state().positive).toBe(newVal);
  });

  it('should be accept Strings as ev.target.value', () => {
    const wrapper = mount(<AddSkillReviewForm />);
    const positiveSelectElement = wrapper.find('[name="positiveSelect"]');
    const falseEvent = {
      target: {
        value: 'false',
      },
    };
    positiveSelectElement.simulate('change', falseEvent);
    expect(wrapper.state().positive).toEqual(false);
    const trueEvent = {
      target: {
        value: 'true',
      },
    };
    positiveSelectElement.simulate('change', trueEvent);
    expect(wrapper.state().positive).toEqual(true);
  });

  it('changes state when text in "Review" text area changes', () => {
    const wrapper = mount(<AddSkillReviewForm />);
    const newBody = 'Little Bo Peep';
    expect(wrapper.state().body).toBe('');
    const event = { target: { value: newBody } };
    wrapper.find({ name: 'reviewBody' }).simulate('change', event);
    expect(wrapper.state().body).toBe(newBody);
  });
});
