import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'
import FirstProgramForm from '../Forms/FirstProgram.jsx'
import ProgramAccordian from '../Accordians/ProgramAccordian.jsx'
import GoalAccordian from '../Accordians/ProgramAccordian.jsx'





class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showAddProgramForm: false,
            activeListProgramId: '',
            activeListProjectId: ''
        }
        this.addNewProgram = this.showAddNewProgramForm.bind(this)
        this.hideAddProgramForm = this.hideAddProgramForm.bind(this)
        this.getFormDisplayClass = this.getFormDisplayClass.bind(this)
        this.getLinkDisplayClass = this.getLinkDisplayClass.bind(this)
        this.handleChangeActiveProjectListItem = this.handleChangeActiveProjectListItem.bind(this)
        this.handleChangeActiveProgramListItem = this.handleChangeActiveProgramListItem.bind(this)


    }



    showAddNewProgramForm() {

        this.setState({ showAddProgramForm: true })

    }
    hideAddProgramForm() {
        this.setState({ showAddProgramForm: false })
    }

    getFormDisplayClass() {
        return ((this.state.showAddProgramForm) ? '' : 'display-none')
    }

    getLinkDisplayClass() {
        return ((this.state.showAddProgramForm) ? 'display-none' : '')
    }

    handleChangeActiveProjectListItem(ListProjectId) {
        this.setState({ activeListProjectId: ListProjectId })
    }

    handleChangeActiveProgramListItem(ListProgramId) {


        this.setState({ activeListProgramId: ListProgramId })
    }

    render() {
        return (
            <React.Fragment>


                <div className="sidebar-content-area hide-scrollbar">
                    <Accordion defaultActiveKey="0" >
                        <Card >

                            <div>
                                <Accordion.Toggle as={Card.Header} eventKey="0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)', fontWeight: 'bold' }}>
                                    <i className="fab fa-windows" style={{ color: 'black' }}></i>  {'\u00A0'} Programs
                                     </Accordion.Toggle>
                            </div>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body style={{ padding: '0%', paddingTop: '0%' }}>

                                    {
                                        (this.props.programs.length > 0) ? this.props.programs.map(program => {

                                            return <ProgramAccordian key={program._id} addObjective={this.props.addObjective} program={program} handleChangeActiveProgramListItem={this.handleChangeActiveProgramListItem} activeListProgramId={this.state.activeListProgramId} handleChangeActiveProjectListItem={this.handleChangeActiveProjectListItem} activeListProjectId={this.state.activeListProjectId} changeProject={this.props.changeProject} addProject={this.props.addProject}
                                                activeObjectiveId={this.props.activeObjectiveId} addGoal={this.props.addGoal} changeObjective={this.props.changeObjective} />
                                        }) : <FirstProgramForm addProgram={this.props.addProgram} hideAddProgramForm={this.hideAddProgramForm} />
                                    }
                                    {
                                        (this.props.programs.length > 0) ? <div className='add-new-program-link '>
                                            <a id='addNewProgramLink' className={this.getLinkDisplayClass()} style={{ fontWeight: 'normal' }} onClick={() => this.showAddNewProgramForm()}><i className="fa fa-plus" aria-hidden="true" ></i> New Program</a>
                                            <div className={this.getFormDisplayClass()}> <FirstProgramForm id='addProgramForm' addProgram={this.props.addProgram} hideAddProgramForm={this.hideAddProgramForm} /></div>
                                        </div> : ''

                                    }

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>



            </React.Fragment>


        );
    }
}

export default Sidebar;