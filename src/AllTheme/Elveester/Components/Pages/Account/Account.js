import React, { useEffect, useState } from 'react'
import './Account.scss'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Footer from '../Home/Footer/Footer';
import { el_loginState, loginState } from '../../Recoil/atom';
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
import PendingMemo from './PendingMemo/PendingMemo';


import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import LockResetIcon from "@mui/icons-material/LockReset";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonPinIcon from '@mui/icons-material/PersonPin';


import { accountDetailPages, accountValidation } from '../../../../../utils/Glob_Functions/AccountPages/AccountPage';
import Plm from './PLM/Plm';
import Cookies from 'js-cookie';
import NewOrderHistoryElvee from './AccountOrderHistory/NewOrderHistoryElvee';


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
                <Box sx={{ p: 3 }} className="acc_hoq_tab_p_0" style={{ marginTop: '10px !important' }}>
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
    const setIsLoginState = useSetRecoilState(el_loginState)
    const navigation = useNavigate();
    const [accountInner, setAccountInner] = useState(accountDetailPages());
    const loginUSerDeatil = JSON.parse(sessionStorage.getItem('loginUserDetail'))

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSub = (event, newValue) => {
        setValue1(newValue);
    }

    // const handleLogout = () => {
    //     setIsLoginState('false')
    //     sessionStorage.setItem('LoginUser', 'false');
    //     sessionStorage.removeItem('storeInit');
    //     sessionStorage.removeItem('loginUserDetail');
    //     sessionStorage.removeItem('remarks');
    //     sessionStorage.removeItem('selectedAddressId');
    //     sessionStorage.removeItem('orderNumber');
    //     sessionStorage.removeItem('registerEmail');
    //     sessionStorage.removeItem('UploadLogicalPath');
    //     sessionStorage.removeItem('remarks');
    //     sessionStorage.removeItem('registerMobile');
    //     sessionStorage.removeItem('allproductlist');
    //     naviagation('/')
    //     window.location.reload();
    // }
    const handleLogout = () => {
        setIsLoginState(false);
        Cookies.remove('userLoginCookie');
        sessionStorage.setItem('LoginUser', false);
        sessionStorage.removeItem('storeInit');
        sessionStorage.removeItem('loginUserDetail');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('selectedAddressId');
        sessionStorage.removeItem('orderNumber');
        sessionStorage.removeItem('registerEmail');
        sessionStorage.removeItem('UploadLogicalPath');
        sessionStorage.removeItem('remarks');
        sessionStorage.removeItem('registerMobile');
        sessionStorage.removeItem('allproductlist');
        sessionStorage.clear();
        navigation('/')
        window.location.reload();
    }

    return (
        <div className='accountTab_Account_elvee'>
            <div className='accountPagTabSection elvee_fs_pt'>
                <div>
                    <div className='Smiling-AccountMain_elvee'>
                        <div className='sticky_header_web_sm_elvee'>
                            <p className='SmilingAccountTitle youraccountpagesec elvee_fs_pt'>Your Account</p>
                            <div className='smlingAccountTabWebView_elvee yourAccount d_none_acc_elvee'>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >   {/*  orientation="vertical" indicatorColor="#7d7f85" */}
                                            <Tab label="Your Profile" className='elvee_fs_pt' {...a11yProps(0)} />
                                            <Tab label="ORDER HISTORY" className='elvee_fs_pt' {...a11yProps(1)} />
                                            <Tab label="MANAGE ADDRESSES" className='elvee_fs_pt' {...a11yProps(2)} />
                                            {accountValidation() && <Tab label="ACCOUNT" className='elvee_fs_pt' {...a11yProps(3)} />}
                                            <Tab label="CHANGE PASSWORD" className='elvee_fs_pt' {...a11yProps(accountValidation() ? 4 : 3)} />
                                            {/* <Tab label="PLM" {...a11yProps(5)} /> */}
                                            { loginUSerDeatil?.IsPLWOn === 1 && <Tab label="PLM" className='elvee_fs_pt' {...a11yProps(5)} />}
                                            <Tab label="Log Out" className='elvee_fs_pt' onClick={handleLogout} />
                                        </Tabs>
                                        {/* <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p> */}
                                    </Box>
                            </div>
                            {/* <div className='smlingAccountTabMobileView YourAccountPageTabs yourAccount' style={{display:'none'}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Tabs value={value} orientation="vertical" onChange={handleChange} sx={{ width: '100%' }} > 
                                            <Tab label="Your Profile" {...a11yProps(0)} sx={{ textAlign: 'start', width: '90%', borderColor: 'divider' }} />
                                            <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                            <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                            {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                            <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                            {loginUSerDeatil?.IsPLWOn && <Tab label="PLM" {...a11yProps(1)} />}
                                            <Tab label="Log Out" onClick={handleLogout} />
                                        </Tabs>
                                    </Box>
                                
                            </div> */}
                            <div className="hoqAccountTabMobileView hoqYourAccountPageTabs yourAccount iconsTabAcc_elvee" style={{paddingTop:'1%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Tabs value={value} orientation="horizontal" variant="scrollable" onChange={handleChange} className='elvee_fs_pt' TabIndicatorProps={{ style: { backgroundColor: "black",
                        marginTop: "5px", // This changes the underline color to black
                        display: "flex", alignItems: "center", justifyContent: "center",
                    },
                    }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", }} >
                    <Tab icon={<AccountBoxIcon titleAccess="Your Profile" />} {...a11yProps(0)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} />
                    <Tab icon={<ListAltIcon titleAccess="Order History" />} {...a11yProps(1)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} />
                    <Tab icon={<PersonPinIcon titleAccess="Manage Address" />} {...a11yProps(2)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} />
                    {accountValidation() && ( <Tab icon={<AutoStoriesIcon titleAccess="Accounts" />} {...a11yProps(3)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} /> )}
                    <Tab icon={ <LockResetIcon titleAccess="Change Password" {...a11yProps(accountValidation() ? 4 : 3)} /> } style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} />
                    {loginUSerDeatil?.IsPLWOn === 1 && ( <Tab icon={<ShieldIcon titleAccess="PLM" />} {...a11yProps(5)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} /> )}
                </Tabs>
                </div>
                        </div>
                        <div className='smling-AccountTabMain_elvee'>
                            <Box sx={{ width: '100%', padding:'0px' }}>

                                <CustomTabPanel value={value} index={0}>
                                    <div>
                                        <YourProfile />
                                    </div>
                                </CustomTabPanel>

                                <CustomTabPanel value={value} index={1}>
                                    <div>
                                
                                        <NewOrderHistoryElvee />
                                    </div>
                                </CustomTabPanel>
                                
                                <CustomTabPanel value={value} index={2} className="manageAddressSec">
                                    <ManageAddress />
                                </CustomTabPanel>

                                {accountValidation() && <CustomTabPanel value={value} index={3} className="accountSalesPage" style={{ padding: '0px' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0px !important' }}>
                                        <Tabs value={value1} className='accountTabSection' variant="scrollable" onChange={handleChangeSub} aria-label="basic tabs example"
                                            sx={{ background: "#7d7f8529", ...tabIndicator }} scrollButtons="auto">
                                            {
                                                accountInner?.map((e, i) => {
                                                    return <Tab label={e?.tabLabel} className='elvee_fs_pt' {...a11yProps(i)} sx={{ color: "#7d7f85" }} key={i} />
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
                                                {e?.id === 1159 && <CustomTabPanel value={value1} index={i} >
                                                    <AccountLedger />
                                                </CustomTabPanel>}
                                                {e?.id === 18129 && <CustomTabPanel value={value1} index={i}>
                                                    <PendingMemo />
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

                                <CustomTabPanel value={value} index={5}>
                                    <div>
                                        <Plm />
                                    </div>
                                </CustomTabPanel>

                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
