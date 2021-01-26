import { React, Component } from 'react';
import ReactDOM from 'react-dom';
import { FormBuilder, Form, FormEdit, FormGrid, SubmissionGrid } from 'react-formio';
import Formio from 'formiojs';
import axios from "axios";
class Frm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            form: {},
            submission: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
    }



    onSubmit(filledForm) {


        this.setState({

            submission: filledForm
        })


    }

    render() {

        return (<Form form={this.props.form} onSubmit={(form) => this.onSubmit(form)} submission={this.state.submission} />);
    }
}

export default Frm;