import React, { PropTypes } from 'react';
import { Button, Row } from 'react-bootstrap';
import WithLogin from './WithLogin';
import tutorialIcon from '../resources/book-icon.png';
import blogIcon from '../resources/laptop-icon.png';
import webpageIcon from '../resources/house-icon.png';
import developerToolIcon from '../resources/wrench-icon.png';

const SkillLinksDisplay = ({ links, onClick }) => {
  const makeLinkListItem = (link, idx) => 
    (<li key={idx}><a href={link.url}>{link.name}</a></li>)

  const linkHeader = (
    <Row>
    <table style={{ width: '250px' }}>
    <tr>
      <td>
      <h3>Links</h3>
      </td>
      <td>
      <WithLogin>
        <Button
          name="AddLink"
          bsStyle="info"
          bsSize="small"
          onClick={onClick}
          style={{ marginTop: '12%' }}>
          Add Link
        </Button>
      </WithLogin>
      </td>
    </tr>
    </table>
    </Row>
  );

  const linksList = (
    <span>
      <h4><img src={webpageIcon} role='presentation'/> Webpages</h4>
      <ul>
      {links === undefined ? null :
       links.filter(l => l.link_type === 'webpage').map(makeLinkListItem)}
      </ul>
      <h4><img src={tutorialIcon} role='presentation'/> Tutorials</h4>
      <ul>
      {links === undefined ? null : 
       links.filter(l => l.link_type === 'tutorial').map(makeLinkListItem)}
      </ul>
      <h4><img src={blogIcon} role='presentation'/> Blogs</h4>
      <ul>
      {links === undefined ? null :
       links.filter(l => l.link_type === 'blog').map(makeLinkListItem)}
      </ul>
      <h4><img src={developerToolIcon} role='presentation'/> Developer Tools</h4>
      <ul>
      {links === undefined ? null :
       links.filter(l => l.link_type === 'developer-tool').map(makeLinkListItem)}
      </ul>
    </span>
  );

  return (
    <div>
      {linkHeader}
      {linksList}
    </div>
  );
};

SkillLinksDisplay.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      link_type: PropTypes.string,
      name: PropTypes.string,
      skill_id: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default SkillLinksDisplay;
