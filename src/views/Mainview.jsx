import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import KpiAccordian from '../components/Accordians/KpiAccordian'
import AddFirstKpiView from './AddFirstKpi'
import './style.css'


class MainView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false,
            kpiInputModal: '',
            showModal: false
        }

        this.handleAccordianClick = this.handleAccordianClick.bind(this);
        this.handleAddNewKpi = this.handleAddNewKpi.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCross = this.handleCross.bind(this)
        this.handleAddNewKpiClick = this.handleAddNewKpiClick.bind(this)

    }

    handleAddNewKpi(event) {
        event.stopPropagation()
        // data contains program, project, goal and objective
        var data = this.props.data;
        data.kpi = this.state.kpiInputModal;
        this.props.addKpi(data)
        this.setState({ showModal: false })
    }

    handleClose(event) {
        event.stopPropagation()
        this.setState({ showModal: false })
    }

    handleCross() {
        this.setState({ showModal: false })
    }

    handleAddNewKpiClick(event) {
        event.stopPropagation()
        this.setState({ showModal: true })

    }

    handleAccordianClick(event) {
        event.stopPropagation()
        let activeStatus = (this.state.isActive) ? false : true
        this.setState({ isActive: activeStatus })
    }

    render() {
        var objective = this.props.data.objective
        return (
            <React.Fragment>

                <Modal show={this.state.showModal} onHide={this.handleCross}>
                    <Modal.Header >
                        <Modal.Title>Add KPI</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="text"
                            className="round-corners"
                            placeholder="Add KPI Title"
                            onChange={(e) => { e.stopPropagation(); this.setState({ kpiInputModal: e.target.value }) }}
                            onClick={(e) => { e.stopPropagation() }}

                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.handleClose(e)}>
                            Close
                </Button>
                        <Button variant="primary" onClick={(e) => this.handleAddNewKpi(e)} >
                            Add
                </Button>
                    </Modal.Footer>
                </Modal>

                {

                    (objective.kpis.length == 0) ? <AddFirstKpiView data={this.props.data} addKpi={this.props.addKpi} /> :

                        <div>
                            <div className='kpi-header'>Key Performance Indicators (KPIS)</div>
                            <div className='add-kpi-div' ><button type="button" className="btn btn-primary border-3 add-kpi-button" onClick={(e) => this.handleAddNewKpiClick(e)} style={{ borderRadius: '10px' }} > <i className="fas fa-plus" aria-hidden="true" ></i> New Kpi</button> </div>
                            {
                                objective.kpis.map(kpi => {
                                    return (<KpiAccordian key={kpi._id} data={this.props.data} kpi={kpi} saveKpiForm={this.props.saveKpiForm} />)
                                })

                            }
                        </div>

                }

            </React.Fragment>
        );
    }
}

export default MainView;