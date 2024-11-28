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
import btnStyle from "../../../scss/Button.module.scss"

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
        <div className='for_DeliverMainDiv'>
            <div className='for_secondMaindivAdd'>
                <div className='for_addMainDiv'>
                    <div className='for_TitleDetailMainDiv'>
                        <div>
                        <h1 className='for_deliveryTitle'>Delivery</h1>
                        <p className='for_deliverydesc'>Order Will be delivered to selected address</p>
                        </div>
                        <button className={`${btnStyle?.btn_for_new2} ${btnStyle?.btn_16}`} onClick={() => proceedToOrder(navigate)}>Continue</button>
                    </div>
                    {!isLoading ? (
                        <div className='for_getAddrMainDiv'>
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
                    <DeleteDialog
                        openDelete={openDelete}
                        handleDeleteClose={handleDeleteClose}
                        handleDelete={() => handleDelete()}
                    />
                    <div className='for_AddressBtnGroup'>
                        <button className={`${btnStyle?.btn_for_new} ${btnStyle?.btn_15}`} onClick={() => handleOpen(null)}>Add New Address</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressManagement;
