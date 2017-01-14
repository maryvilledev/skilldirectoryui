import React from 'react';
import axios from 'axios';

const api = (process.env.REACT_APP_API);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      totalTeamMembers: null, 
      totalSkills: null,
      recentSkillReviews: null,
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
      this.setState({ recentSkillReviews: reviews });
    }, 5);
  }

  render() {
    let skillReviews = null;
    if(this.state.recentSkillReviews != null) {
      skillReviews = this.state.recentSkillReviews.map(skillReview =>
        <li key={skillReview.id}>
            <div>
              {skillReview.team_member_name 
               + ' reviewed the ' + 
               skillReview.skill_name 
               + ' skill:'}
            </div>
            <div>{skillReview.body}</div>
        </li>
      );
    }
    return (
      <div>
        <h1>Skill Directory Home</h1>
        <h3>Team Members: <a href="#/team">{this.state.totalTeamMembers}</a></h3>
        <h3>Unique Skills: <a href="#/skills">{this.state.totalSkills}</a></h3>
        {skillReviews == null ? null : <h3>Recent Skill Reviews:</h3>}
        <ul>{skillReviews}</ul>
      </div>
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
  const aTime = new Date(a.timestamp).getTime();
  const bTime = new Date(b.timestamp).getTime();
  if(aTime < bTime)
    return 1;
  else if(aTime > bTime)
    return -1;
  return 0;
}

export default Home