import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionCreators';
import { Table, Button, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Users extends Component { 

    componentDidMount() {
        this.props.load();
    }
    
    render() {
        return (
            <div>
                <h1>Usuários</h1>            
                { this.props.users.isLoading && <p>Carregando...</p> }
                { !this.props.users.isLoading && this.props.users.data.length === 0 && <Segment color='blue'>Nenhuma usuário cadastrado até o momento</Segment>   }
                { !this.props.users.isLoading && this.props.users.data.length > 0 &&                
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>E-mail</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>   
                        <Table.Body>     
                            { this.props.users.data.map(this.renderUser) }
                        </Table.Body>
                    </Table>
                }
            </div>
        )
    }
    
    renderUser = user => {
        return (
            <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                    <Button as={Link} to={`/admin/users/${user.id}/edit`} color='blue'>
                        <Button.Content visible><Icon name='pencil'/></Button.Content>
                    </Button>

                    <Button onClick={() => this.props.remove(user.id)} color='red'>
                        <Button.Content visible><Icon name='trash'/></Button.Content>
                    </Button>
                </Table.Cell>
            </Table.Row> 
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getUsersRequest(true)),
        remove: id => dispatch(ActionCreators.removeUserRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);