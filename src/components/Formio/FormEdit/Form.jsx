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


        // Send a POST request
        // axios({
        //     method: 'post',
        //     url: 'https://api.appilizer.com/api/formSubmission',
        //     data: filledForm
        // })
        //     .then(res => {
        //         console.log('Response Received')
        //         console.log(res.data.Response)
        //         this.setState({
        //             redirect: true,
        //             submission: res.data.Response
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        this.setState({

            submission: filledForm
        })


    }

    render() {

        return (<Form form={this.props.form} onSubmit={(form) => this.onSubmit(form)} submission={this.state.submission} />);
    }
}

export default Frm;