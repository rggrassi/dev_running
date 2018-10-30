import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import ActionCreators from '../../redux/actionCreators';

class ChangePass extends Component {
    state = {
        passwd: '',
        passwd2: '',
        error: ''
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
                passwd: this.state.passwd,
                id: this.props.auth.user.id
            })
        }
    }

    render() { 
        const { error } = this.state
        return (
            <div onSubmit={this.handleSubmit}>
                <h1>Alterar senha</h1>
                { error === 'equal' && <Segment color='red'>A senha e sua confirmação devem ser iguais!</Segment> }

                { error === 'length' && <Segment color='red'>A senha deve conter 6 ou mais caracteres!</Segment> }

                { this.props.auth.saved && <Segment color='green'>Senha alterada com sucesso!</Segment> }

                { !this.props.auth.saved &&
                    <Form>
                        <Form.Field>
                            <label>Nova senha:</label>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirmação de senha:</label>
                            <input type='password' value={this.state.passwd2} onChange={this.handleChange('passwd2')} />
                        </Form.Field>
                        <Button type='submit'>Salvar</Button>    
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
        save: user => dispatch(ActionCreators.updateProfileRequest(user)),
        reset: () => dispatch(ActionCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);