import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import ActionCreators from '../../redux/actionCreators';

class ChangePass extends Component {
    state = {
        passwd: '',
        passwd2: ''
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
        
        this.props.save({
            passwd: this.state.passwd,
            id: this.props.auth.user.id
        })
    }

    render() { 


        return (
            <div onSubmit={this.handleSubmit}>
                <h1>Alterar senha</h1>
                { this.props.auth.saved && <Segment color='green'>Senha alterada com sucesso!</Segment> }
                { !this.props.auth.saved &&
                    <Form>
                        <Form.Field>
                            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
                        </Form.Field>
                        <Form.Field>
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