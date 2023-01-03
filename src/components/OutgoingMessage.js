import React from 'react'

export const OutgoingMessage = ({msg}) => {
    return (
        <>
            {/* <!-- Mensaje enviado inicio --> */}
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{msg.mensaje}</p>
                    <span className="time_date"> 11:01 AM | June 9</span>
                </div>
            </div>
        </>
    )
}
