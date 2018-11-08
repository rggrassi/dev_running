import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionCreators';
import { Table, Button, Icon, Segment, Label } from 'semantic-ui-react';
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
                { this.props.runs.isLoading && <p>Carregando...</p> }
                { !this.props.runs.isLoading && this.props.runs.data.length === 0 && <Segment color='blue'>Nenhuma corrida cadastrada até o momento</Segment>   }
                { !this.props.runs.isLoading && this.props.runs.data.length > 0 &&                
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Duração</Table.HeaderCell>
                                <Table.HeaderCell>Distância</Table.HeaderCell>
                                <Table.HeaderCell>Data</Table.HeaderCell>
                                <Table.HeaderCell>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>   
                        <Table.Body>     
                            { this.props.runs.data.map(this.renderRun) }
                        </Table.Body>
                    </Table>
                }
            </div>
        )
    }
    
    renderRun = run => {
        const { unit, timezone } = this.props.auth.user
        return (
            <Table.Row key={run.id}>
                <Table.Cell>
                    {run.friendly_name} <br />
                    <Label>{run.name}</Label>
                </Table.Cell>
                <Table.Cell><Duration duration={run.duration} /></Table.Cell>
                <Table.Cell><Distance distance={run.distance} metric={unit} /></Table.Cell>
                <Table.Cell><DateStr date={run.created} timezone={timezone}/></Table.Cell>
                <Table.Cell>
                    <Button onClick={() => this.props.remove(run.id)} color='red'>
                        <Button.Content visible><Icon name='trash'/></Button.Content>
                    </Button>
                </Table.Cell>
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
        load: () => dispatch(ActionCreators.getRunsRequest(true)),
        remove: id => dispatch(ActionCreators.removeRunRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs);