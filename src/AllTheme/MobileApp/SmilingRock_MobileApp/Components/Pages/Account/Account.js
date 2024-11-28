import React, { useEffect, useState } from 'react'
// import './Account.modul.scss'
import './Account.scss'
import { Box, CircularProgress, IconButton, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import { smrMA_loginState } from '../../Recoil/atom';
import { accountDetailPages, accountValidation } from '../../../../../../utils/Glob_Functions/AccountPages/AccountPage';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    useEffect(() => {
        a11yProps(1)
    }, [])


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const tabIndicator = {
    '& .MuiTab-textColorPrimary.Mui-selected': {
        color: "#3b3c3d",
    },
    '& .MuiTabs-indicator': {
        backgroundColor: "#3b3c3d"
    }
}

export default function Account() {

    const [value, setValue] = useState(3);
    const [value1, setValue1] = useState(0);
    const naviagation = useNavigate();
    const setIsLoginState = useSetRecoilState(smrMA_loginState)
    const navigation = useNavigate();
    const [accountInner, setAccountInner] = useState(accountDetailPages());
    const [fName, setFname] = useState('');
    const [lastNamr, setLasnane] = useState('');
    const [userMobile, setUserMobile] = useState('');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSub = (event, newValue) => {
        setValue1(newValue);
    }

    useEffect(() => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setFname(loginUserDetail?.firstname);
        setLasnane(loginUserDetail?.lastname);
        setUserMobile(loginUserDetail?.mobileno);
    }, [])

    const handleLogout = () => {
        navigation("/");
        setIsLoginState(false);
        sessionStorage.setItem("LoginUser", false);
        sessionStorage.removeItem("storeInit");
        sessionStorage.removeItem("loginUserDetail");
        sessionStorage.removeItem("remarks");
        sessionStorage.removeItem("selectedAddressId");
        sessionStorage.removeItem("orderNumber");
        sessionStorage.removeItem("registerEmail");
        sessionStorage.removeItem("UploadLogicalPath");
        sessionStorage.removeItem("remarks");
        sessionStorage.removeItem("registerMobile");
        sessionStorage.removeItem("allproductlist");
        sessionStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div className='accountTab_Account_SMRM'>
        <div className='smrMA_Smiling_AccountMain'>
            <div className='titleMain'>
                <div style={{ width: '100%' }}>
                    <p style={{ margin: '0px', fontSize: '25px', fontWeight: 600, paddingInline: '10px' }}>{fName + ' ' + lastNamr}</p>
                    <p style={{ margin: '0px', fontSize: '15px', paddingInline: '10px' }}>+91 {userMobile}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection' onClick={() => naviagation('/OrderHistory')}>
                            <LuBox style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Orders</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }} onClick={() => naviagation('/myWishList')}>
                            <MdFavoriteBorder style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Wishlist</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection' onClick={() => naviagation('/Coupons')}>
                            <IoGiftOutline style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Coupons</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }} onClick={() => naviagation('/HelpCenter')}>
                            <FaHeadset style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Help Center</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='smlingMA-AccountTabMain'>
                <div className='smlingAccountTabMobileView YourAccountPageTabs' style={{ marginTop: '15px' }}>
                    <div className='menuMainAccount' onClick={() => naviagation('/YourProfile')}>
                        <p className='menuMainAccountTitle'>Your Profile</p>
                        <FaChevronRight />
                    </div>
                    <div className='menuMainAccount' onClick={() => naviagation('/OrderHistory')}>
                        <p className='menuMainAccountTitle'>Order History</p>
                        <FaChevronRight />
                    </div>
                    <div className='menuMainAccount' onClick={() => naviagation('/ManageAddress')}>
                        <p className='menuMainAccountTitle'>Manage Address</p>
                        <FaChevronRight />
                    </div>
                    {accountValidation() && <div className='menuMainAccount' onClick={() => naviagation('/MobileViewComp')}>
                        <p className='menuMainAccountTitle' >Account</p>
                        <FaChevronRight />
                    </div>}
                    <div className='menuMainAccount' onClick={() => naviagation('/ChangePassword')}>
                        <p className='menuMainAccountTitle'>Change Password</p>
                        <FaChevronRight />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <p className='smilingAccountLogoutMobile' onClick={handleLogout}>LOG OUT</p>
                    </div>
                </div>


                {/* <Box sx={{ width: '100%' }}>
                        <CustomTabPanel value={value} index={0}>
                            <div>
                                <YourProfile />
                            </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <div>
                                <OrderHistory />
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2} className="manageAddressSec">
                            <ManageAddress />
                        </CustomTabPanel>
                        {accountValidation() &&
                            <CustomTabPanel value={value} index={3} className="accountSalesPage">
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value1} className='accountTabSection' variant="scrollable" onChange={handleChangeSub} aria-label="basic tabs example" sx={{ background: "#7d7f8529", ...tabIndicator }} scrollButtons="auto">
                                        {
                                            accountInner?.map((e, i) => {
                                                return <Tab label={e?.tabLabel} {...a11yProps(i)} sx={{ color: "#7d7f85" }} key={i} />
                                            })
                                        }
                                    </Tabs>
                                </Box>
                                {
                                    accountInner?.map((e, i) => {
                                        return <React.Fragment key={i}>
                                            {e?.id === 1163 && <CustomTabPanel value={value1} index={i} className="AcountSales">
                                                <QuotationQuote />
                                            </CustomTabPanel>}
                                            {e?.id === 1164 && <CustomTabPanel value={value1} index={i} className="quotationFilters">
                                                <QuotationJob />
                                            </CustomTabPanel>}
                                            {e?.id === 1157 && <CustomTabPanel value={value1} index={i} className="salesPage">
                                                <Sales />
                                            </CustomTabPanel>}
                                            {e?.id === 1314 && <CustomTabPanel value={value1} index={i} className="salesReport">
                                                <SalesReport />
                                            </CustomTabPanel>}
                                            {e?.id === 17020 && <CustomTabPanel value={value1} index={i} className="DesignWiseSalesReport">
                                                <DesignWiseSalesReport />
                                            </CustomTabPanel>}
                                            {e?.id === 1159 && <CustomTabPanel value={value1} index={i}>
                                                <AccountLedger />
                                            </CustomTabPanel>}
                                        </React.Fragment>
                                    })
                                }
                            </CustomTabPanel>
                        }
                        <CustomTabPanel value={value} index={accountValidation() ? 4 : 3}>
                            <div>
                                <ChangePassword />
                            </div>
                        </CustomTabPanel>
                    </Box> */}
            </div>
        </div>
        </div>
    )
}
