import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actionCreators';

const Header = props => {
    return (
        <Menu>
            <Menu.Item as={Link} to='/' ><Image src='/logo.png' size='small'/></Menu.Item>
            <Menu.Item as={Link} to='/restrito'>Home</Menu.Item>
            <Menu.Item as={Link} to='/restrito/runs'>Corridas</Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown item text={props.auth.user.name}>
                    <Dropdown.Menu>
                        { props.auth.user.role === 'admin' &&
                            <Dropdown.Item as={Link} to='/admin/home'>Modo: admin</Dropdown.Item>
                        }
                        <Dropdown.Item as={Link} to='/restrito/my-account'>Minha conta</Dropdown.Item>
                        <Dropdown.Item as={Link} to='/restrito/change-pass'>Alterar senha</Dropdown.Item>
                        <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
                    </Dropdown.Menu>  
                </Dropdown>      
            </Menu.Menu>
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        logout: () => dispatch(ActionCreators.destroyAuthRequest())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Header);