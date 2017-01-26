import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import AddSkillLinkForm, { isValidURL } from './AddSkillLinkForm.jsx';

describe('<AddSkillLinkForm />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddSkillLinkForm />, div);
  });

  it('matches the stored snapshot', () => {
    const wrapper = shallow(<AddSkillLinkForm />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes state when input to "Name" field changes', () => {
    const wrapper = mount(<AddSkillLinkForm />);
    expect(wrapper.state().linkName).toBe('');
    const event = { target: { value: 'New Value' } };
    wrapper.find({ name: 'linkName' }).simulate('change', event);
    expect(wrapper.state().linkName).toBe('New Value');
  });

  it('changes state when input to "URL" field changes', () => {
    const wrapper = mount(<AddSkillLinkForm />);
    expect(wrapper.state().linkUrl).toBe('');
    const event = { target: { value: 'New Value' } };
    wrapper.find({ name: 'linkURL' }).simulate('change', event);
    expect(wrapper.state().linkUrl).toBe('New Value');
  });

  it('changes state when selected option in "Type" field changes', () => {
    const wrapper = mount(<AddSkillLinkForm />);
    expect(wrapper.state().linkType).toBe('');
    const newType = 'tutorial';
    const event = { target: { value: newType } };
    wrapper.find({ name: 'linkType' }).simulate('change', event);
    expect(wrapper.state().linkType).toBe(newType);
  });
});

test('isValidURL() successfully detects valid/invalid URL forms', () => {
  expect(isValidURL('http://www.google.com')).toBe(true);
  expect(isValidURL('https://www.github.com')).toBe(true);
  expect(isValidURL('www.google.com')).toBe(false);
  expect(isValidURL('definitely-not-a-valid-url')).toBe(false);
});
