import React, { useContext, useEffect } from 'react';
import Guestform from '../guests/Guestform';
import Guestcounter from '../guests/Guestcounter';
import Guestfilter from '../guests/Guestfilter';
import Guestsearch from '../guests/Guestsearch';
import Guests from '../guests/Guests';
import AuthContext from '../../context/authcontext/AuthContext';

const Home = () => {
    const { getUser } = useContext(AuthContext);

    useEffect(() => {
        getUser();
    }, []);
    
    return (
        <>
            <div className="app-container">
                <div className="main">
                    <div className="filter">
                        <Guestfilter />
                        <Guestsearch />
                    </div>
                    <Guestform />
                    <Guestcounter />
                </div>
                <Guests />
            </div>
        </>
    )
}

export default Home;