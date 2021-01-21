import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
class AddFirstKpi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            kpiInputModal: ''
        }

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

    render() {
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

                <div className="add-first-kpi-div">
                    <div className="add-first-kpi" style={{ textAlign: 'center' }}><a style={{ display: 'inline' }}> <i className="fas fa-plus add-first-kpi" aria-hidden="true" onClick={(event) => this.handleAddNewKpiClick(event)}></i></a> </div>
                    <div className="add-first-kpi-text" style={{ textAlign: 'center' }}>Add your first Key Performance Index (KPI)</div>
                </div>


            </React.Fragment>
        );
    }
}

export default AddFirstKpi;