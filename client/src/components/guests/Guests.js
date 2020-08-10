import React, { useContext, useEffect } from 'react';
import GuestContext from '../../context/guestcontext/GuestContext';
import Guest from './Guest';

const Guests = () => {
    const { guests, filterGuests, search, getGuests } = useContext(GuestContext);

    useEffect(() => {
        getGuests();
    }, []);
    return (
        <>
            <div className="guests">
                {
                    search != null ?
                    search.map(guest => <Guest key={ guest._id } guest={guest} />) :
                    guests.filter(guest => !filterGuests || guest.isconfirmed).map(guest => <Guest key={ guest._id } guest={guest} />)
                }
            </div>
        </>
    )
}

export default Guests;