import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import { Row, Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

import ItemDisplayer from './ItemDisplayer';
import TeamMemberDisplay from './TeamMemberDisplay.jsx';
import TeamModalContainer from './TeamModalContainer.jsx';
import WithLogin from './WithLogin.jsx';

const api = (process.env.REACT_APP_API);

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      isModalDisplayed: false,
      displayedModalType: '',
      currentTeamMember: {
        id: '',
        name: '',
        title: '',
      },
    };

    this.openNewModalType = this.openNewModalType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.loadTeamMembers = this.loadTeamMembers.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.deleteTeamMember = this.deleteTeamMember.bind(this);
  }

  componentDidMount() {
    // Fetch all team members
    this.loadTeamMembers()
    .then(() => {
      // Load the current teammember only if there was an id param (in the URL)
      if (this.props.params && this.props.params.id)
        this.loadCurrentTeamMember(this.props.params.id);
    })
    .catch((err) => {
      console.log(err);
    });

  }

  onSelectChange(ev) {
    const teamMemberID = ev.target.value;
    axios.get(`${api}/teammembers/${teamMemberID}`)
      .then((result) => {
        const teamMemberData = result.data;
        this.setState({
          currentTeamMember: {
            id: teamMemberData.id,
            name: teamMemberData.name,
            title: teamMemberData.title,
          },
        });
      })
      .then(() => {
        browserHistory.push(`/team/${this.state.currentTeamMember.id}`);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  getFormProps(modalType) {
    // If a modal is being rendered in <SkillModal />, we need to pass in the
    // props for by the form.
    switch (modalType) {
      case 'AddTeamMember': {
        return {
          closeModal: this.closeModal,
          onSubmit: this.addTeamMember,
        };
      }
      case 'DeleteTeamMember': {
        return {
          shouldDelete: this.shouldDelete,
        };
      }
      default: {
        // if there is no modal to render, or if an invalid type has been
        // requested, return an empty object
        return {};
      }
    }
  }

  openNewModalType(modalType) {
    return () => {
      this.setState({
        displayedModalType: modalType,
        isModalDisplayed: true,
      });
    };
  }

  closeModal() {
    this.setState({
      displayedModalType: '',
      isModalDisplayed: false,
    });
  }

  loadTeamMembers() {
    return axios.get(`${api}/teammembers/`)
      .then((result) => {
        const teamMembers = result.data.slice();
        this.setState({
          teamMembers,
        });
      })
      .catch((err) => {
        console.log(`Error fetching team members: ${err}`);
      });
  }

  loadCurrentTeamMember(currentID) {
    console.log('Loading current team member!')
    return axios.get(`${api}/teammembers/${currentID}`)
      .then(res => {
        const result = res.data;
        this.setState({
          currentTeamMember: {
            id:    result.id,
            name:  result.name,
            title: result.title,
          },
        });
      })
      .catch(err => console.log(err));
  }

  addTeamMember(name, title) {
    axios.post(`${api}/teammembers/`, {
      name,
      title,
    }).then((response) => {
      this.closeModal();
      this.loadTeamMembers();
    }).catch((err) => {
      console.log(`Error: ${err}`);
    });
  }

  shouldDelete(response) {
    if (response) {
      this.deleteTeamMember();
    }
    this.closeModal();
  }

  deleteTeamMember() {
    axios.delete(`${api}/teammembers/${this.state.currentTeamMember.id}`)
      .then(() => {
        this.setState({
          currentTeamMember: {
            id: '',
            name: '',
            title: '',
          },
        });
        // Refetch the list of team members
        this.loadTeamMembers();
      })
      .then(() => {
        browserHistory.push('/team/');
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  render() {
    let selectedItem = null;
    const tmOptions = this.state.teamMembers.map((teamMember, idx) =>
      <option key={idx} value={teamMember.id}>
        {teamMember.name}
      </option>
    );
    if (this.state.currentTeamMember.id) {
      selectedItem = (
        <ItemDisplayer
          typeName="TeamMember"
          deleteCallback={this.openNewModalType('DeleteTeamMember')}
        >
          <TeamMemberDisplay
            selected={this.state.currentTeamMember}
          />
        </ItemDisplayer>
      );
    }
    return (
      <div>
        <Row>
          <Col xs={4} md={4}>
            <FormControl 
              name='teamMembers'
              componentClass='select' 
              onChange={this.onSelectChange} >
              {<option selected disabled>Select A Team Member...</option>}
              {tmOptions}
            </FormControl>
          </Col>
          <WithLogin>
            <Button
              name="addTeamMember"
              bsStyle="primary"
              onClick={this.openNewModalType('AddTeamMember')}
            >
              Add Team Member
            </Button>
          </WithLogin>

          <TeamModalContainer
            closeModalCallback={this.closeModal}
            displayedModalType={this.state.displayedModalType}
            formProps={this.getFormProps(this.state.displayedModalType)}
            isModalDisplayed={this.state.isModalDisplayed}
          />
        </Row>
        {selectedItem}
      </div>
    );
  }
}

export default Team;
