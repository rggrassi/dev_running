import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionCreators';
import { Table, Button } from 'semantic-ui-react';

const Duration = props => {
    const { duration } = props;
    let durationStr = '';
    
    const hour = Math.floor(duration / 3600);
    if (hour > 0) {
        durationStr = hour + ':';
    } else {
        durationStr = '00:';
    }

    const minutes = Math.floor((duration - (hour * 3600)) / 60);
    durationStr += minutes.toString().padStart(2, '0');

    const seconds = duration - (hour * 3600) - (minutes * 60);
    durationStr += ':' + seconds.toString().padStart(2, '0');

    return <span>{durationStr}</span>
}

const Distance = ({ distance, metric }) => {
    let distanceStr = '';

    if (metric === 'metric') {
        distanceStr = metric + 'm';
    } else {
        //1km = 0,621371mi
    }

    return <span>{distanceStr}</span>
}

class Runs extends Component { 

    componentDidMount() {
        this.props.load();
    }
    
    render() {

        const run = {
            friendly_name: 'test run',
            duration: 100,
            distance: 100,
            created: '2018-10-01 11:45:00'
        }

        return (
            <div>
                <h1>Corridas</h1>            
                <Button onClick={() => this.props.createRun(run)} >Create</Button>
                <Table celled>
                    <Table.Header>
                        <Table.HeaderCell>Nome</Table.HeaderCell>
                        <Table.HeaderCell>Duração</Table.HeaderCell>
                        <Table.HeaderCell>Distância</Table.HeaderCell>
                        <Table.HeaderCell>Data</Table.HeaderCell>
                    </Table.Header>   
                    <Table.Body>     
                        { this.props.runs.data.map(this.renderRun) }
                    </Table.Body>
                </Table>
            </div>
        )
    }
    
    renderRun = run => {
        return (
            <Table.Row key={run.created}>
                <Table.Cell>{ run.friendly_name }</Table.Cell>
                <Table.Cell><Duration duration={run.duration} /></Table.Cell>
                <Table.Cell><Distance distance={run.distance} /></Table.Cell>
                <Table.Cell>{ run.created }</Table.Cell>
            </Table.Row> 

        )
    }
}

const mapStateToProps = state => {
    return {
        runs: state.runs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getRunsRequest()),
        createRun: (run) => dispatch(ActionCreators.createRunRequest(run))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs);