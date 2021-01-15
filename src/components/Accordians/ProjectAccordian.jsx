import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import ReactTooltip from 'react-tooltip';
import '../style.css'



class ProjectAccordian extends Component {
    // Need To pass in props  1: program 2:handleChangeActiveProjectListItem 3:handleChangeActiveProjectListItem 4:activeListProgramId 5:addProject


    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            program: this.props.program,
            showModal: false,
            objectiveInputModal: '',

        }

        this.handleObjectiveClick = this.handleObjectiveClick.bind(this);
        this.handleAddNewObjective = this.handleAddNewObjective.bind(this);
        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.getDefaultActiveKey = this.getDefaultActiveKey.bind(this);

    }

    handleAccordianClick(event) {
        event.stopPropagation()

        let activeStatus = (this.state.isActive) ? false : true
        this.setState({ isActive: activeStatus })


    }

    // handleProjectClick(event, proj) {
    //     event.stopPropagation()

    //     this.props.handleChangeActiveProjectListItem(event.target.id)

    //     console.log(event.target.id)
    //     this.props.changeProject(this.state.program, proj)
    // }

    handleObjectiveClick(event, obj) {
        console.log('Clicked An Objective')
        console.log(obj)
    }


    handleAddNewObjectiveClick(event) {
        event.stopPropagation()
        this.setState({ showModal: true })

    }

    handleAddNewObjective(event) {
        // let program = this.state.program
        // let goal = this.props.goal
        // let project = {}
        // project.name = this.state.objectiveInputModal
        // this.props.addProject(program, project, goal)
        // this.setState({ showModal: false })
        console.log('I am in handle Add New Objective')
        let goal = this.props.goal
        let project = this.props.project
        let program = this.props.program
        let objective = this.state.objectiveInputModal
        console.log('New Objective To be added')
        console.log(objective)

        console.log(goal)
        console.log(project)
        console.log(program)
        var data = {
            program: program,
            goal: goal,
            project: project,
            objective: objective
        }
        this.props.addObjective(data)
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
                        <Modal.Title>Add Objective</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add Objective Title"
                            onChange={(e) => this.setState({ objectiveInputModal: e.target.value })}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewObjective(e)} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                {// Accordian
                }
                <Accordion id="projectAccord" key="projectAccord" defaultActiveKey="1" style={{}} onClick={(event) => this.handleAccordianClick(event)} >
                    <Card >
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.03)'
                        }} >
                            <div className="cut-text" data-tip={this.props.project.name} >
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                <i className="fas fa-project-diagram" aria-hidden="true" style={{ color: 'black', fontWeight: 'bold' }} ></i>

                                {'\u00A0'}
                                {'\u00A0'}

                                {this.props.project.name}
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
                                        this.props.project.objectives.map(obj => {
                                            {
                                                // Concatenating id of project with program id // can be incorporated to with programid
                                                var listItemId = obj.id.toString() + this.props.project.id.toString()

                                            }
                                            return (<li key={obj.id} id={listItemId} className={this.ListItemClass(listItemId)} onClick={(event) => this.handleObjectiveClick(event, obj)} >

                                                <i className="fa fa-object-group" aria-hidden="true" style={{ fontWeight: 'bold' }}></i>  {'\u00A0'} {obj.name}
                                            </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="add-new-objective-div">
                                    <a onClick={(event) => this.handleAddNewObjectiveClick(event)}> <i className="fas fa-plus" aria-hidden="true" ></i> Add Objective</a>
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        );
    }
}

export default ProjectAccordian;