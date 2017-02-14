import React from 'react';
import { shallow } from 'enzyme';

import SkillLinksDisplay from './SkillLinksDisplay.jsx';

describe('<SkillLinksDisplay />', () => {
  
  it('renders the component if the list is non-empty', () => {
    const links = [
      {
        id: '1',
        link_type: 'blog',
        name: 'foo',
        skill_id: '1234',
        url: 'https://www.google.com',
      },
      {
        id: '2',
        link_type: 'tutorial',
        name: 'foo',
        skill_id: '4312',
        url: 'https://www.reddit.com',
      },
    ];
    const wrapper = shallow(<SkillLinksDisplay links={links} />);
    expect(wrapper.children()).toHaveLength(links.length);
  });
});
