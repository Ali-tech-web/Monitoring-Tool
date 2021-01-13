import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'
import FirstProgramForm from '../Forms/FirstProgram.jsx'
import ProgramAccordian from '../Accordians/ProgramAccordian.jsx'





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
        console.log('I am in Handle Change Prog')
        console.log(ListProgramId)
        this.setState({ activeListProgramId: ListProgramId })
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar">
                    <div className='row' style={{ marginTop: '8%' }}>
                        <a className="active col-4 text-center" href="#planning">Planning</a>
                        <a href="#education" className="col-4 text-center">Execution</a>
                        <a href="#evaluation" className="col-4 text-center">Evaluation</a>
                    </div>
                    <div className="sidebar-content-area hide-scrollbar">

                    </div>
                </div>


            </React.Fragment>


        );
    }
}

export default Sidebar;