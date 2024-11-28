import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import { TextField, Modal, CircularProgress, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { saveEditProfile } from '../../../../../../../utils/API/AccountTabs/YourProfile';
import MobViewHeader from '../MobViewHeader/MobViewHeader';
import { smrMA_defaultAddressState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { getAddressData } from '../../../../../../../utils/API/AccountTabs/manageAddress';
import { validateChangeYPAccount, validateUserDataYPAccount } from '../../../../../../../utils/Glob_Functions/AccountPages/AccountPage';

export default function YourProfile() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const defaultAddress = useRecoilValue(smrMA_defaultAddressState);
    const [addressPresentFlag, setAddressPresentFlag] = useState(false);

    const [toastMsg, setToastMsg] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleCloseSnackbar = () => {
        setShowToast(false);
    };

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('loginUserDetail');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            let obj = {...parsedUserData};
            obj.mobileno = obj.mobileno.replace(/-/g, '');
            setUserData(obj);
        }
    }, []);

    const handleEdit = () => {
        setEditedUserData({ ...userData });
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
       
        // Validate the field
        const errorsCopy = { ...errors };
        errorsCopy[id] = validateChangeYPAccount(id, value);
 
        setErrors(errorsCopy);

    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate user data
        const { errors, isValid } = validateUserDataYPAccount(editedUserData);

        if (isValid) {
            
           
           try {
            setIsLoading(true);
            const storedData = sessionStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;
            const response = await saveEditProfile(editedUserData, data, FrontEnd_RegNo);
            if (response?.Data?.rd[0]?.stat === 1) {
                toast.success('Edit success');
                setUserData(editedUserData);
                sessionStorage.setItem('loginUserDetail', JSON.stringify(editedUserData));
                setEditMode(false);
            } else if(response?.Data?.rd[0]?.stat === 0 && ((response?.Data?.rd[0]?.stat_msg)?.toLowerCase()) === "mobileno alredy exists"){
                setErrors(prevErrors => ({
                    ...prevErrors,
                    mobileno: 'MobileNo Already Exists',
                }));
            } else {
                toast.error('Error in saving profile.');
            }

        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
        } else {
            // Set errors to display validation messages
            setErrors(errors);
        }
    };

    const handleClose = () => {
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false)
        setErrors({});
    }

    return (
        <div className='yourProfile_Account_SMRM'>
            <ToastContainer />

            {isLoading && (
                <div className="loader-overlay" style={{zIndex:10000}}>
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
             <div className="sticky-header">
                <MobViewHeader title="Your Profile" />
             </div>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
               {
                  <div className='userProfileMain' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {userData && (
                    <>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                autoFocus
                                id="defaddress_shippingfirstname"
                                label="First Name"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px', color: 'black' }}
                                value={userData?.firstname || ''}
                                disabled
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="defaddress_shippinglastname"
                                label="Last Name"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                value={userData?.lastname || ''}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                id="userid"
                                label="Email"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                value={userData?.userid || ''}
                                disabled
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="defaddress_shippingmobile"
                                label="Mobile No."
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                value={userData?.mobileno || ''}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                id="defaddress_street"
                                label="Address"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                value={userData?.street || ''}
                                disabled
                                onChange={handleInputChange}
                                sx={{ "& .MuiInputBase-input.Mui-disabled" : {
                                    WebkitTextFillColor:'black'
                                }}}
                                multiline
                                rows={2}
                            />
                        </div>
                    </>
                )}
            </div>
               }
                {  <div className='btnPaddingYP'>
                    <button onClick={handleEdit} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Edit Profile</button>
                </div>}
            </div>

            <Modal open={editMode} onClose={handleClose} style={{ padding: '10px' }} >
                <div className='smilingEditProfilePopup pop_yp_MAPP' style={{ position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, boxShadow: 24 }}>
                    <form  onSubmit={(event) => handleSubmit(event)} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Edit Profile</h2>
                        {editedUserData && (
                            <>
                                <TextField
                                    id="firstname"
                                    label="First Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.firstname !== "undefined" ? editedUserData.firstname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.firstname}
                                    helperText={errors.firstname}
                                />
                                <TextField
                                    id="lastname"
                                    label="Last Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.lastname !== "undefined" ? editedUserData.lastname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.lastname}
                                    helperText={errors.lastname}
                                />
                                <TextField
                                    id="userid"
                                    label="Email"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.userid !== "undefined" ? editedUserData.userid : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.userid}
                                    helperText={errors.userid}
                                    disabled
                                />
                                <TextField
                                    id="mobileno"
                                    label="Mobile No."
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.mobileno !== "undefined" ? editedUserData.mobileno : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.mobileno}
                                    helperText={errors.mobileno}
                                />
                                <TextField
                                    id="street"
                                    label="Address"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.street !== "undefined" ? editedUserData.street : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.street}
                                    helperText={errors.street}
                                    sx={{ "& .MuiInputBase-input.Mui-disabled" : {
                                        WebkitTextFillColor:'black'
                                    }}}
                                    multiline
                                    rows={2}
                                />
                            </>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '25px', padding: '10px' }}>
                            <button type='submit'  className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginInline: '5px' }}>Save</button>
                            <button onClick={() => handleCancel()} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray' }}>Cancel</button>
                        </div>
                    </form>

                </div>
            </Modal>
            <Snackbar
                open={showToast}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={`${toastMsg}`}
                className='smr_MoSnakbarTM'
            />
        </div>
    );
}