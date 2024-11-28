import { Box, Modal, TextField } from '@mui/material';
import React from 'react'

const NewAddressModal = ({
    handleClose,
    open,
    onSave,
    handleCancel,
    handleInputChange,
    handleSubmit,
    formData,
    errors,
    isEditMode
}) => {
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '90%',  // 90% of the viewport width for extra-small screens
            sm: '80%',  // 80% of the viewport width for small screens
            md: 600     // 600px width for medium screens and up
        },
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 3,  // Increased padding for better spacing
        outline: 'none',
    };

    return (
        <Modal
            className='elev_add_modal'
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style2}>
                <div className="elv_add-remark">
                    <span className='elv_add-title-span'>{isEditMode ? 'Edit Shipping Address' : 'Add Shipping Address'}</span>
                    <form className='elv_address_form' onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, 'firstName')}
                            value={formData?.firstName}
                            error={!!errors?.firstName}
                            helperText={errors.firstName}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Address"
                            value={formData.address}
                            onChange={(e) => handleInputChange(e, 'address')}
                            error={!!errors.address}
                            helperText={errors.address}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            value={formData.country}
                            onChange={(e) => handleInputChange(e, 'country')}
                            error={!!errors.country}
                            helperText={errors.country}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="State"
                            value={formData.state}
                            onChange={(e) => handleInputChange(e, 'state')}
                            error={!!errors.state}
                            helperText={errors.state}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="City"
                            value={formData.city}
                            onChange={(e) => handleInputChange(e, 'city')}
                            error={!!errors.city}
                            helperText={errors.city}
                            fullWidth
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Zip Code"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange(e, 'zipCode')}
                            error={!!errors.zipCode}
                            helperText={errors.zipCode}
                            fullWidth
                            type='text'
                            inputProps={{ maxLength: 6 }}
                        />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Mobile No."
                            value={formData.mobileNo}
                            onChange={(e) => handleInputChange(e, 'mobileNo')}
                            error={!!errors.mobileNo}
                            helperText={errors.mobileNo}
                            fullWidth
                            type='number'
                        />
                        <div className="elv_add_RemarkBtn-group">
                            <button type='submit' className="elv_add_remarksave-btn" onClick={onSave}>
                                {isEditMode ? 'Save Changes' : 'Add Address'}
                            </button>
                            <button type='button' className="elv_add_remarkcancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </Box>
        </Modal>
    )
}

export default NewAddressModal