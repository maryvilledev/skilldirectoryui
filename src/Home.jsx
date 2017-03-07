import React from 'react';
import axios from 'axios';
import ReviewPanel from './ReviewPanel.jsx'
import { Col, Grid } from 'react-bootstrap';

const api = (process.env.REACT_APP_API);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTeamMembers: null,
      totalSkills: null,
      recentReviews: null,
     };
  }

  componentDidMount() {
    getTotalTeamMembers(api, total => {
      this.setState({ totalTeamMembers: total })
    });
    getTotalSkills(api, total => {
      this.setState({ totalSkills: total })
    });
    getRecentSkillReviews(api, reviews => {
      this.setState({ recentReviews: reviews });
    }, 5);
  }

  render() {
    let reviews = null;
    if (this.state.recentReviews) {
        reviews = this.state.recentReviews.map(review =>
          <ReviewPanel review={review} showSkillName={true} />
        );
    }

    return (
      <Grid>
      <Col sm={4} md={3} mdOffset={1}>
      <h3>Team Members: <a href="/team">{this.state.totalTeamMembers}</a></h3>
      <h3>Unique Skills: <a href="/skills">{this.state.totalSkills}</a></h3>
      </Col>
      <Col sm={10} md={7}>
      {reviews == null ? null : <h3>Recent Skill Reviews:</h3>}
      {reviews}
      </Col>
      </Grid>
    );
  }
}

// Invokes callback with total Team Member records in the api backend as param.
function getTotalTeamMembers(api, onResponse) {
  axios.get(api + '/teammembers/')
    .then(res => {
      onResponse(res.data.length);
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes callback with total Skill records in the api backend as param.
function getTotalSkills(api, onResponse) {
  axios.get(api + '/skills/')
    .then(res => {
      onResponse(res.data.length);
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes `callback` with array of SkillReviews of length `numReviews` as param.
// All SkillReviews from api response are sorted with `sortFunc`.
function getSkillReviewsSorted(api, callback, sortFunc) {
  axios.get(api + '/skillreviews/')
    .then(res => {
      callback(res.data.sort(sortFunc));
      console.log(res.data)
    })
    .catch(err => {
      console.error(err)
    });
}

// Invokes callback with array of most recently created SkillReviews.
// Size of array is bounded by `numReviews`. Lower elements hold more recent
// reviews, so [0] is most recent one.
function getRecentSkillReviews(api, callback, numReviews) {
  getSkillReviewsSorted(api,
  skillReviews => callback(skillReviews.slice(0, numReviews)), sortByTimestamp);
}

// Sorts arguments by their timestamp field.
function sortByTimestamp(a, b) {
  const aTime = new Date(a.UpdatedAt).getTime();
  const bTime = new Date(b.UpdatedAt).getTime();
  if(aTime < bTime)
    return 1;
  else if(aTime > bTime)
    return -1;
  return 0;
}

export default Home
