import React, { Component } from 'react';
// import Form from '../components/Formio/FormEdit/Form.jsx'
import { Form } from 'react-formio';

class FormView extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.submitForm = this.submitForm.bind(this)
        this.updateForm = this.updateForm.bind(this)

    }

    submitForm(form) {
        console.log('I am in Submit Form')
    }

    updateForm(event) {
        event.stopPropagation()
        this.props.setUpdateFlag()
    }


    render() {
        //let formDefinition = this.props.formDefinition
        //console.log('I am in Form View')

        return (<React.Fragment>
            <Form form={this.props.kpi.formDefinition} onSubmit={(form) => this.submitForm(form)} options={{ readOnly: true }} />
            <button className="btn btn-primary btn-md" onClick={(event) => this.updateForm(event)}>Update</button>

            {
                // (!(this.isEmpty(activeProject.form))) ? <button className="btn btn-primary btn-md" onClick={(event) => this.updateForm(event)}>Update</button> : ''
            }

        </React.Fragment>);
    }
}

export default FormView;







// class FormView extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {

//         }

//         this.updateForm = this.updateForm.bind(this)
//     }

//     updateForm(event) {
//         console.log('I have to update the form')
//         this.props.updateForm(this.props.activeProgram, this.props.activeProject)

//     }

//     // checks if an object is empty
//     isEmpty(obj) {
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key))
//                 return false;
//         }
//         return true;
//     }

//     render() {
//         var activeProject = this.props.activeProject

//         console.log('displaying active Project')


//         return (
//             <React.Fragment>
//                 <Form form={activeProject.form} />
//                 {
//                     (!(this.isEmpty(activeProject.form))) ? <button className="btn btn-primary btn-md" onClick={(event) => this.updateForm(event)}>Update</button> : ''
//                 }

//             </React.Fragment>
//         );
//     }
// }

// export default FormView;