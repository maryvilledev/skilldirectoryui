import React from 'react';
import ReactDOM from 'react-dom';
import SkillReviewsForm from './SkillReviewsForm';
import { shallow, mount } from 'enzyme';

describe('<SkillReviewsForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SkillReviewsForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<SkillReviewsForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes state when input to "Team Member" field changes', () => {
    const wrapper = mount(<SkillReviewsForm />);
    expect(wrapper.state().team_member_id).toBe('');
    const newID = '1234';
    const event = { target: {value: newID }};
    wrapper.find({ name: 'teamMemberSelect' }).simulate('change', event);
    expect(wrapper.state().team_member_id).toBe(newID);
  });

  it('changes state when input to "Positive Review" field changes', () => {
    const wrapper = mount(<SkillReviewsForm />);
    expect(wrapper.state().positive).toBe(true);
    const newVal = false;
    const event = {target: {value: newVal}}
    wrapper.find({ name: 'positiveSelect' }).simulate('change', event);
    expect(wrapper.state().positive).toBe(newVal);
  });

  it('changes state when text in "Review" text area changes', () => {
    const wrapper = mount(<SkillReviewsForm />);
    const newBody = 'Little Bo Peep';
    expect(wrapper.state().body).toBe('');
    const event = {target: {value: newBody}};
    wrapper.find({name: 'reviewBody' }).simulate('change', event);
    expect(wrapper.state().body).toBe(newBody);
  });
});
