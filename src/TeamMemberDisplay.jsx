import React, { PropTypes } from 'react';

const TeamMemberDisplay = ({selected}) => (
  <div>
    <h1>Name: {selected.name}</h1>
    <h2>Title: {selected.title}</h2>
  </div>
);

TeamMemberDisplay.propTypes = {
  selected: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })
};

export default TeamMemberDisplay;
