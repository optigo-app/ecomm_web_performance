import React from 'react';
import './Delivery.scss'
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import DeleteDialog from './DeleteDialog';
import { useAddress } from '../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import { Grid } from '@mui/material';
import Footer from "../../Home/Footer/Footer"
import SkeletonLoader from './AddressSkelton';
import ConfirmationDialog from '../../../../../../utils/Glob_Functions/ConfirmationDialog/ConfirmationDialog';

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
        proceedToOrder
    } = useAddress();

    const navigate = useNavigate();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='stam_DeliverMainDiv'>
            <div className='stam_secondMaindivAdd'>
                <div className='stam_addMainDiv'>
                    <div className='stam_TitleDetailMainDiv'>
                        <div>
                        <h1 className='stam_deliveryTitle'>Delivery</h1>
                        <p className='stam_deliverydesc'>Order Will be delivered to selected address</p>
                        </div>
                        <button className='stam_ContinueOrderbtn' onClick={() => proceedToOrder(navigate)}>Continue</button>
                    </div>
                    {!isLoading ? (
                        <div className='stam_getAddrMainDiv'>
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
                    {/* <DeleteDialog
                        openDelete={openDelete}
                        handleDeleteClose={handleDeleteClose}
                        handleDelete={() => handleDelete()}
                    /> */}
                      <ConfirmationDialog
                        open={openDelete}
                        onClose={handleDeleteClose}
                        onConfirm={handleDelete}
                        title="Confirm"
                        content="Are you sure you want to remove this address?"
                    />
                    <div className='stam_AddressBtnGroup'>
                        <button className='stam_AddNewAddrbtn' onClick={() => handleOpen(null)}>Add New Address</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressManagement;
