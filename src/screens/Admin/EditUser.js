import React, { Component } from 'react';
import ActionCreators from '../../redux/actionCreators';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class EditUser extends Component {

    state = {
        name: '',
        email: '',
        tipo: ''
    }

    async componentDidMount() {
        await this.props.load(this.props.match.params.id);
        const user = this.props.users.user;

        console.log(user)

        if (user) {
            this.setState({
                name: user.name,
                email: user.email                
            })
        }
    }

    /*static getDerivedStateFromProps(newProps, prevState) {

        const user = newProps.users.user;

         if (user) {
            const newUser = {};
            if (user.name !== prevState.name && !prevState.name) {
                console.log(prevState.name)
                newUser.name = user.name
            }
            if (user.email !== prevState.email) {
                newUser.email = user.email
            }
            if (user.tipo !== prevState.tipo) {
                newUser.tipo = user.tipo
            }
            return newUser
        }
        return null;
    }*/

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleSubmit = () => {

        this.props.save({
            id: this.props.match.params.id,
            name: this.state.name,
            email: this.state.email 
        });
    }

    render() {
        const { saved } = this.props.users;

        if (saved) {
            return <Redirect to='/restrito/users'/>
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
                            <input type="text" value={this.state.email} onChange={this.handleChange('email')}/>
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