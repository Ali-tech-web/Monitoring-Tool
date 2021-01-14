import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import ReactTooltip from 'react-tooltip';
import '../style.css'



class GoalAccordian extends Component {
    // Need To pass in props  1: program 2:handleChangeActiveProjectListItem 3:handleChangeActiveProjectListItem 4:activeListProgramId 5:addProject


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
        event.stopPropagation()

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
        let goal = this.props.goal
        let project = {}
        project.name = this.state.projectInputModal
        this.props.addProject(program, project, goal)
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
                <Accordion id="programAccord" key="ProgramAccord" defaultActiveKey={this.getDefaultActiveKey(this.props.program.pid)} style={{}} onClick={(event) => this.handleAccordianClick(event)} >
                    <Card >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.03)'
                        }} >
                            <div className="cut-text" data-tip={this.props.goal.name} >
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}

                                <i className="fa fa-bullseye" aria-hidden="true" style={{ color: 'black', fontWeight: 'bold' }}></i>
                                {'\u00A0'}
                                {'\u00A0'}

                                {this.props.goal.name}
                                <ReactTooltip place="right" type="dark" effect="float" />


                            </div>

                            {
                                (this.state.isActive) ?
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-down" style={{ float: 'right', margin: '2%' }}></i></div> :
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-right" style={{ float: 'right', margin: '2%' }}></i></div>
                            }



                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={{ padding: '1%' }}>
                                <ul>
                                    {
                                        this.props.goal.projects.map(proj => {
                                            {
                                                // Concatenating id of project with program id
                                                var listItemId = proj.id.toString() + this.props.program.id.toString()

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

export default GoalAccordian;