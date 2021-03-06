import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authcontext/AuthContext';
 
const Navbar = (props) => {
    const { logout, userAuth, user } = useContext(AuthContext);

    const onLogout = () => {
        logout();
    }

    const userLinks = (
        <Fragment>
            <li>Hello, { user ? user.name : '' }</li>
            <span className="sm-hide">|</span>
            <li>
                <a href="#!" onClick={ onLogout }>
                    <span className="sm-hide">Logout</span>
                    <i className="fas fa-sign-out-alt"></i>
                </a>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <span className="sm-hide">|</span>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <h1>
                        <i className="fas fa-glass-cheers"></i>
                        Party RVSP
                    </h1>
                    <p>Made with <span role="img" aria-label="test">♥️</span> by Mandar</p>
                </div>
                <ul>
                    { userAuth ? userLinks : authLinks }
                </ul>
            </div>
        </>
    )
}

export default Navbar;