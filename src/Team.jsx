import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import { Row, Col }  from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import { ModalStyle } from './Styles'

import AddTeamMemberForm from './AddTeamMemberForm.jsx';
import SelectedItem from './SelectedItem.jsx';
import TeamMemberDisplay from './TeamMemberDisplay.jsx';
import DeleteModal from './DeleteModal.jsx';
import DeleteButton from './DeleteButton.jsx';

var api = (process.env.REACT_APP_API);

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      addModalIsOpen: false,
      deleteModalIsOpen: false,
      selectedTeamMember: {
        id: "",
        name: "",
        title: "",
      }
    };

    this.fetchTeamMembers = this.fetchTeamMembers.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.shouldDelete = this.shouldDelete.bind(this);
    this.deleteTeamMember = this.deleteTeamMember.bind(this);
  }

  openAddModal() {
    this.setState({ addModalIsOpen: true });
  }

  closeAddModal() {
    this.setState({ addModalIsOpen: false });
  }

  openDeleteModal() {
    this.setState({ deleteModalIsOpen: true });
  }

  closeDeleteModal() {
    this.setState({ deleteModalIsOpen: false });
  }

  fetchTeamMembers() {
    axios.get(`${api}/teammembers/`)
      .then((result) => {
        const teamMembers = result.data.slice();
        this.setState({
          teamMembers: teamMembers
        });
      })
      .catch((err) => {
        console.log(`Error fetching team members: ${err}`);
      });
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
          }
        });
      }).catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  addTeamMember(name, title) {
    axios.post(`${api}/teammembers/`, {
      name: name,
      title: title
    }).then((response) => {
        this.closeAddModal();
        this.fetchTeamMembers();
      }).catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  shouldDelete(response) {
    if (response) {
      this.deleteTeamMember();
    }
    this.closeDeleteModal();
  }

  deleteTeamMember() {
    axios.delete(`${api}/teammembers/${this.state.selectedTeamMember.id}`)
      .then((result) => {
        this.setState({
          selectedTeamMember: {
            id: "",
            name: "",
            title: "",
          }
        });
        // Refetch the list of team members
        this.fetchTeamMembers();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  componentDidMount() {
    this.fetchTeamMembers();
  }

  render() {
    let selectedItem = null;
    if (this.state.selectedTeamMember.id) {
      selectedItem = (
        <SelectedItem
          typeName="TeamMember"
          deleteCallback={this.openDeleteModal}
        >
          <TeamMemberDisplay
            selected={this.state.selectedTeamMember}
          />
        </SelectedItem>
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
              onChange={this.onSelectChange} />
          </Col>
          <Button
            name="addTeamMember"
            bsStyle="primary"
            onClick={this.openAddModal}
            children="Add Team Member" />

          <Modal
            isOpen={this.state.addModalIsOpen}
            onRequestClose={this.closeAddModal}
            contentLabel="AddTeamMemberModal"
            style={ModalStyle} >
            <AddTeamMemberForm
              onSubmit={this.addTeamMember}
              closeModal={this.closeAddModal}/>
          </Modal>
        </Row>
        {selectedItem}
        <Modal
          isOpen={this.state.deleteModalIsOpen}
          onRequestClose={this.closeDeleteModal}
          contentLabel="DeleteTeamMemberModal"
          style={ModalStyle} >
          <DeleteModal
            shouldDelete={this.shouldDelete}
          />
        </Modal>
      </div>
    );
  }
}

export default Team;
