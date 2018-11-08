import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Runs from './Runs';

const Home = props => <h1>Home admin</h1>
const Users = props => <h1>Users admin</h1>

const Admin = props => {

    const { isAuth, user } = props.auth;

    if (!isAuth) {
        return <Redirect to='/login' />
    }

    if (user.role !== 'admin') {
        return <Redirect to='/restrito' />
    }

    return (
        <div>
            <Header />
            <Route path={`${props.match.path}/`} exact component={Home} />
            <Route path={`${props.match.path}/users`} component={Users} />
            <Route path={`${props.match.path}/runs`} component={Runs} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Admin);