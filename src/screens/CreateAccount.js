import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import ActionCreators from '../redux/actionCreators';
import timezones from 'moment-timezone/data/meta/latest.json';
import { Redirect } from 'react-router-dom';

class CreateAccount extends Component {
    state = {
        passwd: '',
        passwd2: '',
        name: '',
        email: '',
        error: '',
        unit: 'metric',
        timezone: 'America/Sao_Paulo'
    }

    componentDidMount() {
        this.props.reset();
    }

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const { passwd, passwd2 } = this.state;
        
        if (passwd !== passwd2) {
            this.setState({ error: 'equal' });
        } else if (passwd.length < 6) {
            this.setState({ error: 'length' });
        } else {  
            this.setState({ error: '' });
            this.props.save({
                name: this.state.name,
                email: this.state.email,                
                passwd: this.state.passwd,
                unit: this.state.unit,
                timezone: this.state.timezone
            })
        }
    }

    render() { 
        const { error } = this.state;
        const { saved, errorMessage, isAuth } = this.props.auth;

        if (isAuth) {
            return <Redirect to='/restrito' />
        }

        return (
            <div onSubmit={this.handleSubmit}>
                <h1>Nova conta</h1>

                { this.props.auth.error && <Segment color='red'>{ errorMessage }</Segment> }

                { error === 'equal' && <Segment color='red'>A senha e sua confirmação devem ser iguais!</Segment> }

                { error === 'length' && <Segment color='red'>A senha deve conter 6 ou mais caracteres!</Segment> }

                { saved && <Segment color='green'>Conta criada com sucesso!</Segment> }

                { !saved &&
                    <Form>
                        <Form.Field>
                            <label>Nome:</label>
                            <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>E-mail:</label>
                            <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
                        </Form.Field>

                        <Form.Field>
                            <label>Nova senha:</label>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirmação de senha:</label>
                            <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />
                        </Form.Field>
                        <Form.Field>
                            <select value={this.state.unit} onChange={this.handleChange('unit')}>
                                <option value='metric'>Métrico (Km)</option>
                                <option value='imperial'>Imperial (mi)</option>
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <select value={this.state.timezone} onChange={this.handleChange('timezone')}> 
                                { Object
                                    .keys(timezones.zones)
                                    .map(tz => {
                                        return <option key={tz} value={tz}>{tz}</option>
                                    })
                                }
                            </select>
                        </Form.Field>

                        <Button type='submit'>Criar conta</Button>    
                    </Form>
                }
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
        save: user => dispatch(ActionCreators.createProfileRequest(user)),
        reset: () => dispatch(ActionCreators.createProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);