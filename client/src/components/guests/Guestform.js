import React, { useState, useContext, useEffect } from 'react';
import GuestContext from '../../context/guestcontext/GuestContext';

const Guestform = () => {
    const {addGuest, editAble, updateGuest, clearEdit} = useContext(GuestContext);

    const [guest, setGuest] = useState({
        name: '',
        phone: '',
        dietary: 'Non-Veg'
    })

    useEffect(() => {
        if (editAble !== null) {
            setGuest(editAble)
        } else {
            setGuest({
                name: '',
                phone: '',
                dietary: 'Non-Veg'
            })
        }
    }, [editAble])

    const handleChange = e => {
        setGuest({
            ...guest,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (editAble !== null) {
            updateGuest(guest);
            clearEdit()
        } else {
            addGuest(guest);

            setGuest({
                name: '',
                phone: '',
                dietary: 'Non-Veg'
            })
        }
    }

    return (
        <>
            <div className="invite-section">
                <h1>{ editAble !== null ? 'Edit guest' : 'Invite Someone' }</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Name" name="name" value={guest.name} onChange={handleChange} />
                    <input type="text" placeholder="phone" name="phone" value={guest.phone} onChange={handleChange} />
                    <p className="options-label">Dietary</p>
                    <div className="options">
                        <label className="container">
                            Non-veg
                            <input type="radio" name="dietary" value="Non-Veg" checked={guest.dietary === 'Non-Veg'} onChange={handleChange} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="options">
                        <label className="container">
                            Vegan
                            <input type="radio" name="dietary" value="Vegan" checked={guest.dietary === 'Vegan'} onChange={handleChange} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="options">
                        <label className="container">
                            Pascatarian
                            <input type="radio" name="dietary" value="Pascatarian" checked={guest.dietary === 'Pascatarian'} onChange={handleChange} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <input type="submit" value={ editAble !== null ? "Update Guest" : "Add Guest" } className="btn" />
                    { editAble !== null ? <input type="button" onClick={clearEdit} value="Cancel" className="btn clear" /> : null }
                </form>
            </div>
        </>
    )
}

export default Guestform;