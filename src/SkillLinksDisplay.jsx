import React, { PropTypes } from 'react';
import { Button, Row } from 'react-bootstrap';
import WithLogin from './WithLogin'

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SkillLinksDisplay = ({ links, onClick }) => {
  let linkElements = null;
  if (links && links.length) {
    linkElements = links.map((link) => {
      return (
        <li key={link.id}>
          { `${capitalizeFirstLetter(String(link.link_type))}: ` }
          <a target="_blank" href={link.url}>{link.name}</a>
        </li>
      );
    });
  }
    return (
      <div>
        <Row>
          <table style={{width: '250px'}}>
          <tr>
            <td>
            <h2>Links</h2>
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
        <Row>
        <ul>
          { linkElements }
        </ul>
        </Row>
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
