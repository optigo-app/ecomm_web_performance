import React, { useState } from 'react';
import './Delivery.scss'
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import DeleteDialog from './DeleteDialog';
import { useAddress } from '../../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import { Grid, Button, Snackbar } from '@mui/material';
import SkeletonLoader from './AddressSkelton';
import { IoArrowBack } from 'react-icons/io5';
import ConfirmationMoDialog from '../../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

const AddressManagement = () => {
    const {
        addressData,
        open,
        openDelete,
        formData,
        errors,
        isEditMode,
        isLoading,
        handleOpen,
        handleClose,
        handleCancel,
        handleInputChange,
        handleSubmit,
        handleDelete,
        handleDeleteClick,
        handleDeleteClose,
        handleDefaultSelection,
    } = useAddress();

    const navigate = useNavigate();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const proceedToOrder = (navigation) => {
        if (!addressData || addressData.length === 0) {
            setSnackbarMessage('Please add an address');
            setSnackbarOpen(true);
            return;
        }
        const requiredFields = ['addressprofile', 'city', 'state', 'country', 'zip', 'street', 'shippingfirstname', 'shippinglastname', 'shippingmobile'];
        const defaultAddress = addressData.find(item => item.isdefault === 1);

        if (!defaultAddress) {
            setSnackbarMessage('Please first select the shipping address');
            setSnackbarOpen(true);
            return;
        }
        const hasEmptyField = requiredFields.some(field => !defaultAddress[field] || defaultAddress[field].trim() === '');
        if (hasEmptyField) {
            setSnackbarMessage('Please fill in all required fields');
            setSnackbarOpen(true);
            return;
        }
        navigation('/payment');
        window.scrollTo(0, 0);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarMessage('');
        setSnackbarOpen(false);
      };

    return (
        <div className='smrMo_DeliverMainDiv'>
            <p className="SmiCartListTitle" style={{
                marginTop:'1rem',
                display:'flex',
                alignItems:'center'
            }}>
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />Select delivery address
            </p>
            <div className='smrMo_secondMaindivAdd'>
                <div className='smrMo_addMainDiv'>
                    {!isLoading ? (
                        <div className='smrMo_getAddrMainDiv'>
                            {addressData?.length != 0 ? (
                                <Grid container spacing={2}>
                                    {addressData?.map((data, index) => (
                                        <React.Fragment key={data.id} >
                                            <AddressCard
                                                key={data.id}
                                                name={data.name}
                                                address={data}
                                                index={index}
                                                handleOpen={handleOpen}
                                                handleDeleteClick={handleDeleteClick}
                                                handleDefaultSelection={handleDefaultSelection} />
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            ) :
                                <div className='smrMo_noAddresslistData'>
                                    <p className='smrmo_title'>No Shipping Address Found!</p>
                                    <p className='smrmo_desc'>Please First Add Shipping Address</p>
                                    <button className='smrmo_browseOurCollectionbtn' onClick={() => handleOpen(null)}>Add New Address</button>
                                </div>
                            }
                        </div>
                    ) :
                        <SkeletonLoader />
                    }
                    <AddressForm
                        open={open}
                        handleClose={handleClose}
                        handleCancel={handleCancel}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        isEditMode={isEditMode}
                    />
                    <ConfirmationMoDialog
                        open={openDelete}
                        onClose={handleDeleteClose}
                        onConfirm={handleDelete}
                        title="Remove Address"
                        content="Are you sure you want to remove this address?"
                    />
                </div>
            </div>

            <div className='smrMo_AddressBtnGroup'>
                <button fullWidth className='smrMo_AddNewAddrbtn' onClick={() => handleOpen(null)}>Add New Address</button>
                <button fullWidth className='smrMo_ContinueOrderbtn' onClick={() => proceedToOrder(navigate)}>Continue</button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                className='smr_MoSnakbarTM'
            />
        </div>
    );
};

export default AddressManagement;
