import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authcontext/AuthContext';

const Login = (props) => {
    const { loginUser, userAuth, errors, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        if (userAuth) {
            props.history.push('/');
        }
    }, [userAuth, props.history]);

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const submit = e => {
        e.preventDefault();

        loginUser({ email, password });
    }

    return (
        <>
            <div className="login">
                <h1>Sign In</h1>
                <form onSubmit={ submit }>
                    <input type="email" name="email" placeholder="Email" value={ email } onChange={ handleChange } />
                    <input type="password" name="password" placeholder="password" value={ password } onChange={ handleChange } />
                    <input type="submit" value="Sign In" className="btn" />
                </form>
                <div className="question">
                    {errors !== null && <button className="danger">
                    {errors.msg ? errors.msg : errors.errors[0].msg}
                        <span onClick={clearErrors}>x</span>
                    </button>}
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login;