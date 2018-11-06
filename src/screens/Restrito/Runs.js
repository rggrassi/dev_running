import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionCreators';
import { Table, Button } from 'semantic-ui-react';
import Distance from '../elements/Distance';
import Duration from '../elements/Duration';
import DateStr from '../elements/DateStr';
import { Link } from 'react-router-dom';

class Runs extends Component { 

    componentDidMount() {
        this.props.load();
    }
    
    render() {
        return (
            <div>
                <h1>Corridas</h1>            
                <Button as={Link} to='/restrito/create-run'>Nova corrida</Button>
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
        const { unit, timezone } = this.props.auth.user
        return (
            <Table.Row key={run.created}>
                <Table.Cell>{ run.friendly_name }</Table.Cell>
                <Table.Cell><Duration duration={run.duration} /></Table.Cell>
                <Table.Cell><Distance distance={run.distance} metric={unit} /></Table.Cell>
                <Table.Cell><DateStr date={run.created} timezone={timezone}/></Table.Cell>
            </Table.Row> 
        )
    }
}

const mapStateToProps = state => {
    return {
        runs: state.runs,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getRunsRequest()),
        createRun: (run) => dispatch(ActionCreators.createRunRequest(run))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs);