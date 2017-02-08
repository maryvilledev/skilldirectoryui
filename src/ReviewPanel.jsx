import React, {PropTypes} from 'react'
import { Row, Panel, Col, bsStyle } from 'react-bootstrap'

const ReviewPanel = ({review}) => {
  if(!review) return <div />;
  const time = review.timestamp;
  const good = review.positive;
  const reviewer = review.team_member_name;
  const header = reviewer + " on " + new Date(time).toDateString();
  let flags = null;
  if (good) {
    flags = (
      <p style={{color: "#7CFC00"}}>+</p>
    )
  } else {
    flags = (
      <p style={{color: "#DC143C"}}>-</p>
    )
  }
  const body=review.body;

  return (
  <div>
    <Row>
      <Col mdOffset={2}>
        <Panel header={header} bsStyle="danger">
          <Col sm={1}>{flags}</Col>
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
