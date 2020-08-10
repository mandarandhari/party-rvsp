import React, { useContext } from 'react';
import GuestContext from '../../context/guestcontext/GuestContext';

const Guest = ({guest}) => {
    const { _id, name, phone, dietary, isconfirmed } = guest;

    const {deleteGuest, updateGuest, editGuest} = useContext(GuestContext);

    const handleDeleteGuest = () => {
        deleteGuest(_id)
    }

    const handleIsConfirmed = () => {
        updateGuest({
            ...guest,
            isconfirmed: !isconfirmed
        })
    }

    const handleEditGuest = () => {
        editGuest(guest);
    }

    return (
        <>
            <div className="guest-card">
                <div className="card-head">
                    <div>
                        <label className={ `${ isconfirmed && 'confirm' }` }>
                            Confirmed
                            <i className={`fas fa-check-square ${ isconfirmed && 'confirm' }`}>
                                <input type="checkbox" onChange={handleIsConfirmed} />
                            </i>
                        </label>
                    </div>
                    <div>
                        <button>
                            <i className="fas fa-user-edit" onClick={handleEditGuest}></i>
                        </button>
                        <button>
                            <i className="fas fa-trash-alt remove" onClick={handleDeleteGuest}></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <h2>{ name }</h2>
                    <span className={ 'badge ' + (dietary === 'Non-Veg' ? 'red' : dietary === 'Vegan' ? 'green' : 'seaGreen') }>{ dietary }</span>
                    <div className="contact">
                        <i className="fas fa-phone-alt"></i>
                        <p>{ phone }</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Guest;