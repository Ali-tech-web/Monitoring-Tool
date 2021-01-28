import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import EvalKpiAccordian from '../components/Accordians/EvalKpiAccordian'
import NoKpiView from './NoKpiView'
import './style.css'


class EvalMainview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isActive: false
        }

        this.handleAccordianClick = this.handleAccordianClick.bind(this);
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


                {

                    (objective.kpis.length == 0) ? <NoKpiView /> :

                        <div>
                            <div className='kpi-header' style={{ marginBottom: '4%' }}>Key Performance Indexes (KPIS)</div>
                            {
                                objective.kpis.map(kpi => {
                                    return (<EvalKpiAccordian key={kpi._id} data={this.props.data} kpi={kpi} />)
                                })

                            }
                        </div>

                }

            </React.Fragment>
        );
    }
}

export default EvalMainview;