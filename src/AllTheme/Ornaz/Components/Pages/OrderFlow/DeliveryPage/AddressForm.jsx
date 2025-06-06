import React from 'react';
import './Delivery.scss'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Divider } from '@mui/material';

export default function AddressForm({ open, handleClose, handleCancel, handleInputChange, handleSubmit, formData, errors, isEditMode }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle className='roop_dialogTitle'>{isEditMode ? 'Edit Shipping Address' : 'Add Shipping Address'}</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange(e, 'firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"10px 0"
                        }}
                    />
                    <TextField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange(e, 'lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="Mobile No."
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange(e, 'mobileNo')}
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                        fullWidth
                        type='number'
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange(e, 'address')}
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="Country"
                        value={formData.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                        error={!!errors.country}
                        helperText={errors.country}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange(e, 'state')}
                        error={!!errors.state}
                        helperText={errors.state}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange(e, 'city')}
                        error={!!errors.city}
                        helperText={errors.city}
                        fullWidth
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                    <TextField
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange(e, 'zipCode')}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode}
                        fullWidth
                        type='number'
                        className='roop_addressTextFields'
                        sx={{
                            margin:"8px 0"
                        }}
                    />
                </DialogContent>
                <div className='roop_cardActionBtn'>
                    <div className='roop_AddressModalBtnGroup'>
                        <button type='submit' className='roop_AddNewAddrModalbtn'>{isEditMode ? 'Save Changes' : 'Add Address'}</button>
                        <button type='button' className='roop_Cancelbtn' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
}
