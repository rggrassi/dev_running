import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../redux/actionCreators';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import Header from '../Header'

class Login extends Component {

    state = {
        form: {
            email: '',
            passwd: ''
        }
    }

    handleChange = fieldname => event => {
        const form = {
            ...this.state.form
        }
        form[fieldname] = event.target.value;
        this.setState({ form });
    }

    handleSubmit = event => {        
        event.preventDefault();

        const { email, passwd } = this.state.form;
        this.props.login(email, passwd);
   }

    render() {

        const { isAuth, user } = this.props.auth;

        if (isAuth) {
            if (user.role === 'admin') {
                return <Redirect to='/admin' />
            }
            return <Redirect to='/restrito' />
        }

        const { email, passwd } = this.state.form;
        return (
            <div>
                <Header />
                <h1>Entrar</h1>
                <Form onSubmit={this.handleSubmit}> 
                    <Form.Field>
                        <label>E-mail</label>
                        <input type='text' value={email} onChange={this.handleChange('email')} /> 
                    </Form.Field>
                    <Form.Field>
                        <label>Senha</label>
                        <input type='password' value={passwd} onChange={this.handleChange('passwd')} /> 
                    </Form.Field>
                    <Button type='submit'>Entrar</Button>
                </Form>  
                { this.props.auth.error && <p>Erro ao logar</p> }  
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, passwd) => dispatch(ActionCreators.signinRequest(email, passwd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);