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
        console.log('I am in On submit Event')
        console.log(filledForm)
        // Send a POST request
        axios({
            method: 'post',
            url: 'https://api.appilizer.com/api/formSubmission',
            data: filledForm
        })
            .then(res => {
                console.log('Response Received')
                console.log(res.data.Response)
                this.setState({
                    redirect: true,
                    submission: res.data.Response
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        if (this.state.redirect) {
            console.log('I am about to redirect TO GRID')
            // console.log("Form : "+JSON.stringify(this.props.form))
            // console.log("Submission : "+JSON.stringify(this.state.submission))
            // var forms = [this.props.form, this.props.form ]
            // console.log(forms)
            return (<Form form={this.props.form} submission={this.state.submission} options={{ readOnly: true, inputsOnly: true }} />);

            // return (<SubmissionGrid form={this.props.form} submissions={[this.state.submission,this.state.submission]}/>)
        }
        console.log('I am in Form')

        return (<Form form={this.props.form} onSubmit={(form) => this.onSubmit(form)} />);
    }
}

export default Frm;