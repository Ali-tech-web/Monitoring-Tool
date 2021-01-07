import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'



class ProgramAccordian extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            program: this.props.program,
            showModal: false,
            projectInputModal: ''
        }

        this.handleProjectClick = this.handleProjectClick.bind(this);
        this.handleAddNewProject = this.handleAddNewProject.bind(this)

    }

    handleAccordianClick(event) {
        console.log('Clicked Accordian')

    }

    handleProjectClick(event, proj) {
        event.stopPropagation()
        this.props.changeProject(this.state.program, proj)
    }

    handleAddNewProjectClick(event) {
        event.stopPropagation()
        this.setState({ showModal: true })

    }

    handleAddNewProject(event) {
        console.log('I Clicked Add Button')
        let program = this.state.program
        let project = {}
        project.name = this.state.projectInputModal
        this.props.addProject(program, project)
        this.setState({ showModal: false })

    }

    handleClose() {
        this.setState({ showModal: false })
    }


    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add Project Title"
                            onChange={(e) => this.setState({ projectInputModal: e.target.value })}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewProject(e)} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Accordion id="programAccord" key="ProgramAccord" onClick={(event) => this.handleAccordianClick(event)} >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            {'\u00A0'}
                            {this.props.program.name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                    {
                                        this.props.program.projects.map(proj => {
                                            return (<li key={proj.id} onClick={(event) => this.handleProjectClick(event, proj)}>
                                                <i className="fas fa-project-diagram" style={{ color: '#AAAAAA' }} ></i>  {'\u00A0'} {proj.name}
                                            </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="add-new-project-div">
                                    <a onClick={(event) => this.handleAddNewProjectClick(event)}> <i className="fas fa-plus" aria-hidden="true" ></i> Add Project</a>
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        );
    }
}

export default ProgramAccordian;