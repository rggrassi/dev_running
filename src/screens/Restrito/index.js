import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Runs from './Runs';
import Header from './Header';
import MyAccount from './MyAccount';
import ChangePass from './ChangePass';
import CreateRun from './CreateRun';

const Restrito = props => { 

    const { isAuth, isSigninging } = props.auth;

    if (isSigninging) {
        return <p>Loading...</p>
    }

    if (!isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <Header />
            <Route path={`${props.match.path}/`} exact component={Home} />
            <Route path={`${props.match.path}/runs`} component={Runs} />
            <Route path={`${props.match.path}/my-account`} component={MyAccount} />
            <Route path={`${props.match.path}/change-pass`} component={ChangePass} />
            <Route path={`${props.match.path}/create-run`} component={CreateRun} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Restrito);