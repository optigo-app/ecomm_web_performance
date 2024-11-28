import React, { useState } from 'react'
import './Delivery.modul.scss';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

const AddressCard = ({ address, index, handleOpen, handleDeleteClick, handleDefaultSelection }) => {
    const {
        shippingfirstname,
        shippinglastname,
        street,
        city,
        state,
        country,
        zip,
        shippingmobile,
        isdefault
    } = address;


    const [showButtons, setShowButtons] = useState(false);

    const handleMouseEnter = () => {
        setShowButtons(true);
    };

    const handleMouseLeave = () => {
        setShowButtons(false);
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBottom: '20px', minHeight: '19rem' }}>
                <Card
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={isdefault == 1 ? 'elv_ActiveAddrCard' : 'elv_AddrCard'}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardContent onClick={() => handleDefaultSelection(address)} style={{ flex: '1 0 auto', marginTop: '1rem' }}>
                        <Typography className='elv_addrTypoTitle' variant="body1">{shippingfirstname} {shippinglastname}</Typography>
                        <Typography variant="body2" className='elv_addrTypo'>{street}</Typography>
                        <Typography variant="body2" className='elv_addrTypo'>{city}-{zip}</Typography>
                        <Typography variant="body2" className='elv_addrTypo'>{state}</Typography>
                        <Typography variant="body2" className='elv_addrTypo'>{country}</Typography>
                        <Typography variant="body2" className='elv_addrTypo'>
                            Mobile No: {shippingmobile}
                        </Typography>
                        <button type='button' className={isdefault == 1 ? 'elv_defualt_addrSelected' : 'elv_defualt_addrSelectedHide'}>Selected</button>
                    </CardContent>
                    <div className='elv_editDeleteBtngroup' >
                        <Button type='button' color='primary' onClick={() => handleOpen(address?.id)}>
                            <Typography className='elv_editIcon'>update</Typography>
                        </Button>
                        {!isdefault == 1 && (
                            <Button type='button' color='secondary' onClick={() => handleDeleteClick(address?.id)}>
                                <MdDelete className='elv_DeleteIcon' />
                            </Button>
                        )}
                    </div>
                </Card>
            </Grid>
        </>
    )
}

export default AddressCard