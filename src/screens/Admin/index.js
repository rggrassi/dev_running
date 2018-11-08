import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Runs from './Runs';
import Users from './Users';
import EditUser from './EditUser';

const Home = props => <h1>Home admin</h1>

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
            <Route exact path={`${props.match.path}/`} component={Home} />
            <Route exact path={`${props.match.path}/users/:id/edit`} component={EditUser} />
            <Route exact path={`${props.match.path}/users`} component={Users} />
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