import React from 'react';
import ReactDOM from 'react-dom';
import LinksForm, { isValidURL } from './AddSkillLinkForm.jsx';
import { shallow, mount } from 'enzyme';

describe('<LinksForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LinksForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<LinksForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes state when input to "Name" field changes', () => {
    const wrapper = mount(<LinksForm />);
    // process.stdout.write(wrapper.debug());
    // process.stdout.write(JSON.stringify(wrapper.state()));
    expect(wrapper.state().link_name).toBe("");
    const event = {target: {value: "New Value"}};
    wrapper.find({ name: "linkName" }).simulate("change", event);
    expect(wrapper.state().link_name).toBe("New Value");
    // process.stdout.write(JSON.stringify(wrapper.state()));
  });

  it('changes state when input to "URL" field changes', () => {
    const wrapper = mount(<LinksForm />);
    expect(wrapper.state().link_url).toBe("");
    const event = {target: {value: "New Value"}};
    wrapper.find({ name: "linkURL" }).simulate("change", event);
    expect(wrapper.state().link_url).toBe("New Value");
  });

  it('changes state when selected option in "Type" field changes', () => {
    const wrapper = mount(<LinksForm />);
    expect(wrapper.state().link_type).toBe("");
    const newType = 'tutorial';
    const event = {target: {value: newType}};
    wrapper.find({ name: 'linkType' }).simulate("change", event);
    expect(wrapper.state().link_type).toBe(newType);
  });
});

test('isValidURL() successfully detects valid/invalid URL forms', () => {
  expect(isValidURL("http://www.google.com")).toBe(true);
  expect(isValidURL("https://www.github.com")).toBe(true);
  expect(isValidURL("www.google.com")).toBe(false);
  expect(isValidURL("definitely-not-a-valid-url")).toBe(false);
});
