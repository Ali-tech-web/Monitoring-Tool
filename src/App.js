
import Navbar from './components/Navbars/SimpleNav.jsx'
import Sidebar from './components/Sidebars/Sidebar.jsx'
import MainView from './views/Mainview.jsx'
import React from 'react';
import axios from "axios";
import FormEdit from './components/Formio/FormEdit/FormEdit.jsx'
import FormView from './views/FormView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css'
import { saveForm, addNewProgram, addNewProject, addNewGoal, addNewObjective } from './apiRequests/postRequests'
import { getAllPrograms } from './apiRequests/getRequests'





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
    this.handleAddGoal = this.handleAddGoal.bind(this)
    this.handleAddProjectObjective = this.handleAddProjectObjective.bind(this)


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

    addNewProgram(program).then(res => {
      if (res.data.success) {
        console.log('I have Received Response')
        console.log(res.data)
        var programs = []
        programs = this.state.programs
        var count = this.state.count
        program = res.data.program
        // program.id = res.data.program._id
        // Pid is used Only in the frontend to distinguish programs
        program.pid = count
        count++
        programs.push(program)
        this.setState({ programs: programs, count: count })
        console.log(this.state.programs)

      } else {
        console.log('Could Not Insert Program')
      }
    }).catch(err => {
      console.log('Could Not Add Program in to the database : ' + err)
    })

  }

  // handleFormSave(form) {
  //   var newActiveProg = {}, newActiveProj = {};
  //   let programs = this.state.programs.map(program => {
  //     if (program.name === this.state.activeProgram.name) {
  //       program.projects.forEach((proj) => {
  //         if (proj.name === this.state.activeProject.name) {
  //           proj.form = form
  //           newActiveProg = program;
  //           newActiveProj = proj
  //         }
  //       }
  //       )
  //     }

  //     return program
  //   })

  //   saveForm(newActiveProg).then(res => {
  //     // Need To send to the server
  //     console.log('I am about to get the response')
  //     console.log(res.data)
  //     let mainContentView;
  //     mainContentView = <FormView activeProgram={newActiveProg} activeProject={newActiveProj} updateForm={this.handleUpdateForm} />
  //     this.setState({ programs: programs, activeProject: newActiveProj, activeProgram: newActiveProg, mainContent: mainContentView })

  //   })
  //     .catch(err => {
  //       console.log(err)
  //     })

  // }

  componentDidMount() {
    console.log('Component Did Mount is called')
    getAllPrograms().then(res => {
      console.log(res.data)
      this.setState({ programs: res.data.programs })
    }).catch(err => {
      console.log('Error Fetching All Programs')
    })
  }


  handleFormSave(form) {
    var newActiveProg = {}, newActiveProj = {};
    var postData = {
      programId: this.state.activeProgram._id,
      project: this.state.activeProject,
      form: form
    }
    saveForm(postData).then(res => {
      // Need To send to the server
      console.log('I am about to get the response : handleForm Save')
      console.log(res.data)
      console.log('Active Proj')
      console.log(this.state.activeProject)
      console.log('Active Program')
      console.log(this.state.activeProgram)
      let project = res.data.project


      let programs = this.state.programs.map(program => {

        if (program._id == this.state.activeProgram._id) {
          program.projects.forEach((proj) => {

            if (proj._id == project._id) {
              console.log('I am innn')
              console.log(proj)
              console.log(res.data.project)
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


  handleAddGoal(program, goal) {
    let data = {
      programId: program._id,
      goal: goal
    }
    // Api call handle saving of new Goal
    addNewGoal(data).then(res => {
      if (res.data.success) {
        let goal = res.data.goal
        //goal.id = goal._id

        var programs = this.state.programs.map(prog => {
          if (prog._id == program._id) {
            prog.goals.push(goal)
          }
          return prog
        })

        this.setState({ programs: programs })
        console.log(this.state.programs)
      } else {
        console.log('Api Returned Status False')
      }

    }
    )
  }

  handleAddProject(program, project, goal) {
    var postData = {
      project: project,
      programId: program._id,
      goal: goal
    }

    addNewProject(postData).then(res => {
      if (res.data.success) {
        project = res.data.project
        project._id = res.data.project._id

        // logic to add project in a specific goal of a program
        let programs = this.state.programs.map(prog => {
          if (prog._id == program._id) {
            prog.goals.forEach(gol => {
              if (gol._id == goal._id) {
                gol.projects.push(project)
              }
            })
          }
          return prog
        })

        this.setState({ programs: programs })

      } else {
        console.log('Api Returned Status False')
      }
    })
  }

  handleAddProjectObjective(data) {
    console.log('I am in Add Project objective')
    var goal = data.goal
    var project = data.project;
    var program = data.program;
    console.log(data)

    var postData = {
      project: project,
      programId: program._id,
      goal: goal,
      objective: data.objective
    }
    console.log(postData)

    addNewObjective(postData).then(res => {
      var objective = res.data.objective
      //objective.id = objective._id

      let programs = this.state.programs.map(prog => {
        if (prog._id == program._id) {
          prog.goals.forEach(gol => {
            if (gol._id == goal._id) {
              gol.projects.forEach(proj => {
                if (proj._id == project._id) {
                  proj.objectives.push(objective)
                }

              })
            }

          })
        }

        return prog
      })

      this.setState({ programs: programs })
      console.log(this.state.programs)

    }).catch(err => {
      console.log('Error Sending Request to Add Objective')
    })


    // var project = data.project;
    // var program = data.program;
    // var objective = {}
    // objective.name = data.objective
    // objective.id = project.objectives.length;

    // var goal = data.goal

    // let programs = this.state.programs.map(prog => {
    //   if (prog.id == program.id) {
    //     prog.goals.forEach(gol => {
    //       if (gol.id == goal.id) {
    //         gol.projects.forEach(proj => {
    //           if (proj.id == project.id) {
    //             proj.objectives.push(objective)
    //           }

    //         })
    //       }

    //     })
    //   }

    //   return prog
    // })


    // this.setState({ programs: programs })
    // console.log(this.state)
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
          <Sidebar programs={this.state.programs} addObjective={this.handleAddProjectObjective} changeProject={this.handleProjectChange} addGoal={this.handleAddGoal} addProgram={this.handleAddProgram} addProject={this.handleAddProject} />
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
