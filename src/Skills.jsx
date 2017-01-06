import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';



class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });

        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <h1>Skills</h1>
        <ul>
          {this.state.skills.map(skill =>
            <li key={skill.id}>{skill.name}    {skill.skill_type}</li>
          )}
        </ul>
      </div>
    );
  }
}


// class Skills extends Component {
//     render(){
//         return (
//           <div>
//             <h1>Skills</h1>
//             <ul>
//               <li>Java</li>
//               <li>JavaScript</li>
//             </ul>
//           </div>
//
//         );
//     }
// }

export default Skills
