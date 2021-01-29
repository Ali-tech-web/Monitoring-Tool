
import Navbar from './components/Navbars/SimpleNav.jsx'
import Sidebar from './components/Sidebars/Sidebar.jsx'
import MainView from './views/Mainview.jsx'
import EvalMainview from './views/EvalMainview.jsx'
import React from 'react';
import $ from 'jquery';
import axios from "axios";
import FormEdit from './components/Formio/FormEdit/FormEdit.jsx'
import FormView from './views/FormView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css'
import { saveForm, addNewProgram, addNewProject, addNewGoal, addNewObjective, addNewKpi, saveKpiFormDefinition, getLatestObjective } from './apiRequests/postRequests'
import { getAllPrograms } from './apiRequests/getRequests'





class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      activeProject: {},
      activeProgram: {},
      activeObjective: {},
      activeGoal: {},
      count: 0,
      mainContent: '',
      activeObjectiveId: '',
      activePhase: 'planning' //if active phase is 'planning', it means planning, 'execution' = execution, evaluation = Evluation
    };

    this.handleAddProgram = this.handleAddProgram.bind(this)
    this.handleAddProject = this.handleAddProject.bind(this)
    // this.handleProjectChange = this.handleProjectChange.bind(this)
    // this.handleFormSave = this.handleFormSave.bind(this)
    // this.handleUpdateForm = this.handleUpdateForm.bind(this)
    this.handleAddGoal = this.handleAddGoal.bind(this)
    this.handleAddProjectObjective = this.handleAddProjectObjective.bind(this)
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
    this.handleAddKpi = this.handleAddKpi.bind(this)
    this.handleKpiFormSave = this.handleKpiFormSave.bind(this)
    this.handlePhaseChange = this.handlePhaseChange.bind(this)
    //this.handleChangeActiveObjective = this.handleChangeActiveObjective.bind(this)

  }

  componentDidMount() {
    getAllPrograms().then(res => {
      this.setState({ programs: res.data.programs })
    }).catch(err => {
      console.log('Error Fetching All Programs')
    })
    // binding click listner on phase change
    $(document).ready(function () {
      $('.sidebar .row a').click(function (e) {

        $('.sidebar .row a.active').removeClass('active');
        var $current = $(this)
        $current.addClass('active');
        e.preventDefault();
      });
    });
  }


  handleObjectiveChange(data) {
    var project = data.project;
    var program = data.program;
    var goal = data.goal;
    var objective = data.objective;
    var phase = this.state.activePhase
    console.log(this.state.programs)
    let mainContentView;
    if (phase == 'planning') {
      mainContentView = <MainView data={data} addKpi={this.handleAddKpi} saveKpiForm={this.handleKpiFormSave} />
    } else if (phase == 'evaluation') {
      mainContentView = <EvalMainview data={data} />
    } else {
      mainContentView = ''
    }

    this.setState({ mainContent: mainContentView, activeObjectiveId: data.objective._id, activeProject: project, activeProgram: program, activeGoal: goal, activeObjective: objective })
  }



  handleAddProgram(program) {

    addNewProgram(program).then(res => {
      if (res.data.success) {
        var programs = []
        programs = this.state.programs
        var count = this.state.count
        program = res.data.program
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



  handleAddGoal(program, goal) {
    let data = {
      programId: program._id,
      goal: goal
    }
    // Api call handle saving of new Goal
    addNewGoal(data).then(res => {
      if (res.data.success) {
        let goal = res.data.goal
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
        console.log('Api Returned Success False')
      }
    })
  }


  handleAddProjectObjective(data) {

    var goal = data.goal
    var project = data.project;
    var program = data.program;


    var postData = {
      project: project,
      programId: program._id,
      goal: goal,
      objective: data.objective
    }


    addNewObjective(postData).then(res => {
      var objective = res.data.objective

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

  }

  handleAddKpi(data) {

    var payload = {
      kpi: data.kpi,
      programId: data.program._id,
      projectId: data.project._id,
      objectiveId: data.objective._id,
      goalId: data.goal._id
    }

    addNewKpi(payload).then(res => {
      if (res.data.success) {
        var updatedObjective
        var newKpi = res.data.kpi
        console.log(newKpi)
        let programs = this.state.programs.map(prog => {
          if (prog._id == data.program._id) {
            prog.goals.forEach(gol => {
              if (gol._id == data.goal._id) {
                gol.projects.forEach(proj => {
                  if (proj._id == data.project._id) {
                    //proj.objectives.push(objective)
                    proj.objectives.forEach(obj => {
                      if (obj._id == data.objective._id) {
                        obj.kpis.push(newKpi)
                        updatedObjective = obj
                      }
                    })
                  }

                })
              }

            })
          }

          return prog
        })
        // Program,project goal data will not be consistent, Need to think about it (solution is costly)
        var newData = {
          program: data.program,
          project: data.project,
          goal: data.goal,
          objective: updatedObjective
        }

        let mainContentView = <MainView data={newData} addKpi={this.handleAddKpi} saveKpiForm={this.handleKpiFormSave} />
        this.setState({ programs: programs, mainContent: mainContentView })

      }

    }).catch(err => {
      console.log('Error Sending Request to Add Objective' + err)
    })
  }

  handleKpiFormSave(data) {

    var payload = {
      programId: data.programId,
      projectId: data.projectId,
      goalId: data.goalId,
      objectiveId: data.objectiveId,
      kpiId: data.kpiId,
      formDefinition: data.formDefinition
    }
    saveKpiFormDefinition(payload).then(res => {
      if (res.data.success) {
        var updatedObjective;
        let programs = this.state.programs.map(prog => {
          if (prog._id == data.program._id) {
            prog.goals.forEach(gol => {
              if (gol._id == data.goal._id) {
                gol.projects.forEach(proj => {
                  if (proj._id == data.project._id) {
                    proj.objectives.forEach(obj => {
                      if (obj._id == data.objective._id) {
                        obj.kpis.forEach(kpi => {
                          if (kpi._id == data.kpiId) {
                            kpi.formDefinition = res.data.formDefinition
                            updatedObjective = obj
                          }
                        })

                      }
                    })
                  }

                })
              }

            })
          }

          return prog
        })


        // Program,project goal data will not be consistent, Need to think about it (solution is costly)
        var newData = {
          program: data.program,
          project: data.project,
          goal: data.goal,
          objective: updatedObjective
        }

        let mainContentView = <MainView data={newData} addKpi={this.handleAddKpi} saveKpiForm={this.handleKpiFormSave} />
        this.setState({ programs: programs, mainContent: mainContentView })

      } else {
        console.log('Server Returned Status False for save Form Definition')
      }

    }).catch(err => {

      console.log('Could Not Save Form Api Error' + err)
    })

  }

  // checks if an object is empty
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  isAnyEmpty(data) {
    if (this.isEmpty(data.program) || this.isEmpty(data.project) || this.isEmpty(data.goal) || this.isEmpty(data.objective)) {
      return true
    }
    return false
  }

  handlePhaseChange(event) {
    event.stopPropagation()
    getAllPrograms().then(res => {
      this.setState({ programs: res.data.programs })
      var phase = event.target.id
      /// CHANGE THE Main View
      var mainContentView;
      var data = {
        program: this.state.activeProgram,
        project: this.state.activeProject,
        goal: this.state.activeGoal,
        objective: this.state.activeObjective
      }
      // For Api call
      var payload = {
        programId: this.state.activeProgram._id,
        projectId: this.state.activeProject._id,
        goalId: this.state.activeGoal._id,
        objectiveId: this.state.activeObjective._id
      }

      if (this.isAnyEmpty(data)) {
        mainContentView = ''
      }
      else if (phase == 'planning') {
        mainContentView = <MainView data={data} addKpi={this.handleAddKpi} saveKpiForm={this.handleKpiFormSave} />

      } else if (phase == 'evaluation') {


        getLatestObjective(payload).then(res => {
          data.objective = res.data.objective
          // console.log('New Data Objective is')
          // console.log(data)
          mainContentView = <EvalMainview data={data} />
          this.setState({ mainContent: mainContentView, activePhase: phase })

        })

      } else {

      }

      this.setState({ mainContent: mainContentView, activePhase: phase })
    }).catch(err => {
      console.log('Error Fetching All Programs')
    })
  }

  render() {

    return (
      <React.Fragment>
        <Navbar />
        <div>
          <div className="sidebar">
            <div className='row' style={{ marginTop: '8%' }}>
              <a id="planning" href="#planning" className="active col-4 text-center" onClick={(e) => this.handlePhaseChange(e)}>Planning</a>
              <a id="execution" href="#execution" className="col-4 text-center" onClick={(e) => this.handlePhaseChange(e)}>Execution</a>
              <a id="evaluation" href="#evaluation" className="col-4 text-center" onClick={(e) => this.handlePhaseChange(e)}>Evaluation</a>

            </div>
            <Sidebar programs={this.state.programs} activeObjectiveId={this.state.activeObjectiveId} addObjective={this.handleAddProjectObjective} changeProject={this.handleProjectChange} addGoal={this.handleAddGoal} addProgram={this.handleAddProgram} addProject={this.handleAddProject} changeObjective={this.handleObjectiveChange} />
          </div>
          <div className="content">
            {

              this.state.mainContent

            }
          </div>
        </div>
      </React.Fragment>

    )
  }

}

export default App;
