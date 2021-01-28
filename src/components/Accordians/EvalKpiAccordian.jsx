import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap'
import { FormEdit, Form } from 'react-formio';
import EvalFormView from '../../views/EvalFormView'
import '../style.css'

class KpiAccordian extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive: false

        }

        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        //this.saveForm = this.saveForm.bind(this)
        //this.handleSetUpdateFlag = this.handleSetUpdateFlag.bind(this)
        //this.handleUnsetUpdateFlag = this.handleUnsetUpdateFlag.bind(this)

    }

    handleAccordianClick(event) {
        event.stopPropagation()
        let activeStatus = (this.state.isActive) ? false : true
        this.setState({ isActive: activeStatus })
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

        return (
            <React.Fragment>

                <Accordion defaultActiveKey="1" style={{ marginBottom: '1%' }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }} className='kpi-padding' onClick={(event) => this.handleAccordianClick(event)}>
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


                                        (this.props.kpi.hasOwnProperty('formDefinition') && !(this.isEmpty(this.props.kpi.formData))) ? <EvalFormView kpi={this.props.kpi} /> : <div className='text-center'>'No Submitted Data Available'</div>

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