import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import { Row, Col }  from 'react-bootstrap';
import axios from 'axios';
import SkillForm from './SkillsForm'
import LinkForm from './LinksForm'

var Select = require('react-select');
var api = (process.env.REACT_APP_API);

class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      skillModalIsOpen: false,
      linkModalIsOpen: false,
      currentSkill: {
        skill_id: "",
        name: "",
        skill_type: "",
        links: [],
      }
    };

    this.openSkillModal = this.openSkillModal.bind(this);
    this.afterOpenSkillModal = this.afterOpenSkillModal.bind(this);
    this.closeSkillModal = this.closeSkillModal.bind(this);

    this.openLinkModal = this.openLinkModal.bind(this);
    this.afterOpenLinkModal = this.afterOpenLinkModal.bind(this);
    this.closeLinkModal = this.closeLinkModal.bind(this);
  }

  openSkillModal() {
    this.setState({skillModalIsOpen: true});
  }

  afterOpenSkillModal() {
  }

  closeSkillModal() {
    this.setState({skillModalIsOpen: false});
  }

  openLinkModal() {
    this.setState({linkModalIsOpen: true});
  }

  afterOpenLinkModal() {
  }

  closeLinkModal() {
    this.setState({linkModalIsOpen: false});
  }

  onChange(key, value) {
    axios.get(api + '/skills/' + value)
      .then(res => {
        const skillresults = res.data
        console.log(value)
        console.log(skillresults)
        this.setState(
          {currentSkill: {
            skill_id: skillresults.id,
            name: skillresults.name,
            skill_type: skillresults.skill_type,
            links: skillresults.links,
          }});
        // console.log(res.data);
      });
  }

  componentDidMount() {
    console.log(process.env)
    axios.get(api + `/skills/`)
      .then(res => {
        const skills = res.data.map(obj => obj);
        this.setState({ skills });
      });
  }

  render() {
    const onSkillChange = ev => this.onChange("skill_id", ev.id);
    const currentSkillID = this.state.currentSkill.skill_id;
    const isSkillSelected = currentSkillID === "" ? false : true;
    if(this.state.currentSkill.links == null) {
      console.log("links is not null");
    }
    console.log("links IS the following:");
    console.log(this.state.currentSkill.links);
    // links = this.state.currentSkill.links.map(link =>
    //   <li>{link}</li>
    // );
    // console.log("links is this: " + links);
    return (
        <div>
          <Row>
            <Col xs={4} md={4}>
              <form onSubmit={ev => this.onSubmit(ev)}>
              <Select
                name="skills"
                labelKey="name"
                value={this.state.skill_type}
                onChange={onSkillChange}
                options={this.state.skills}
              />
              </form>
            </Col>
            <Button name="add_skill"
                    bsStyle="primary" 
                    onClick={this.openSkillModal}>
              Add Skill
            </Button>
            
            <Modal
              isOpen={this.state.skillModalIsOpen}
              onAfterOpen={this.afterOpenSkillModal}
              onRequestClose={this.closeSkillModal}
              contentLabel="SkillModal"
            >
              <SkillForm api={api} 
                         closeModal={this.closeSkillModal} />
            </Modal>

            <Modal
              isOpen={this.state.linkModalIsOpen}
              onAfterOpen={this.afterOpenLinkModal}
              onRequestClose={this.closeLinkModal}
              contentLabel="LinkModal"
            >
              <LinkForm api={api} 
                        closeModal={this.closeLinkModal} 
                        skill_id={currentSkillID}/>
            </Modal>
            {/* <Col xs={4} md={4} /> */}

          </Row>

          <Button name="add_link" 
                  bsStyle="primary" 
                  onClick={this.openLinkModal}
                  disabled={!isSkillSelected}>
            Add Link
          </Button>
          <h1>{this.state.currentSkill.name}</h1>
          <h4>{this.state.currentSkill.skill_type}</h4>
          <ul>links</ul>

        </div>
    );
  }
}

export default Skills