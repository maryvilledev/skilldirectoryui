import React from 'react';
import ReactDOM from 'react-dom';
import AddSkillForm from './AddSkillForm.jsx';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('<AddSkillForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddSkillForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<AddSkillForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes state when input to "Name:" field changes', () => {
    const wrapper = mount(<AddSkillForm />);
    // process.stdout.write(wrapper.debug());
    // process.stdout.write(JSON.stringify(wrapper.state()));
    expect(wrapper.state().skill_name).toBe("");
    const event = {target: {value: "New Value"}};
    wrapper.find({ name: "skillName" }).simulate("change", event);
    expect(wrapper.state().skill_name).toBe("New Value");
    // process.stdout.write(JSON.stringify(wrapper.state()));
  });

// TODO: Find different way to test this... The below test fails because
// the "Select" element we are using from 'react-select' doesn't respond
// as expected to the simulated "change" event.
  // it('changes state when selected option in "Skill Type" field changes', () => {
  //   const wrapper = mount(<AddSkillForm />);
  //   expect(wrapper.state().skill_type).toBe("");
  //   const event = {target: {value: "New Value"}};
  //   wrapper.find("Select").simulate("change", event);
  //   expect(wrapper.state().skill_type).toBe("New Value");
  // });
});
