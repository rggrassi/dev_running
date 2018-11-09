import React, { Component } from 'react';
import ActionCreators from '../../redux/actionCreators';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

class EditUser extends Component {

    state = {
        name: '',
        email: '',
        role: '',
        id: ''
    }

    componentDidMount() {
        this.props.load(this.props.match.params.id);    
    }

    static getDerivedStateFromProps(newProps, prevState) {

        const { user } = newProps.users;

        if (!_.isEmpty(user)) {
            if (user.id !==  prevState.id) {
                const newUser = {};
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.id = user.id;
                newUser.role = user.role;
                return newUser;
            }
        }

        return null
    }

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleSubmit = () => {
        this.props.save({
            id: this.props.match.params.id,
            name: this.state.name,
            email: this.state.email, 
            role: this.state.role
        })
    }

    render() {
        const { saved } = this.props.users;

        if (saved) {
            return <Redirect to='/admin/users'/>
        }

        return (
            <div>
                <h1>Editar usuário</h1>
                { saved && <Segment color='green'>Usuário salvo com sucesso!</Segment> }
                { !saved &&
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Name:</label>
                            <input type="text" value={this.state.name} onChange={this.handleChange('name')}/>
                        </Form.Field>  
                        <Form.Field>
                            <label>E-mail:</label>
                            <input type="email" value={this.state.email} onChange={this.handleChange('email')}/>
                        </Form.Field>  
                        <Form.Field>
                            <label>E-mail:</label>
                            <select value={this.state.role} onChange={this.handleChange('role')}>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuário</option>
                            </select>
                        </Form.Field>  

                        <Button type='submit'>Salvar usuário</Button>  
                    </Form>
                }    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionCreators.updateUserRequest(user)),
        load: id => dispatch(ActionCreators.getUserRequest(id)),
        reset: () => dispatch(ActionCreators.updateUserReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);