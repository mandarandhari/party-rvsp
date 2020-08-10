import React, { useContext } from 'react';
import AuthContext from '../../../context/authcontext/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const { userAuth } = useContext(AuthContext);

    return (
        <>
            <Route 
                { ...rest }
                render={ props => !userAuth ? (<Redirect to="/login" />) : (<Component { ...props } />) }
            />
        </>
    )
}

export default PrivateRoutes;