import React, { Component } from 'react';
// import Form from '../components/Formio/FormEdit/Form.jsx'
import { Form } from 'react-formio';

class EvalFormView extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }


    }


    render() {
        console.log('About to display Submission')
        console.log(this.props.kpi)
        console.log(this.props.kpi.formData)
        return (<React.Fragment>
            <Form form={this.props.kpi.formDefinition} submission={{ data: this.props.kpi.formData }} options={{ readOnly: true }} />
        </React.Fragment>);
    }
}

export default EvalFormView;
