import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'
import GoalAccordian from '../Accordians/GoalAccordian'



class ProgramAccordian extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            program: this.props.program,
            showModal: false,
            goalInputModal: '',

        }

        this.handleProjectClick = this.handleProjectClick.bind(this);
        this.handleAddNewGoal = this.handleAddNewGoal.bind(this);
        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.getDefaultActiveKey = this.getDefaultActiveKey.bind(this);
        this.handleCross = this.handleCross.bind(this)

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

    handleAddNewGoalClick(event) {
        event.stopPropagation()
        this.setState({ showModal: true })

    }

    handleAddNewGoal(event) {
        event.stopPropagation()
        let program = this.state.program
        let goal = {}
        goal.name = this.state.goalInputModal
        this.props.addGoal(program, goal)
        this.setState({ showModal: false })
    }

    handleClose(event) {
        event.stopPropagation()
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
                        <Modal.Title>Add Goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add Goal Title"
                            onChange={(e) => { e.stopPropagation(); this.setState({ goalInputModal: e.target.value }) }}
                            onClick={(e) => { e.stopPropagation() }}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.handleClose(e)}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewGoal(e)} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                {// Accordian
                }
                <Accordion id="goalAccord" key="goalAccord" defaultActiveKey="1" style={{}} onClick={(event) => this.handleAccordianClick(event)} >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                            padding: '3% 2%'
                        }}  >
                            {
                                // <i className="fa fa-list" aria-hidden="true" style={{ color: 'black', fontWeight: 'bold' }}></i>

                            }


                            {
                                (this.state.isActive) ?
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-down" style={{ margin: '2%' }}></i></div> :
                                    <div style={{ display: 'inline' }}> <i className="fas fa-angle-right" style={{ margin: '2%' }}></i></div>
                            }
                            {this.props.program.name}


                            {
                                (this.props.program.goals.length > 0) ? <div className="add-new-goal-div">
                                    <a onClick={(event) => this.handleAddNewGoalClick(event)} style={{ display: 'inline' }}> <i className="fas fa-plus" aria-hidden="true" ></i></a>
                                </div> : ''

                            }


                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body style={{ padding: '0%', paddingTop: '0%' }}>

                                {
                                    this.props.program.goals.map(goal => {
                                        return (<GoalAccordian key={goal._id} goal={goal} program={this.props.program} activeObjectiveId={this.props.activeObjectiveId} addObjective={this.props.addObjective} activeListProjectId={this.props.activeListProjectId} activeListProgramId={this.props.activeListProgramId} addProject={this.props.addProject} changeProject={this.props.changeProject} handleChangeActiveProjectListItem={this.props.handleChangeActiveProjectListItem}
                                            changeObjective={this.props.changeObjective} />)
                                    })
                                }

                                {
                                    (this.props.program.goals.length == 0) ? <div className="add-new-goal-div-text" >
                                        <a onClick={(event) => this.handleAddNewGoalClick(event)}> <i className="fas fa-plus" aria-hidden="true" ></i> Add Goal</a>
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

export default ProgramAccordian;