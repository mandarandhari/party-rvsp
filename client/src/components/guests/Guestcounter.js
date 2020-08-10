import React, { useContext } from 'react';
import GuestContext from '../../context/guestcontext/GuestContext';

const Guestcounter = () => {
    const { guests } = useContext(GuestContext);
    const totalInvited = guests.length;
    const attending = guests.filter(guest => guest.isconfirmed).length;
    const invitedByDietary = (type) => guests.filter(guest => guest.dietary === type).length;
    const attendingByDietary = (type) => guests.filter(guest => guest.isconfirmed && guest.dietary === type).length;

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Guest</th>
                            <th>Invited</th>
                            <th>Attending</th>
                        </tr>
                        <tr>
                            <th>Non-Veg</th>
                            <td>{ invitedByDietary('Non-Veg') }</td>
                            <td>{ attendingByDietary('Non-Veg') }</td>
                        </tr>
                        <tr>
                            <th>Vegan</th>
                            <td>{ invitedByDietary('Vegan') }</td>
                            <td>{ attendingByDietary('Vegan') }</td>
                        </tr>
                        <tr>
                            <th>Pescetarians</th>
                            <td>{ invitedByDietary('Pascatarian') }</td>
                            <td>{ attendingByDietary('Pascatarian') }</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>{ totalInvited }</td>
                            <td>{ attending }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Guestcounter;