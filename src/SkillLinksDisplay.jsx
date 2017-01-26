import React, { PropTypes } from 'react';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const SkillLinksDisplay = ({ links }) => {
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
        <h3>Links:</h3>
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
