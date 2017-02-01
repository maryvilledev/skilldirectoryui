import React, {PropTypes} from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
import DeleteButton from './DeleteButton.jsx'

const ReviewPanel = ({review, onClick}) => {
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
    <Panel header={header}>
      <Row>
        <Col sm={1}>{flags}</Col>
        <Col>{body}</Col>
        <DeleteButton onClick={onClick} name={'reviewDelete'}/>
      </Row>
    </Panel>
  )
}

ReviewPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
}

export default ReviewPanel;
