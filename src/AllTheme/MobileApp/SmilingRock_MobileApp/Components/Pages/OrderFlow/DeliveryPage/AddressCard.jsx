// import React from 'react';
// import './Delivery.scss'
// import { Card, CardActions, CardContent, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';

// export default function AddressCard({ address, index, handleOpen, handleDeleteClick, handleDefaultSelection }) {
//     return (
//         <Card className='addressCard'>
//             <CardContent>
//                 <Typography variant='h6'>
//                     {address.shippingfirstname} {address.shippinglastname}
//                 </Typography>
//                 <Typography>{address.street}</Typography>
//                 <Typography>{address.city}, {address.state} {address.zip}</Typography>
//                 <Typography>{address.country}</Typography>
//                 <Typography>{address.shippingmobile}</Typography>
//                 <FormControlLabel
//                     control={
//                         <Checkbox
//                             checked={address.isdefault === 1}
//                             onChange={() => handleDefaultSelection(index)}
//                             color='primary'
//                         />
//                     }
//                     label='Set as Default'
//                 />
//             </CardContent>
//             <CardActions>
//                 <Button color='primary' onClick={() => handleOpen(index)}>Edit</Button>
//                 <Button color='secondary' onClick={() => handleDeleteClick(address.id)}>Delete</Button>
//             </CardActions>
//         </Card>
//     );
// }



// AddressCard.js

// AddressCard.js

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
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={isdefault == 1 ? 'smrMo_ActiveAddrCard' : 'smrMo_AddrCard'}
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <CardContent className='smrMo_addrcardContent' onClick={() => handleDefaultSelection(address)} style={{ flex: '1 0 auto' }}>
                    <Typography className='smrMo_addrTypoTitle' variant="h5" component="h2">
                        {shippingfirstname} {shippinglastname}
                    </Typography>
                    <Typography className='smrMo_addrTypo'>{street}</Typography>
                    <Typography className='smrMo_addrTypo'>{city}-{zip}{', '}{state}</Typography>
                    {/* <Typography className='smrMo_addrTypo'>{state}</Typography> */}
                    {/* <Typography className='smrMo_addrTypo'>{country}</Typography> */}
                    <Typography className='smrMo_addrTypo'>
                        Phone : {shippingmobile}
                    </Typography>
                    <button type='button' className={isdefault == 1 ? 'smrMo_defualt_addrSelected' : 'smrMo_defualt_addrSelectedHide'}>Selected</button>
                </CardContent>

                {/* {showButtons && ( */}
                <div className='smrMo_editDeleteBtngroup' >
                    <Button type='button' color='primary' onClick={() => handleOpen(address?.id)}>
                        <MdModeEditOutline className='smrMo_editIcon' />
                    </Button>
                    {isdefault != 1 &&
                        <Button type='button' color='secondary' onClick={() => handleDeleteClick(address?.id)}>
                            <MdDelete className='smrMo_DeleteIcon' />
                        </Button>
                    }
                </div>
                {/* )} */}
            </Card>
        </Grid>
    );
};

export default AddressCard;

