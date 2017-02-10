import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SkillLinksDisplay = ({ links, onClick }) => {
  if (links && links.length) {
    const linkElements = links.map((link) => {
      return (
        <li key={link.id}>
          { `${capitalizeFirstLetter(String(link.link_type))}: ` }
          <a href={link.url}>{link.name}</a>
        </li>
      );
    });
    return (
      <div>
        <Row>
        <Col xs={3}>
         <h3>Links</h3>
        </Col>
        <Col>
            <Button
              name="AddLink"
              bsStyle="primary"
              onClick={onClick}
            >
              Add Link
            </Button>
          </Col>
          </Row>

        <ul>
          { linkElements }
        </ul>
      </div>
    );
  }
  return null;
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
