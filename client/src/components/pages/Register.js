import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authcontext/AuthContext';
import { Link } from 'react-router-dom';

const Register = (props) => {
    const { registerUser, userAuth, errors, setError, clearErrors } = useContext(AuthContext);

    useEffect(() => {
        if (userAuth) {
            props.history.push('/');
        }
    }, [userAuth, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const submit = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError({msg: "Password doesn't match"});
        } else {
            registerUser({ name, email, password });
        }
    }



    return (
        <>
            <div className="register">
                <h1>Sign Up</h1>
                <form onSubmit={ submit }>
                    <input type="text" name="name" placeholder="Name" value={ name } onChange={ handleChange } />
                    <input type="email" name="email" placeholder="Email" value={ email } onChange={ handleChange } />
                    <input type="password" name="password" placeholder="Password" value={ password } onChange={ handleChange } />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={ confirmPassword } onChange={ handleChange } />
                    <input type="submit" value="Sign up" className="btn" />
                </form>
                <div className="question">
                    {errors !== null && <button className="danger">
                    {errors.msg ? errors.msg : errors.errors[0].msg}
                        <span onClick={clearErrors}>x</span>
                    </button>}
                    <p>Already have an account? <Link to="/login">Login</Link> </p>
                </div>
            </div>
        </>
    )
}

export default Register;