import React, { useEffect, useState } from 'react'
import './Account.scss'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Footer from './../Home/Footer/Footer';
import { proCat_loginState } from '../../../Components/Recoil/atom';
import { useSetRecoilState } from 'recoil';

import YourProfile from './YourProfile/YourProfile';
import ChangePassword from './changePassword/ChangePassword';
import ManageAddress from './address/ManageAddress';
import OrderHistory from './AccountOrderHistory/OrderHisoty';


import AccountLedger from './AccountLeger/AccountLedger';
import Sales from './Sales/Sales';
import DesignWiseSalesReport from "./DesignWiseSalesReport/DesignWiseSalesReport"
import SalesReport from './SalesReport/SalesReport';
import QuotationJob from './QuotationJob/QuotationJob';
import QuotationQuote from './QuotationQuote/QuotationQuote';
import PendingMemo from "./PendingMemo/PendingMemo";
import { accountDetailPages, accountValidation } from '../../../../../utils/Glob_Functions/AccountPages/AccountPage';
import NewOrderHistoryPC from './AccountOrderHistory/NewOrderHistoryPC';
import Cookies from 'js-cookie';
// import { accountDetailPage, accountDetailPages, accountValidation } from '../../../Utils/globalFunctions/GlobalFunction';

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

    const [value, setValue] = useState(0);
    const [value1, setValue1] = useState(0);
    const naviagation = useNavigate();
    const setIsLoginState = useSetRecoilState(proCat_loginState)
    const navigation = useNavigate();
    const [accountInner, setAccountInner] = useState(accountDetailPages());

    const loginUSerDeatil = JSON.parse(sessionStorage.getItem('loginUserDetail'))

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSub = (event, newValue) => {
        setValue1(newValue);
    }

    const handleLogout = () => {
        navigation("/");
        Cookies.remove("userLoginCookie");
        window.location.reload();
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
        sessionStorage.removeItem("AllFilter");
        sessionStorage.removeItem("ColorStoneQualityColorCombo");
        // sessionStorage.removeItem("CompanyInfoData");
        sessionStorage.removeItem("MetalColorCombo");
        sessionStorage.removeItem("metalTypeCombo");
        // sessionStorage.removeItem("myAccountFlags");
        sessionStorage.removeItem("registerEmail");
        sessionStorage.removeItem("selectedAddressId");
    };

    return (
        <div className='accountTab_Account_PCJ'>
            <div className='accountPagTabSection'>
                <div>
                    <div className='Smiling-AccountMain'>

                        {/* <p className='SmilingAccountTitle youraccountpagesec'>Your Account</p> */}
                        <div className='sticky_header_web_sm_procat'>
                            <p className='SmilingAccountTitle youraccountpagesecSMR '>Your Account</p>
                            <div className='smlingAccountTabWebView_Procat yourAccount d_none_acc' >
                                <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >   {/*  orientation="vertical" indicatorColor="#7d7f85" */}
                                        <Tab label="Your Profile" {...a11yProps(0)} />
                                        <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                        <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                        {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                        <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                        {/* <Tab label="PLM" {...a11yProps(5)} /> */}
                                        {loginUSerDeatil?.IsPLWOn && <Tab label="PLM" {...a11yProps(1)} />}
                                        <Tab label="Log Out" onClick={handleLogout} />
                                    </Tabs>
                                    {/* <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p> */}
                                </Box>
                            </div>
                            <div className='smlingAccountTabMobileView_Procat YourAccountPageTabs yourAccount'>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Tabs value={value} orientation="vertical" onChange={handleChange} sx={{ width: '100%' }} >   {/*  indicatorColor="#7d7f85" */}
                                        <Tab label="Your Profile" {...a11yProps(0)} sx={{ textAlign: 'start', width: '90%', borderColor: 'divider' }} />
                                        <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                        <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                        {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                        <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                        {/* <Tab label="PLM" {...a11yProps(5)} /> */}
                                        {loginUSerDeatil?.IsPLWOn && <Tab label="PLM" {...a11yProps(1)} />}
                                        {/* <Tab label="Log Out" onClick={handleLogout} /> */}
                                    </Tabs>
                                    {/* <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p> */}
                                </Box>

                            </div>
                        </div>

                        <div className='smling-AccountTabMain'>
                            <Box sx={{ width: '100%' }}>
                                {/* <div className='smlingAccountTabWebView'>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  > 
                                            <Tab label="Your Profile" {...a11yProps(0)} />
                                            <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                            <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                            {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                            <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                        </Tabs>
                                        <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p>
                                    </Box>
                                </div>
                                <div className='smlingAccountTabMobileView YourAccountPageTabs'>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Tabs value={value} orientation="vertical" onChange={handleChange} sx={{ width: '100%' }} >  
                                            <Tab label="Your Profile" {...a11yProps(0)} sx={{ textAlign: 'start', width: '90%', borderColor: 'divider' }} />
                                            <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                            <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                            {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                            <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                        </Tabs>
                                    </Box>
                                
                                </div> */}

                                <CustomTabPanel value={value} index={0}>
                                    <div>
                                        <YourProfile />
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={1}>
                                    <div>
                                        {/* <OrderHistory /> */}
                                        <NewOrderHistoryPC />
                                    </div>
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2} className="manageAddressSec">
                                    <ManageAddress />
                                </CustomTabPanel>

                                {accountValidation() && <CustomTabPanel value={value} index={3} className="accountSalesPage_Procat">
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value1} className='accountTabSection' variant="scrollable" onChange={handleChangeSub} aria-label="basic tabs example"
                                            sx={{ background: "#7d7f8529", ...tabIndicator }} scrollButtons="auto">
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
                                                {e?.id === 18129 && <CustomTabPanel value={value1} index={i} className="salesReport">
                                                    <PendingMemo />
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
                                </CustomTabPanel>}
                                <CustomTabPanel value={value} index={accountValidation() ? 4 : 3}>
                                    <div>
                                        <ChangePassword />
                                    </div>
                                </CustomTabPanel>
                                {/* { loginUSerDeatil?.IsPLWOn && <CustomTabPanel value={value} index={5}>
                                    <div>
                                        <Plm />
                                    </div>
                                </CustomTabPanel>} */}


                            </Box>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

//account mobile view icons
// import AccountBoxIcon from '@mui/icons-material/AccountBox'; - Your Profile
// import ListAltIcon from '@mui/icons-material/ListAlt'; - Order History
// import HomeIcon from '@mui/icons-material/Home'; - Manage Address
// import LockResetIcon from '@mui/icons-material/LockReset'; - change password
// import SummarizeIcon from '@mui/icons-material/Summarize'; -  Accounts
// import ShieldIcon from '@mui/icons-material/Shield'; - PLW