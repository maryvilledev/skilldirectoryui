import axios from 'axios';
import React, {PropTypes} from 'react'
import { Panel, Row, Col, Button } from 'react-bootstrap'
import WithLogin from './WithLogin.jsx';

const api = (process.env.REACT_APP_API);

const ReviewPanel = ({review, delete_callback}) => {
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

  let delete_review = function() {
    const postData = {
      id: review.id,
      skill_id: review.skill_id,
    };
    axios.delete(`${api}/skillreviews/`, {data: postData})
      .then(delete_callback)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Panel header={header}>
      <Row>
        <Col sm={1}>{flags}</Col>
        <Col>{body}</Col>
        <Col>
          <WithLogin>
            <Button
              name="DeleteReview"
              bsStyle="primary"
              onClick={delete_review}
            >
              Delete
            </Button>
          </WithLogin>
        </Col>
      </Row>
    </Panel>
  )
}

ReviewPanel.propTypes = {
  review: PropTypes.object.isRequired
}

export default ReviewPanel;
