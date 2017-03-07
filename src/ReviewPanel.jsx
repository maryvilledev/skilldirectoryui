import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const ReviewPanel = ({ review, showSkillName }) => {
  if(!review) return null;

  const body    = review.body;
  const time    = review.CreatedAt;
  const tmID    = review.TeamMember.ID;
  const skillID = review.Skill.ID;

  console.log(review)
  console.log(skillID)

  const reviewer  = (
    <a href={`/team/${tmID}`} style={{ textDecoration: 'underline' }}>
      {review.TeamMember.name}
    </a>
  );
  const skillName = (
    <a href={`/skills/${skillID}`} style={{ textDecoration: 'underline' }}>
      {review.Skill.name}
    </a>
  );

  const header = (
    <span>
      {reviewer}
      {showSkillName ? ' reviewed ' : null}
      {showSkillName ? skillName : null}
      {' on ' + new Date(time).toDateString()}
    </span>
  );

  return (
    <Panel header={header} bsStyle={review.positive ? 'success' : 'danger'} >
      {body}
    </Panel>
  );
}

ReviewPanel.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewPanel;
