import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionCreators from './redux/actionCreators';
import { Menu } from 'semantic-ui-react';  

const Header = props => {
    return (
        <Menu>
            <Menu.Item>Corridas online</Menu.Item>
            <Menu.Item as={Link} to='/'>Home</Menu.Item>
            <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
            <Menu.Item as={Link} to='/restrito'>Restrito</Menu.Item>
            <Menu.Item as={Link} to='/login'>Login</Menu.Item>
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, actionCreators.signinRequest)(Header);