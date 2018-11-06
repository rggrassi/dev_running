import React, { Component } from 'react';
import ActionCreators from '../../redux/actionCreators';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentTz from 'moment-timezone';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';

class CreateRun extends Component {

    state = {
        friendly_name: '',
        duration: 0,
        distance: 0,
        created: moment()
    }

    componentDidMount() {
        this.props.reset();
    }

    handleChange = fieldname => event => {
        this.setState({
            [fieldname]: event.target.value
        })
    }

    handleSubmit = () => {
        const { user } = this.props.auth

        const d = momentTz.tz(this.state.created, user.timezone);
        const d2 = d.clone().utc().format('YYYY-MM-DD HH:mm:ss');

        this.props.create({
            friendly_name: this.state.friendly_name, 
            duration: this.state.duration, 
            distance: user.unit === 'metric' ? this.state.distance : this.state.distance * 1.60934, 
            created: d2
        });
    }

    render() {
        const { unit } = this.props.auth.user;
        const { saved } = this.props.runs;
        return (
            <div>
                <h1>Nova corrida</h1>
                { saved && <Segment color='green'>Corrida criada com sucesso!</Segment> }
                { !saved &&
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Nome:</label>
                            <input type="text" value={this.state.friendly_name} onChange={this.handleChange('friendly_name')}/>
                        </Form.Field>  
                        <Form.Field>
                            <label>Duração:</label>
                            <input type="number" value={this.state.duration} onChange={this.handleChange('duration')}/>
                        </Form.Field>  
                        <Form.Field>
                            <label>Distância({unit === 'metric' ? 'Km' : 'mi'}):</label>
                            <input type="number" value={this.state.distance} onChange={this.handleChange('distance')}/>
                        </Form.Field>  
                        <Form.Field>
                            <label>Criação:</label>
                            <input type="text" value={this.state.created.format('DD/MM/YYYY HH:mm:ss')} onChange={this.handleChange('created')}/>
                        </Form.Field> 
                        <Form.Field>
                            <InputMoment 
                                moment={this.state.created} 
                                onChange={(val) => this.setState({ created: val })}
                            /> 
                        </Form.Field>
                        <Button type='submit'>Criar corrida</Button>  
                    </Form>
                }    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        runs: state.runs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: (run) => dispatch(ActionCreators.createRunRequest(run)),
        reset: () => dispatch(ActionCreators.createRunReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRun);