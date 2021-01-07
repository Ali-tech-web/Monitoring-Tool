import React, { Component } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../style.css'
import FirstProgramForm from '../Forms/FirstProgram.jsx'
import ProgramAccordian from '../Accordians/ProgramAccordian.jsx'





class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

    }

    //   changeProject(proj) {
    //     this.props.changeProject(proj)
    //   }

    addNewProgram() {
        console.log('I have to add New Program')
        this.setState({ showModal: true })

    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar">
                    <div className='row' style={{ marginTop: '8%' }}>
                        <a className="active col-4 text-center" href="#planning">Planning</a>
                        <a href="#education" className="col-4 text-center">Execution</a>
                        <a href="#evaluation" className="col-4 text-center">Evaluation</a>
                    </div>
                    <div className="sidebar-content-area">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <i className="fab fa-windows" style={{ color: '#AAAAAA' }}></i>  {'\u00A0'} Programs
              </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {
                                            (this.props.programs.length > 0) ? <div className='add-new-program-link'>
                                                {
                                                    // <a id='addNewProgramLink' onClick={() => this.addNewProgram()}><i className="fa fa-plus" aria-hidden="true" ></i> New Program</a>
                                                }


                                                <FirstProgramForm id='addProgramForm' addProgram={this.props.addProgram} />
                                            </div> : ''

                                        }

                                        {
                                            (this.props.programs.length > 0) ? this.props.programs.map(program => {
                                                return <ProgramAccordian key={program.pid} program={program} changeProject={this.props.changeProject} addProject={this.props.addProject} />
                                            }) : <FirstProgramForm addProgram={this.props.addProgram} />
                                        }

                                        {
                                            // {this.props.programs.map(program => {
                                            //     return <ProgramAccordian key={program.pid} program={program}/>
                                            //  })}
                                        }






                                        { /*            
                    <Accordion id="programAccord" key="ProgramAccord" defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                              {'\u00A0'} 
                                Skills for 2020
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                  <li>
                                  <i class="fas fa-project-diagram" style={{color: '#AAAAAA'}}></i>  {'\u00A0'} CNC Machine Training
                                  </li>
                                  <li>
                                  <i class="fas fa-project-diagram" style={{color: '#AAAAAA'}}></i>   {'\u00A0'} Stitching
                                  </li>
                                </ul>
                                <div className="add-new-project-div">
                                    <a> <i class="fas fa-plus" aria-hidden="true"></i> Add New Project</a>
                                </div>
                              

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                */  }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>


            </React.Fragment>


        );
    }
}

export default Sidebar;