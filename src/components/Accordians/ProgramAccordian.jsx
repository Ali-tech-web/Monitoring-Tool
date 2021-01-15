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
        let program = this.state.program
        let goal = {}
        goal.name = this.state.goalInputModal
        this.props.addGoal(program, goal)
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
        console.log('I am in Program Accordian')
        return (
            <React.Fragment>
                <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add Goal Title"
                            onChange={(e) => this.setState({ goalInputModal: e.target.value })}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewGoal(e)} >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                {// Accordian
                }
                <Accordion id="goalAccord" key="goalAccord" style={{ marginBottom: '1%' }} onClick={(event) => this.handleAccordianClick(event)} >
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}  >
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
                            <Card.Body style={{ padding: '1%' }}>

                                {
                                    this.props.program.goals.map(goal => {
                                        return (<GoalAccordian key={goal.id} goal={goal} program={this.props.program} addObjective={this.props.addObjective} activeListProjectId={this.props.activeListProjectId} activeListProgramId={this.props.activeListProgramId} addProject={this.props.addProject} changeProject={this.props.changeProject} handleChangeActiveProjectListItem={this.props.handleChangeActiveProjectListItem} />)
                                    })
                                }

                                <div className="add-new-goal-div">
                                    <a onClick={(event) => this.handleAddNewGoalClick(event)}> <i className="fas fa-plus" aria-hidden="true" ></i> Add Goal</a>
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