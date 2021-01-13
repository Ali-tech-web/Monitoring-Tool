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
            projectInputModal: '',

        }

        this.handleProjectClick = this.handleProjectClick.bind(this);
        this.handleAddNewProject = this.handleAddNewProject.bind(this);
        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.getDefaultActiveKey = this.getDefaultActiveKey.bind(this);

    }

    handleAccordianClick(event) {

        let activeStatus = (this.state.isActive) ? false : true
        this.setState({ isActive: activeStatus })


    }

    handleProjectClick(event, proj) {
        event.stopPropagation()

        this.props.handleChangeActiveProjectListItem(event.target.id)

        console.log(event.target.id)
        this.props.changeProject(this.state.program, proj)
    }

    handleAddNewProjectClick(event) {
        event.stopPropagation()
        this.setState({ showModal: true })

    }

    handleAddNewProject(event) {
        let program = this.state.program
        let project = {}
        project.name = this.state.projectInputModal
        this.props.addProject(program, project)
        this.setState({ showModal: false })

    }

    handleClose() {
        this.setState({ showModal: false })
    }

    ListItemClass(listItemId) {

        return ((listItemId === this.props.activeListProjectId) ? 'blue-text-color' : '')

    }

    getDefaultActiveKey(programId) {

        return ((programId === this.props.activeListProgramId) ? "0" : "1")
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

                {// Accordian
                }
                <Accordion id="programAccord" key="ProgramAccord" defaultActiveKey={this.getDefaultActiveKey(this.props.program.pid)} style={{ backgroundColor: 'blue' }} onClick={(event) => this.handleAccordianClick(event)} >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" >
                            <i className="fa fa-list" aria-hidden="true" style={{ color: 'black', fontWeight: 'bold' }}></i>
                            {'\u00A0'}
                            {'\u00A0'}
                            {this.props.program.name}
                            {
                                (this.state.isActive) ?
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-down" style={{ float: 'right', margin: '2%' }}></i></div> :
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-right" style={{ float: 'right', margin: '2%' }}></i></div>
                            }



                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                    {
                                        this.props.program.projects.map(proj => {
                                            {
                                                // Concatenating id of project with program id
                                                var listItemId = proj.id.toString() + this.props.program.pid.toString()

                                            }
                                            return (<li key={proj.id} id={listItemId} className={this.ListItemClass(listItemId)} onClick={(event) => this.handleProjectClick(event, proj)} >
                                                <i className="fas fa-project-diagram"  ></i>  {'\u00A0'} {proj.name}
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