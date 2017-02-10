import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
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
          <a href={link.url}>{link.name}</a>
        </li>
      );
    });
  }
    return (
      <div>
        <Row>
          <Col xs={2} style={{ "margin-right": 35 }}>
            <h2>Links</h2>
          </Col>
          <Col xs={3} style={{ "margin-top": 20 }}>
            <WithLogin>
              <Button
                name="AddLink"
                bsStyle="primary"
                onClick={onClick}
              >
                Add Link
              </Button>
            </WithLogin>
          </Col>
        </Row>
        <ul>
          { linkElements }
        </ul>
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
