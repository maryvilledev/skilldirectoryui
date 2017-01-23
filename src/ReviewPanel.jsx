import React, {Component} from 'react'
import { Panel, Row, Col } from 'react-bootstrap'

export default class ReviewPanel extends Component {
  render() {
    const time = this.props.timestamp;
    const good = this.props.good;
    const reviewer = this.props.reviewer;
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
    const body=this.props.children;

    return (
      <Panel header={header} key={this.props.timestamp}>
        <Row>
          <Col sm={1}>{flags}</Col>
          <Col>{body}</Col>
        </Row>
      </Panel>
    )
  }
}
