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
                className={isdefault == 1 ? 'for_ActiveAddrCard' : 'for_AddrCard'}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <CardContent onClick={() => handleDefaultSelection(address)} style={{ flex: '1 0 auto' }}>
                    <Typography className='for_addrTypoTitle' variant="h5" component="h2">
                        {shippingfirstname} {shippinglastname}
                    </Typography>
                    <Typography className='for_addrTypo'>{street}</Typography>
                    <Typography className='for_addrTypo'>{city}-{zip}</Typography>
                    <Typography className='for_addrTypo'>{state}</Typography>
                    <Typography className='for_addrTypo'>{country}</Typography>
                    <Typography className='for_addrTypo'>
                        Mobile No: {shippingmobile}
                    </Typography>
                    <button type='button' className={isdefault == 1 ? 'for_defualt_addrSelected' : 'for_defualt_addrSelectedHide'}>Selected</button>
                </CardContent>

                {/* {showButtons && ( */}
                <div className='for_editDeleteBtngroup' >
                    <Button type='button' color='primary' onClick={() => handleOpen(address?.id)}>
                        <MdModeEditOutline className='for_editIcon' />
                    </Button>
                    {isdefault != 1 &&
                        <Button type='button' color='secondary' onClick={() => handleDeleteClick(address?.id)}>
                            <MdDelete className='for_DeleteIcon' />
                        </Button>
                    }
                </div>
                {/* )} */}
            </Card>
        </Grid>
    );
};

export default AddressCard;

