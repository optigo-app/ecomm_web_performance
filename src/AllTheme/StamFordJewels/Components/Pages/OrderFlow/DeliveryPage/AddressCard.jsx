import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Diversity1Sharp } from '@mui/icons-material';

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
        <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginBottom: '20px' }}>
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={isdefault == 1 ? 'stam_ActiveAddrCard' : 'stam_AddrCard'}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <CardContent onClick={() => handleDefaultSelection(address)} style={{ flex: '1 0 auto' }}>
                    <Typography className='stam_addrTypoTitle' variant="h5" component="h2">
                        {shippingfirstname} {shippinglastname}
                    </Typography>
                    <Typography className='stam_addrTypo'>{street}</Typography>
                    <Typography className='stam_addrTypo'>{city}-{zip}</Typography>
                    <Typography className='stam_addrTypo'>{state}</Typography>
                    <Typography className='stam_addrTypo'>{country}</Typography>
                    <Typography className='stam_addrTypo'>
                        Mobile No: {shippingmobile}
                    </Typography>
                    <button type='button' className={isdefault == 1 ? 'stam_defualt_addrSelected' : 'stam_defualt_addrSelectedHide'}>Selected</button>
                </CardContent>

                {/* {showButtons && ( */}
                <div className='stam_editDeleteBtngroup' >
                    <Button type='button' color='primary' onClick={() => handleOpen(address?.id)}>
                        <MdModeEditOutline className='stam_editIcon' />
                    </Button>
                    {isdefault != 1 &&
                        <Button type='button' color='secondary' onClick={() => handleDeleteClick(address?.id)}>
                            <MdDelete className='stam_DeleteIcon' />
                        </Button>
                    }
                </div>
                {/* )} */}
            </Card>
        </Grid>
    );
};

export default AddressCard;

