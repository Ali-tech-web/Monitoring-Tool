
import Navbar from './components/Navbars/SimpleNav.jsx'
import Sidebar from './components/Sidebars/Sidebar.jsx'
import MainView from './views/Mainview.jsx'
import React from 'react';
import axios from "axios";
import FormEdit from './components/Formio/FormEdit/FormEdit.jsx'
import FormView from './views/FormView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css'
import { saveForm } from './apiRequests/postRequests'





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

    let mainContentView;
    if (!(this.isEmpty(project))) {

      if (this.isEmpty(project.form)) {

        mainContentView = <FormEdit activeProgram={program} activeProject={project} saveForm={this.handleFormSave} />;
      } else {

        mainContentView = <FormView activeProgram={program} activeProject={project} updateForm={this.handleUpdateForm} />
      }

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

    saveForm(newActiveProg).then(res => {
      // Need To send to the server
      console.log('I am about to get the response')
      console.log(res.data)
      let mainContentView;
      mainContentView = <FormView activeProgram={newActiveProg} activeProject={newActiveProj} updateForm={this.handleUpdateForm} />
      this.setState({ programs: programs, activeProject: newActiveProj, activeProgram: newActiveProg, mainContent: mainContentView })

    })
      .catch(err => {
        console.log(err)
      })



  }


  handleUpdateForm(program, project) {

    /// might be the need to update the active state
    let mainContentView = <FormEdit activeProgram={program} activeProject={project} saveForm={this.handleFormSave} />;
    this.setState({ mainContent: mainContentView })

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
