import React from 'react';
import ReactDOM from 'react-dom';
import LinksForm from './LinksForm';
import { isValidURL } from './LinksForm';
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
    wrapper.find({ name: "link_name" }).simulate("change", event);
    expect(wrapper.state().link_name).toBe("New Value");
    // process.stdout.write(JSON.stringify(wrapper.state()));
  });

  it('changes state when input to "URL" field changes', () => {
    const wrapper = mount(<LinksForm />);
    expect(wrapper.state().link_url).toBe("");
    const event = {target: {value: "New Value"}};
    wrapper.find({ name: "link_url" }).simulate("change", event);
    expect(wrapper.state().link_url).toBe("New Value");
  });

// TODO: Find different way to test this... The below test fails because
// the "Select" element we are using from 'react-select' doesn't respond
// as expected to the simulated "change" event.
  // it('changes state when selected option in "Type" field changes', () => {
  //   const wrapper = mount(<LinksForm />);
  //   expect(wrapper.state().link_type).toBe("");
  //   const event = {target: {value: "New Value"}};
  //   wrapper.find("Select").simulate("change", event);
  //   expect(wrapper.state().link_type).toBe("New Value");
  // });
});

test('isValidURL() successfully detects valid/invalid URL forms', () => {
  expect(isValidURL("http://www.google.com")).toBe(true);
  expect(isValidURL("https://www.github.com")).toBe(true);
  expect(isValidURL("www.google.com")).toBe(false);
  expect(isValidURL("definitely-not-a-valid-url")).toBe(false);
});