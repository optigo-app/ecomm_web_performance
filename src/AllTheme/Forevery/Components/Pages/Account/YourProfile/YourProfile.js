import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import { TextField, Modal,  CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { saveEditProfile } from '../../../../../../utils/API/AccountTabs/YourProfile';
import { for_defaultAddressState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { getAddressData } from '../../../../../../utils/API/AccountTabs/manageAddress';

export default function YourProfile() {
    
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const defaultAddress = useRecoilValue(for_defaultAddressState);
    const [addressPresentFlag, setAddressPresentFlag] = useState(false);


    // useEffect(() => {
    //     const storedUserData = sessionStorage.getItem('loginUserDetail');
    //     if (storedUserData) {
    //          console.log('call');
             
    //             // setUserData(JSON.parse(storedUserData));

    //             let obj = JSON.parse(storedUserData);

    //             console.log("edit user data",obj);

    //             setUserData(obj);
             
    //             // setUserData(JSON.parse(storedUserData));
    //     }
    // }, []);

    // useEffect(() => {

    //     const storedUserData = sessionStorage.getItem('loginUserDetail');
    //     if (storedUserData && defaultAddress !== undefined) {
             
    //             setUserData(JSON.parse(storedUserData));
    //             let obj = JSON.parse(storedUserData);
                
    //             obj.defaddress_shippingfirstname = defaultAddress?.shippingfirstname;
    //             obj.defaddress_shippinglastname = defaultAddress?.shippinglastname;
    //             obj.defaddress_shippingmobile = defaultAddress?.shippingmobile;
    //             obj.defaddress_addressprofile = defaultAddress?.addressprofile;
    //             obj.defaddress_street = defaultAddress?.street;
    //             obj.defaddress_city = defaultAddress?.city;
    //             obj.defaddress_state = defaultAddress?.state;
    //             obj.defaddress_country = defaultAddress?.country;
    //             obj.defaddress_zip = defaultAddress?.zip;
    //             obj.IsDefault = defaultAddress?.isdefault;
    //             setUserData(obj);
             
    //         // setUserData(JSON.parse(storedUserData));
    //     }
    // }, [defaultAddress]);


    useEffect(() => {
        const storedUserData = sessionStorage.getItem('loginUserDetail');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            if (defaultAddress) {
                const updatedUserData = {
                    ...parsedUserData,
                    defaddress_shippingfirstname: defaultAddress?.shippingfirstname,
                    defaddress_shippinglastname: defaultAddress?.shippinglastname,
                    defaddress_shippingmobile: defaultAddress?.shippingmobile,
                    defaddress_addressprofile: defaultAddress?.addressprofile,
                    defaddress_street: defaultAddress?.street,
                    defaddress_city: defaultAddress?.city,
                    defaddress_state: defaultAddress?.state,
                    defaddress_country: defaultAddress?.country,
                    defaddress_zip: defaultAddress?.zip,
                    IsDefault: defaultAddress?.isdefault
                };
                setUserData(updatedUserData);
            } else {
                console.log(parsedUserData);
                setUserData(parsedUserData);
            }
        }
    }, [defaultAddress]);

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

        switch (id) {
            case 'defaddress_shippingfirstname':
             
                if (!value?.trim().length) {
                    errorsCopy.defaddress_shippingfirstname = "First Name is required";
                } else if (!/^[a-zA-Z\s]+$/.test(value?.trim())) {
                    errorsCopy.defaddress_shippingfirstname = "First Name must contain only letters";
                } else if (value.trim().length < 2) {
                    errorsCopy.defaddress_shippingfirstname = "Enter minimum 2 characters";
                } else if (value.trim().length > 45) {
                    errorsCopy.defaddress_shippingfirstname = "Enter maximum 45 characters";
                } else {
                    errorsCopy.defaddress_shippingfirstname = "";
                }
                break;
            case 'defaddress_shippinglastname':
          
                if (!value?.trim().length) {
                    errorsCopy.defaddress_shippinglastname = "Last Name is required";
                } else if (!/^[a-zA-Z\s]+$/.test(value?.trim())) {
                    errorsCopy.defaddress_shippinglastname = "Last Name must contain only letters";
                } else if (value.trim().length < 2) {
                    errorsCopy.defaddress_shippinglastname = "Enter minimum 2 characters";
                } else if (value.trim().length > 45) {
                    errorsCopy.defaddress_shippinglastname = "Enter maximum 45 characters";
                } else {
                    errorsCopy.defaddress_shippinglastname = "";
                }
                break;
            case 'defaddress_street':
                if(!value.trim()){
                    errorsCopy.defaddress_street = 'Address is required';
                }else{
                    errorsCopy.defaddress_street = '';
                }
        
                break;
            case 'defaddress_shippingmobile':
            
                if (!value.trim()) {
                    errorsCopy.defaddress_shippingmobile = 'Mobile Number is required';
                } else if (!/^\d+$/.test(value.trim())) {
                    errorsCopy.defaddress_shippingmobile = 'Mobile Number must contain only numeric values';
                } else if (value?.trim()?.length !== 10) {
                    errorsCopy.defaddress_shippingmobile = 'Mobile Number must be exactly 10 digits';
                } else {
                    errorsCopy.defaddress_shippingmobile = '';
                }
                break;
            default:
                break;
        }


        setErrors(errorsCopy);

    };

    // const handleSave = async (event) => {
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(event);
    //     setEditMode(false);
    //     try {
    //         setIsLoading(true);
    //         const storedData = sessionStorage.getItem('loginUserDetail');
    //         const data = JSON.parse(storedData);
    //         const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    //         const { FrontEnd_RegNo } = storeInit;
    //         const response = await saveEditProfile(editedUserData, data, FrontEnd_RegNo, editedUserData);
    //         if (response?.Data?.rd[0]?.stat === 1) {

    //             toast.success('Edit success');
    //             setUserData(editedUserData);
    //             sessionStorage.setItem('loginUserDetail', JSON.stringify(editedUserData));

    //         } else {
    //             toast.error('error');
    //         }

    //     } catch (error) {
    //         console.error('Error:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }


    // };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            
            setEditMode(false);
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
                } else {
                    toast.error('Error in saving profile.');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } 
    };


    const handleClose = () => {
        setEditMode(false);
    };

    const validate = () => {

        // const errors = {}; // Initialize errors object
    
        // // Validate each required field
        // if (!editedUserData.defaddress_shippingfirstname.trim()) {
        //     errors.defaddress_shippingfirstname = 'First Name is required';
        // } else if(editedUserData.defaddress_shippingfirstname?.length < 3){
        //     errors.defaddress_shippingfirstname = 'First Name too short';
        // } else if(editedUserData.defaddress_shippingfirstname?.length > 25){
        //     errors.defaddress_shippingfirstname = 'FIrst Name too long';
        // } else if (!/^[a-zA-Z]+$/.test(editedUserData.defaddress_shippingfirstname.trim())) {
        //     errors.defaddress_shippingfirstname = 'First Name must contain only letters';
        // }

        // if (!editedUserData.defaddress_shippinglastname.trim()) {
        //     errors.defaddress_shippinglastname = 'Last Name is required';
        // } else if(editedUserData.defaddress_shippinglastname?.length < 3){
        //     errors.defaddress_shippinglastname = 'Last Name is too short';
        // } else if(editedUserData.defaddress_shippinglastname?.length > 25){
        //     errors.defaddress_shippinglastname = 'Last Name is too long';
        // } else if (!/^[a-zA-Z]+$/.test(editedUserData.defaddress_shippinglastname.trim())) {
        //     errors.defaddress_shippinglastname = 'Last Name must contain only letters';
        // }

        // if (!editedUserData.defaddress_street.trim()) {
        //     errors.defaddress_street = 'Address is required';
        // } else if(editedUserData.defaddress_street?.length < 3){
        //     errors.defaddress_street = 'Address is too short';
        // } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(editedUserData.defaddress_street.trim())) {
        //     errors.defaddress_street = 'Invalid Address';
        // } else {
        //     errors.defaddress_street = '';
        // }
        

        // if (!editedUserData.defaddress_shippingmobile.trim()) {
        //     errors.defaddress_shippingmobile = 'Mobile No. is required';
        // } else if (!/^\d{10}$/.test(editedUserData.defaddress_shippingmobile.trim())) {
        //     errors.defaddress_shippingmobile = 'Mobile No. must contain exactly 10 numbers';
        // }
    
        // console.log(errors, editedUserData);
        // // If there are any errors, update state and return
        // if (Object.keys(errors).length > 0) {
        //     setErrors(errors);
        //     return false;
        // }else{
        //     return true;
        // }

        let tempErrors = {};

        // First Name validation
 
        if (!editedUserData.defaddress_shippingfirstname?.trim().length) {
            tempErrors.defaddress_shippingfirstname = "First Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(editedUserData.defaddress_shippingfirstname.trim())) {
            tempErrors.defaddress_shippingfirstname = "First Name must contain only letters";
        } else if (editedUserData.defaddress_shippingfirstname.trim().length < 2) {
            tempErrors.defaddress_shippingfirstname = "Enter minimum 2 characters";
        } else if (editedUserData.defaddress_shippingfirstname.trim().length > 45) {
            tempErrors.defaddress_shippingfirstname = "Enter maximum 45 characters";
        } else {
            tempErrors.defaddress_shippingfirstname = "";
        }

        // Last Name validation

        if (!editedUserData.defaddress_shippinglastname?.trim().length) {
            tempErrors.defaddress_shippinglastname = "Last Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(editedUserData.defaddress_shippinglastname.trim())) {
            tempErrors.defaddress_shippinglastname = "Last Name must contain only letters";
        } else if (editedUserData.defaddress_shippinglastname.trim().length < 2) {
            tempErrors.defaddress_shippinglastname = "Enter minimum 2 characters";
        } else if (editedUserData.defaddress_shippinglastname.trim().length > 45) {
            tempErrors.defaddress_shippinglastname = "Enter maximum 45 characters";
        } else {
            tempErrors.defaddress_shippinglastname = "";
        }

        // Mobile Number validation

        if (!editedUserData.defaddress_shippingmobile?.trim().length) {
            tempErrors.defaddress_shippingmobile = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(editedUserData.defaddress_shippingmobile.trim())) {
            tempErrors.defaddress_shippingmobile = "Mobile Number must contain exactly 10 digits and only numbers";
        } else {
            tempErrors.defaddress_shippingmobile = "";
        }

        // User ID validation
        if (!editedUserData.userid) {
            tempErrors.userid = "User ID is required";
        }

        // Street Address validation
        if (!editedUserData.defaddress_street) {
            tempErrors.defaddress_street = "Address is required";
        }

        setErrors(tempErrors);

        // Check if all errors are empty strings or undefined
        return Object.values(tempErrors).every(x => !x);

        // tempErrors.defaddress_shippingfirstname = editedUserData.defaddress_shippingfirstname ? "" : "This field is required.";
        // tempErrors.defaddress_shippinglastname = editedUserData.defaddress_shippinglastname ? "" : "This field is required.";
        // tempErrors.userid = editedUserData.userid ? "" : "This field is required.";
        // tempErrors.defaddress_shippingmobile = editedUserData.defaddress_shippingmobile ? "" : "This field is required.";
        // tempErrors.defaddress_street = editedUserData.defaddress_street ? "" : "This field is required.";
        // setErrors(tempErrors);
        // return Object.values(tempErrors).every(x => x === "");
    };

    useEffect(() => {
        fetchAddress();
    }, [])

    const fetchAddress = async() => {
        setIsLoading(true);
        try {
            const storedData = sessionStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const customerid = data.id;
            
            const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;
            
            const response = await getAddressData(FrontEnd_RegNo, customerid, data);
            if(response?.Data?.rd?.length > 0){
                setAddressPresentFlag(true);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }    
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        
    }

    const handleCancel = () => {
        setEditMode(false);
        setErrors({});
    }


    return (
        <div className='yourProfile_Account_FE'>
        <div className='smr_yourProfile '>
            <ToastContainer />

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'20px' }} >
                { addressPresentFlag &&  <div className='userProfileMain' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                                    // value={userData.defaddress_shippingfirstname !== undefined ? userData.defaddress_shippingfirstname : userData.firstname}
                                    value={userData?.defaddress_shippingfirstname || ''}
                                    // disabled={!editMode}
                                    disabled
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_shippinglastname"
                                    label="Last Name"
                                    variant="outlined"
                                    className='labgrowRegister'
                                    style={{ margin: '15px' }}
                                    // value={userData.defaddress_shippinglastname !== undefined ? userData.defaddress_shippinglastname : userData.lastname}
                                    value={userData?.defaddress_shippinglastname || ''}
                                    // disabled={!editMode}
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
                                    // value={userData.userid !== "undefined" ? userData.userid : ""}
                                    value={userData?.userid || ''}
                                    // disabled={!editMode}
                                    disabled
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_shippingmobile"
                                    label="Mobile No."
                                    variant="outlined"
                                    className='labgrowRegister'
                                    style={{ margin: '15px' }}
                                    // value={(userData.defaddress_shippingmobile || userData.mobile) !== "undefined" ? (userData.defaddress_shippingmobile || userData.mobile) : ""}
                                    value={userData?.defaddress_shippingmobile || ''}
                                    // disabled={!editMode}
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
                                    // value={userData.defaddress_street !== "undefined" ? userData.defaddress_street : ""}
                                    value={userData?.defaddress_street || ''}
                                    // disabled={!editMode}
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
                </div>}
                { addressPresentFlag &&  <div>
                    <button onClick={handleEdit} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Edit Profile</button>
                </div>}
            </div>

            <Modal
                open={editMode}
                onClose={handleClose}
            >
                <div className='smilingEditProfilePopup' style={{ position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, boxShadow: 24, p: 4 }}>
                    {/* <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}> */}
                    <form onSubmit={(event) => handleSubmit(event)} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Edit Profile</h2>
                        {editedUserData && (
                            <>
                                <TextField
                                    id="defaddress_shippingfirstname"
                                    label="First Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippingfirstname !== "undefined" ? editedUserData.defaddress_shippingfirstname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippingfirstname}
                                    helperText={errors.defaddress_shippingfirstname}
                                />
                                <TextField
                                    id="defaddress_shippinglastname"
                                    label="Last Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippinglastname !== "undefined" ? editedUserData.defaddress_shippinglastname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippinglastname}
                                    helperText={errors.defaddress_shippinglastname}
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
                                    id="defaddress_shippingmobile"
                                    label="Mobile No."
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippingmobile !== "undefined" ? editedUserData.defaddress_shippingmobile : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippingmobile}
                                    helperText={errors.defaddress_shippingmobile}
                                />
                                <TextField
                                    id="defaddress_street"
                                    label="Address"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_street !== "undefined" ? editedUserData.defaddress_street : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_street}
                                    helperText={errors.defaddress_street}
                                    sx={{ "& .MuiInputBase-input.Mui-disabled" : {
                                        WebkitTextFillColor:'black'
                                    }}}
                                    multiline
                                    rows={2}
                                />
                            </>
                        )}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '25px' }}>
                        {/* <button onClick={handleSave} className='smr_SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginInline: '5px' }}>Save</button> */}
                        <button type='submit' className='smilingDeleveryformSaveBtn' >Save</button>
                        <button onClick={() => handleCancel()} className='smilingDeleveryformCansleBtn_fe' >Cancel</button>
                    </div>
                    </form>
                </div>
            </Modal>
        
        </div>
        </div>
    );
}
