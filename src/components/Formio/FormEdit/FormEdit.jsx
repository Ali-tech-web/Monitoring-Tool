import { React, Component } from 'react';
import { FormEdit } from 'react-formio';
import Form from './Form.jsx'
import Formio from 'formiojs';
import axios from "axios";
import { Redirect } from 'react-router-dom';
class FrmEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            form: {}
        }
        this.saveForm = this.saveForm.bind(this);
        this.isEmpty = this.isEmpty.bind(this);

    }



    saveForm(form) {
        console.log("Form Data is below")
        // Send a POST request
        axios({
            method: 'post',
            url: 'https://api.appilizer.com/api/form',
            data: form
        })
            .then(res => {
                console.log('Response Received')
                console.log(res.data)
                this.setState({
                    redirect: true,
                    form: res.data.Response
                })

            })
            .catch(err => {
                console.log(err)
            })
        //console.log(form)

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
        if (this.state.redirect) {
            this.props.saveForm(this.state.form)
            // this.setState({ form: {} })
            return <Form form={this.state.form} />

        } else {
            console.log('I am in form edit')

            return (
                <div style={{ overflow: 'scroll' }}>
                    <FormEdit
                        form={{ display: 'form' }}
                        onSaveComponent={(component) => this.saveComponent(component)}
                        saveText="Save"
                        saveForm={(form) => this.saveForm(form)}
                    />
                </div>

            );
        }

    }
}

export default FrmEdit;