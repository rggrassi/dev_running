import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionCreators from './redux/actionCreators';

const Header = props => {
    return (
        <div>
            <p>
                <Link to='/'>Home</Link>
                <Link to='/admin'>Admin</Link>
                <Link to='/restrito'>Restrito</Link>
                <Link to='/login'>Login</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actionCreators.signinRequest)(Header);