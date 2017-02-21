import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'

const ReviewPanel = ({ review, showSkillName }) => {
  if(!review) return null;

  const body    = review.body;
  const time    = review.timestamp;
  const tmID    = review.team_member_id;
  const skillID = review.skill_id;

  const reviewer  = <a href={`/team/${tmID}`}>{review.team_member_name}</a> 
  const skillName = <a href={`/skills/${skillID}`}>{review.skill_name}</a>

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
