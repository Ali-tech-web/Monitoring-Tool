
import Navbar from './components/Navbars/SimpleNav.jsx'
import Sidebar from './components/Sidebars/Sidebar.jsx'
import MainView from './views/Mainview.jsx'
import React from 'react';
import axios from "axios";
import FormEdit from './components/Formio/FormEdit/FormEdit.jsx'
import FormView from './views/FormView'
import Form from './components/Formio/FormEdit/Form.jsx'
import Modal from './components/Modals/AddNewProjectModal.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { ReactFormGenerator,ReactFormBuilder,DemoBar } from 'react-form-builder2';
// import 'react-form-builder2/dist/app.css';
// import FormBuilder from 'react-forms-builder'
// import {FormBuilder, Form, FormEdit, FormGrid} from 'react-formio';
// import Formio from 'formiojs';
import './style.css'





class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      activeProject: {},
      activeProgram: {},
      count: 0,
      mainContent: ''
    };
    this.handleAddProgram = this.handleAddProgram.bind(this)
    this.handleAddProject = this.handleAddProject.bind(this)
    this.handleProjectChange = this.handleProjectChange.bind(this)
    this.handleFormSave = this.handleFormSave.bind(this)
    this.handleUpdateForm = this.handleUpdateForm.bind(this)


  }

  // {pid:1 ,name : 'Microsoft IT Classes',projects: [{id:1, name:"Machine Learning"},{id:2, name: "Web Development"}], isActive: false},
  //                {pid:2 ,name : 'Skills for 2020',projects: [{id:1, name:"CNC Machine Training"},{id:2, name: "Stitching"}], isActive: false}

  handleProjectChange(program, project) {
    console.log('I am in app.js')
    console.log(program)
    console.log(project)
    console.log(project.form)
    let mainContentView;
    if (!(this.isEmpty(project))) {

      if (this.isEmpty(project.form)) {

        mainContentView = <FormEdit activeProgram={program} activeProject={project} saveForm={this.handleFormSave} />;
      } else {

        mainContentView = <FormView activeProgram={program} activeProject={project} updateForm={this.handleUpdateForm} />
      }
      // mainContent = <FormView activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} updateForm={this.handleUpdateForm} />
    }

    this.setState({ activeProject: project, activeProgram: program, mainContent: mainContentView })
  }

  handleAddProgram(program) {
    console.log(program)
    var programs = []
    programs = this.state.programs
    var count = this.state.count
    program.pid = count
    count++
    //cbw
    this.setState({ count: count })
    program.projects = []
    // adding totalProject (total Projects is used for project id's increment)
    program.totalProjects = 0

    programs.push(program)
    this.setState({ programs: programs })
    console.log('Final')
    console.log(programs)
  }

  handleFormSave(form) {
    console.log('I have to save the form')
    console.log('In handle form')
    console.log(form);
    var newActiveProg = {}, newActiveProj = {};
    let programs = this.state.programs.map(program => {
      if (program.name === this.state.activeProgram.name) {
        program.projects.forEach((proj) => {
          if (proj.name === this.state.activeProject.name) {
            proj.form = form
            newActiveProg = program;
            newActiveProj = proj

          }
        }
        )
      }

      return program
    })
    let mainContentView;
    mainContentView = <FormView activeProgram={newActiveProg} activeProject={newActiveProj} updateForm={this.handleUpdateForm} />
    // if (!(this.isEmpty(project))) {
    //   console.log('I am in second Part')
    //   if (this.isEmpty(project.form)) {
    //     console.log('I AM IN THE FORM EDIT')
    //     mainContentView = <FormEdit activeProgram={program} activeProject={project} saveForm={this.handleFormSave} />;
    //   } else {
    //     console.log('I AM IN THE FORm view')
    //     mainContentView = <FormView activeProgram={program} activeProject={project} updateForm={this.handleUpdateForm} />
    //   }
    //   // mainContent = <FormView activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} updateForm={this.handleUpdateForm} />
    // }
    this.setState({ programs: programs, activeProject: newActiveProj, activeProgram: newActiveProg, mainContent: mainContentView })
  }

  // to be done
  handleUpdateForm(program, project) {
    console.log('In app.js, need to update form')
    console.log(program)
    console.log(project)
    console.log(project.form)
    /// might be the need to update the active state
    let mainContentView = <FormEdit activeProgram={program} activeProject={project} saveForm={this.handleFormSave} />;
    this.setState({ mainContent: mainContentView })
    //
    // this.setState(state => ({
    //   activeProject: {
    //     ...state.activeProject,
    //     updateFlag: true
    //   },
    // }))
    // We need Form

    console.log(this.state)
  }

  handleAddProject(program, project) {
    console.log(program)
    let newProject = {}
    newProject.id = program.totalProjects
    // need to increment total count
    // Project will be an object and passed through params 
    newProject.name = project.name
    newProject.form = {}
    let programs = this.state.programs.map(prog => {
      if (prog.name === program.name) {
        prog.projects.push(newProject)
        //cbw
        prog.totalProjects++

      }
      return prog
    })

    this.setState({ programs: programs })
    console.log(this.state.programs)
    console.log('I have to add New Project')
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

    // let mainContent = <h1> Hi</h1>
    // let activeProject = this.state.activeProject

    // if (this.isEmpty(activeProject)) {
    //   console.log('I am in First Part')
    //   mainContent = ''
    // } else if (!(this.isEmpty(activeProject))) {
    //   console.log('I am in second Part')
    //   // if (this.isEmpty(activeProject.form)) {
    //   //   mainContent = <FormEdit activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} saveForm={this.handleFormSave} />;
    //   // } else {
    //   //   if (activeProject.updateFlag) {
    //   //     mainContent = <FormEdit activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} saveForm={this.handleFormSave} />;
    //   //   } else {
    //   //     mainContent = <FormView activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} updateForm={this.handleUpdateForm} />
    //   //   }
    //   // }

    //   if (this.isEmpty(activeProject.form)) {
    //     console.log('I AM IN THE FORM EDIT')
    //     mainContent = <FormEdit activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} saveForm={this.handleFormSave} />;
    //   } else {
    //     console.log('I AM IN THE FORm view')
    //     mainContent = <FormView activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} updateForm={this.handleUpdateForm} />
    //   }
    //   // mainContent = <FormView activeProgram={this.state.activeProgram} activeProject={this.state.activeProject} updateForm={this.handleUpdateForm} />
    // }

    return (
      <React.Fragment>
        <Navbar />
        <div>
          <Sidebar programs={this.state.programs} changeProject={this.handleProjectChange} addProgram={this.handleAddProgram} addProject={this.handleAddProject} />
          <div className="content">
            {

              this.state.mainContent
              // mainContent

            }
          </div>
        </div>
      </React.Fragment>

    )
  }

}

export default App;
