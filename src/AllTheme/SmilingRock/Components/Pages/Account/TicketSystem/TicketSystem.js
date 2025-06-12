import React from 'react'
import './TicketSystem.scss'
import { Button } from '@mui/material'

const TicketSystem = () => {
    const handleRedirect = () => {
        window.open('http://nzen/calllogweb/', '_blank');
    };

    return (
        <div className='smr_ticketSys_mainDiv'>
            <Button className='smr_ticketSys_Button' variant="contained" onClick={handleRedirect}>Ticket System login</Button>
        </div>
    )
}

export default TicketSystem
