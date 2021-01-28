import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
class NoKpiView extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }


    render() {
        return (
            <React.Fragment>

                <div className="add-first-kpi-div">
                    <div className="add-first-kpi-text" style={{ textAlign: 'center' }}>No KPI Available</div>
                </div>


            </React.Fragment>
        );
    }
}

export default NoKpiView;