import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap'
import { FormEdit, Form } from 'react-formio';
import FormView from '../../views/FormView'
import '../style.css'

class KpiAccordian extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            isUpdate: false

        }

        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.saveForm = this.saveForm.bind(this)
        this.handleSetUpdateFlag = this.handleSetUpdateFlag.bind(this)
        this.handleUnsetUpdateFlag = this.handleUnsetUpdateFlag.bind(this)

    }

    handleAccordianClick(event) {
        event.stopPropagation()
        let activeStatus = (this.state.isActive) ? false : true
        this.setState({ isActive: activeStatus })
    }

    saveForm(form) {

        var { program, project, goal, objective } = this.props.data
        var kpi = this.props.kpi
        // To Much Information
        var newData = {
            programId: program._id,
            projectId: project._id,
            goalId: goal._id,
            objectiveId: objective._id,
            kpiId: kpi._id,
            formDefinition: form,
            program: program,
            project: project,
            goal: goal,
            objective: objective,
            kpi: kpi
        }
        this.props.saveKpiForm(newData)
        this.handleUnsetUpdateFlag()
    }
    SubmitForm(form) {
        console.log('I have submitted Form')
        console.log(form)
    }

    handleSetUpdateFlag() {
        console.log('I am about to set Update Flag')
        this.setState({ isUpdate: true })
    }

    handleUnsetUpdateFlag() {
        console.log('I am about to unset Update Flag')
        this.setState({ isUpdate: false })
    }


    // checks if an object is empty
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    render() {

        var editFormDefinition = (this.props.kpi.hasOwnProperty('formDefinition')) ? this.props.kpi.formDefinition : { display: 'form' }
        return (
            <React.Fragment>

                <Accordion defaultActiveKey="1" style={{ marginBottom: '1%' }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }} onClick={(event) => this.handleAccordianClick(event)}>
                            <div style={{ textAlign: 'left', fontWeight: '500' }}>
                                <i className="fab fa-wpforms" style={{ color: 'black', fontWeight: '500' }}></i>
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {'\u00A0'}
                                {this.props.kpi.name}
                                {
                                    (this.state.isActive) ?
                                        <div style={{
                                            display: 'inline-block',
                                            float: 'right'
                                        }}> <i className="fas fa-angle-down" style={{ margin: '2%' }}></i></div> :
                                        <div style={{
                                            display: 'inline-block',
                                            float: 'right'
                                        }}> <i className="fas fa-angle-right" style={{ margin: '2%' }}></i></div>

                                }
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div style={{ overflow: 'scroll', marginTop: '1%' }} className="hide-scrollbar">
                                    {


                                        (this.props.kpi.hasOwnProperty('formDefinition') && !this.state.isUpdate) ? <FormView kpi={this.props.kpi} setUpdateFlag={this.handleSetUpdateFlag} /> : <FormEdit
                                            form={editFormDefinition}
                                            onSaveComponent={(component) => this.saveComponent(component)}
                                            saveText="Save"
                                            saveForm={(form) => this.saveForm(form)}
                                        />

                                    }

                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </React.Fragment>
        );
    }
}

export default KpiAccordian;