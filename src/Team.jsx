import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Select from 'react-select';

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
      selectedTeamMember: {
        id: '',
        name: '',
        title: '',
      },
    };

    this.openNewModalType = this.openNewModalType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.fetchTeamMembers = this.fetchTeamMembers.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.deleteTeamMember = this.deleteTeamMember.bind(this);
  }

  componentDidMount() {
    this.fetchTeamMembers();
  }

  onSelectChange(obj) {
    axios.get(`${api}/teammembers/${obj.id}`)
      .then((result) => {
        const teamMemberData = result.data;
        this.setState({
          selectedTeamMember: {
            id: teamMemberData.id,
            name: teamMemberData.name,
            title: teamMemberData.title,
          },
        });
      })
      .then(() => {
        browserHistory.push(`/team/${this.state.selectedTeamMember.id}`);
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

  fetchTeamMembers() {
    axios.get(`${api}/teammembers/`)
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

  addTeamMember(name, title) {
    axios.post(`${api}/teammembers/`, {
      name,
      title,
    }).then((response) => {
      this.closeModal();
      this.fetchTeamMembers();
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
    axios.delete(`${api}/teammembers/${this.state.selectedTeamMember.id}`)
      .then(() => {
        this.setState({
          selectedTeamMember: {
            id: '',
            name: '',
            title: '',
          },
        });
        // Refetch the list of team members
        this.fetchTeamMembers();
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
    if (this.state.selectedTeamMember.id) {
      selectedItem = (
        <ItemDisplayer
          typeName="TeamMember"
          deleteCallback={this.openNewModalType('DeleteTeamMember')}
        >
          <TeamMemberDisplay
            selected={this.state.selectedTeamMember}
          />
        </ItemDisplayer>
      );
    }
    return (
      <div>
        <Row>
          <Col xs={4} md={4}>
            <Select
              name="teamMembers"
              labelKey="name"
              value={this.state.selectedTeamMember.name}
              options={this.state.teamMembers}
              onChange={this.onSelectChange}
            />
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
