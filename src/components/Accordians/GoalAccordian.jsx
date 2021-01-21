import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import ReactTooltip from 'react-tooltip';
import '../style.css'
import ProjectAccordian from '../Accordians/ProjectAccordian'



class GoalAccordian extends Component {
    // Need To pass in props  1: program 2:handleChangeActiveProjectListItem 3:handleChangeActiveProjectListItem 4:activeListProgramId 5:addProject


    constructor(props) {
        super(props)
        this.state = {
            isActive: true,
            program: this.props.program,
            showModal: false,
            projectInputModal: '',
            activeObjectiveId: ''

        }

        this.handleProjectClick = this.handleProjectClick.bind(this);
        this.handleAddNewProject = this.handleAddNewProject.bind(this);
        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.getDefaultActiveKey = this.getDefaultActiveKey.bind(this);
        this.handleCross = this.handleCross.bind(this)
        this.handleChangeActiveObjective = this.handleChangeActiveObjective.bind(this)

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
        event.stopPropagation()
        let program = this.state.program
        let goal = this.props.goal
        let project = {}
        project.name = this.state.projectInputModal

        this.props.addProject(program, project, goal)
        this.setState({ showModal: false })

    }

    handleChangeActiveObjective(id) {
        console.log('I am in change Active Objective : about to set the state')
        console.log(id)
        this.setState({ activeObjectiveId: id })

    }

    handleClose(e) {
        e.stopPropagation()
        this.setState({ showModal: false })
    }

    handleCross() {
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
                <Modal show={this.state.showModal} onHide={this.handleCross}>
                    <Modal.Header >
                        <Modal.Title>Add Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add Project Title"
                            onChange={(e) => { e.stopPropagation(); this.setState({ projectInputModal: e.target.value }) }}
                            onClick={(e) => { e.stopPropagation() }}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.handleClose(e)}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewProject(e)} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                {// Accordian
                }
                <Accordion id="programAccord" key="ProgramAccord" defaultActiveKey={this.getDefaultActiveKey(this.props.program.pid)} defaultActiveKey="0" onClick={(event) => this.handleAccordianClick(event)} >
                    <Card >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            padding: '3% 2%'
                        }} >
                            <div className="cut-text" data-tip={this.props.goal.name} >
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}

                                {
                                    (this.state.isActive) ?
                                        <div style={{ display: 'inline' }}> <i className="fas fa-angle-down" style={{ margin: '2%' }}></i></div> :
                                        <div style={{ display: 'inline' }}> <i className="fas fa-angle-right" style={{ margin: '2%' }}></i></div>

                                }


                                {
                                    //<i className="fa fa-bullseye" aria-hidden="true" style={{ color: 'black', fontWeight: 'bold' }}></i>
                                }
                                {'\u00A0'}
                                {'\u00A0'}

                                {this.props.goal.name}
                                <ReactTooltip place="right" type="dark" effect="float" />

                            </div>
                            {

                                (this.props.goal.projects.length > 0) ? <div className="add-new-project-div">
                                    <a onClick={(event) => this.handleAddNewProjectClick(event)} style={{ display: 'inline' }}> <i className="fas fa-plus" aria-hidden="true" ></i></a>
                                </div> : ''


                            }

                            {
                                // (this.state.isActive) ?
                                //     <div style={{ display: 'inline' }}> <i className="fas fa-angle-down" style={{ float: 'right', margin: '2%' }}></i></div> :
                                //     <div style={{ display: 'inline' }}> <i className="fas fa-angle-right" style={{ float: 'right', margin: '2%' }}></i></div>
                            }



                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={{ padding: '1%' }}>

                                {
                                    this.props.goal.projects.map(proj => {
                                        // {
                                        //     // Concatenating id of project with program id
                                        //     var listItemId = proj.id.toString() + this.props.program.id.toString()

                                        // }
                                        return (<ProjectAccordian key={proj._id} program={this.props.program} project={proj} goal={this.props.goal} addObjective={this.props.addObjective} handleChangeActiveProjectListItem={this.props.handleChangeActiveProjectListItem} changeProject={this.props.changeProject} addProject={this.props.addProject}
                                            activeObjectiveId={this.props.activeObjectiveId} changeActiveObjective={this.handleChangeActiveObjective} activeListProjectId={this.props.activeListProjectId} activeListProgramId={this.props.activeListProgramId} changeObjective={this.props.changeObjective} />)
                                    })
                                }

                                {
                                    (this.props.goal.projects.length == 0) ?
                                        <div className="add-new-project-div-text">
                                            <a onClick={(event) => this.handleAddNewProjectClick(event)}> <i className="fas fa-plus" aria-hidden="true" ></i> Add Project</a>
                                        </div> : ''

                                }



                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        );
    }
}

export default GoalAccordian;