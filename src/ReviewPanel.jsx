import React, {PropTypes} from 'react'
import { Row, Panel, Col, bsStyle } from 'react-bootstrap'

const ReviewPanel = ({review}) => {
  if(!review) return <div />;
  const time = review.timestamp;
  const good = review.positive;
  const reviewer = review.team_member_name;
  const header = reviewer + " on " + new Date(time).toDateString();
  let color = null;
  if (good) {
    color = "success"
  }
  else {
    color = "danger"
  }

  const body=review.body;

  return (

  <div>
    <Row>
      <Col>
        <Panel header={header} bsStyle={color} >
          <Col>{body}</Col>
        </Panel>
      </Col>
    </Row>
  </div>
  )
}

ReviewPanel.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewPanel;
