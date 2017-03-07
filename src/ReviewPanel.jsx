import React, {PropTypes} from 'react'
import { Panel, Col } from 'react-bootstrap'

const ReviewPanel = ({review}) => {
  if(!review) return <div />;

  const body=review.body;
  const time = review.CreatedAt;
  const good = review.positive;
  const reviewer = review.TeamMember.name;
  const header = reviewer + " on " + new Date(time).toDateString();
  let color = null;
  if (good) {
    color = "success"
  }
  else {
    color = "danger"
  }

  return (
  <div>
    <Panel header={header} bsStyle={color} >
      <Col>{body}</Col>
    </Panel>
  </div>
  );
}

ReviewPanel.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewPanel;
