import React from 'react'
import './Calllog.scss'
import { Button } from '@mui/material'

const Calllog = () => {
    const handleRedirect = () => {
        window.open('http://nzen/calllogweb/', '_blank');
    };

    return (
        <div className='smr_callLog_mainDiv'>
            <Button className='smr_callLog_Button' variant="contained" onClick={handleRedirect}>Call log login</Button>
        </div>
    )
}

export default Calllog;
