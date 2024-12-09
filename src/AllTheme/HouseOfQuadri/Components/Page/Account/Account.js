import React, { useEffect, useState } from "react";
import "./Account.scss";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Hoq_loginState } from "../../../Components/Recoil/atom";
import { useSetRecoilState } from "recoil";

import YourProfile from "./YourProfile/YourProfile";
import ChangePassword from "./changePassword/ChangePassword";
import ManageAddress from "./address/ManageAddress";
import OrderHistory from "./AccountOrderHistory/OrderHisoty";

import AccountLedger from "./AccountLeger/AccountLedger";
import Sales from "./Sales/Sales";
import DesignWiseSalesReport from "./DesignWiseSalesReport/DesignWiseSalesReport";
import SalesReport from "./SalesReport/SalesReport";
import QuotationJob from "./QuotationJob/QuotationJob";
import QuotationQuote from "./QuotationQuote/QuotationQuote";
import PendingMemo from "./PendingMemo/PendingMemo";

import {
  accountDetailPages,
  accountValidation,
} from "../../../../../utils/Glob_Functions/AccountPages/AccountPage";
import Plm from "./PLM/Plm";
import Cookies from "js-cookie";
import NewOrderHistoryHOQ from "./AccountOrderHistory/NewOrderHistoryHOQ";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import LockResetIcon from "@mui/icons-material/LockReset";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ShieldIcon from "@mui/icons-material/Shield";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  useEffect(() => {
    a11yProps(1);
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="acc_hoq_tab_p_0" style={{marginTop:'10px !important'}}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabIndicator = {
  "& .MuiTab-textColorPrimary.Mui-selected": {
    color: "#3b3c3d",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#3b3c3d",
  },
};

export default function Account() {
  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const naviagation = useNavigate();
  const setIsLoginState = useSetRecoilState(Hoq_loginState);
  const navigation = useNavigate();
  const [accountInner, setAccountInner] = useState(accountDetailPages());
  const loginUSerDeatil = JSON.parse(sessionStorage.getItem("loginUserDetail"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSub = (event, newValue) => {
    setValue1(newValue);
  };

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
    Cookies.remove("userLoginCookie");
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
    navigation("/");
    window.location.reload();
  };
  const [isSticky, setisSticky] = useState(null);
  useEffect(() => {
    // Define the callback function for the Intersection Observer
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setisSticky(true);
        } else {
          setisSticky(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // observing relative to the viewport
      rootMargin: "0px",
      threshold: 0.1, // percentage of visibility required
    });

    const target = document.querySelector(".new_bar");

    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <div className="accountTab_Account_HOQ">
      <div className="accountPagTabSection">
        <div>
          <div className="hoq-AccountMain">
            <div className={` ${!isSticky ? 'sticky_header_web_sm_hoq_isSticky' : 'sticky_header_web_sm_hoq'}`} style={{
              top  : !isSticky && '0px' ,
            }}>
              <p className="hoqAccountTitle youraccountpagesec" style={{ height: "40px", margin: "0px", padding: "0px" }} > Your Account </p>
              <div className="hoqAccountTabWebView hoq_main_head_none" style={{paddingTop:'1%'}}>
                <Box sx={{ display: "flex", justifyContent: "center", borderBottom: 1, borderColor: "divider", }} >
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    {" "}
                    {/*  orientation="vertical" indicatorColor="#7d7f85" */}
                    <Tab label="Your Profile" {...a11yProps(0)} />
                    <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                    <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} /> {accountValidation() && ( <Tab label="ACCOUNT" {...a11yProps(3)} /> )}
                    <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} /> {/* <Tab label="PLM" {...a11yProps(5)} /> */}
                    {loginUSerDeatil?.IsPLWOn && ( <Tab label="PLM" {...a11yProps(1)} /> )}
                    {/* <Tab label="Log Out" onClick={handleLogout} /> */}
                  </Tabs>
                  {/* <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p> */}
                </Box>
              </div>
              <div className="hoqAccountTabMobileView hoqYourAccountPageTabs yourAccount " style={{ display: "none" }} >
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Tabs value={value} orientation="vertical" onChange={handleChange} sx={{ width: "100%" }} >
                    {" "}
                    {/*  indicatorColor="#7d7f85" */}
                    <Tab label="Your Profile" {...a11yProps(0)} sx={{ textAlign: "start", width: "90%", borderColor: "divider", }} />
                    <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                    <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} /> {accountValidation() && ( <Tab label="ACCOUNT" {...a11yProps(3)} /> )}
                    <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                    {/* <Tab label="PLM" {...a11yProps(5)} /> */}
                    {loginUSerDeatil?.IsPLWOn && ( <Tab label="PLM" {...a11yProps(1)} /> )} {/* <Tab label="Log Out" onClick={handleLogout} /> */}
                  </Tabs>
                  {/* <p className='smilingAccountLogout' onClick={handleLogout}>LOG OUT</p> */}
                </Box>
              </div>
              <div className="hoqAccountTabMobileView hoqYourAccountPageTabs yourAccount iconsTabAcc" style={{paddingTop:'1%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Tabs value={value} orientation="horizontal" variant="scrollable" onChange={handleChange} TabIndicatorProps={{ style: { backgroundColor: "black",
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
                  {loginUSerDeatil?.IsPLWOn && ( <Tab icon={<ShieldIcon titleAccess="PLM" />} {...a11yProps(1)} style={{ minWidth: "16.66%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2px", height: "30px", }} /> )}
                </Tabs>
              </div>
            </div>
            <div className="hoq-AccountTabMain">
              <Box sx={{ width: "100%" }}>
                {/* <div className='hoqAccountTabWebView'>
                                  <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >  
                                          <Tab label="Your Profile" {...a11yProps(0)} />
                                          <Tab label="ORDER HISTORY" {...a11yProps(1)} />
                                          <Tab label="MANAGE ADDRESSES" {...a11yProps(2)} />
                                          {accountValidation() && <Tab label="ACCOUNT" {...a11yProps(3)} />}
                                          <Tab label="CHANGE PASSWORD" {...a11yProps(accountValidation() ? 4 : 3)} />
                                          {loginUSerDeatil?.IsPLWOn && <Tab label="PLM" {...a11yProps(1)} />}
                                          <Tab label="Log Out" onClick={handleLogout} />
                                      </Tabs>
                                  </Box>
                              </div>
                              <div className='hoqAccountTabMobileView YourAccountPageTabs'>
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

                <CustomTabPanel value={value} index={0}>
                  <div>
                    <YourProfile />
                  </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                  <div>
                    {/* <OrderHistory /> */}
                    {/* <OrderHistoryGroup /> */}
                    <NewOrderHistoryHOQ />
                  </div>
                </CustomTabPanel>
                <CustomTabPanel
                  value={value}
                  index={2}
                  className="manageAddressSec"
                >
                  <ManageAddress />
                </CustomTabPanel>

                {accountValidation() && (
                  <CustomTabPanel
                    value={value}
                    index={3}
                    className="accountSalesPage"
                  >
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value1}
                        className="accountTabSection"
                        variant="scrollable"
                        onChange={handleChangeSub}
                        aria-label="basic tabs example"
                        sx={{ background: "#7d7f8529", ...tabIndicator }}
                        scrollButtons="auto"
                      >
                        {accountInner?.map((e, i) => {
                          return (
                            <Tab
                              label={e?.tabLabel}
                              {...a11yProps(i)}
                              sx={{ color: "#7d7f85" }}
                              key={i}
                            />
                          );
                        })}
                      </Tabs>
                    </Box>
                    {accountInner?.map((e, i) => { return ( <React.Fragment key={i}> 
                          {e?.id === 1163 && ( <CustomTabPanel value={value1} index={i} className="AcountSales" > <QuotationQuote /> </CustomTabPanel> )} 
                          {e?.id === 1164 && ( <CustomTabPanel value={value1} index={i} className="quotationFilters" > <QuotationJob /> </CustomTabPanel> )}
                          {e?.id === 1157 && ( <CustomTabPanel value={value1} index={i} className="salesPage" > <Sales /> </CustomTabPanel> )}
                          {e?.id === 1314 && ( <CustomTabPanel value={value1} index={i} className="salesReport" > <SalesReport /> </CustomTabPanel> )}
                          {e?.id === 18129 && <CustomTabPanel value={value1} index={i}> <PendingMemo /> </CustomTabPanel>}
                          {e?.id === 17020 && ( <CustomTabPanel value={value1} index={i} className="DesignWiseSalesReport" > <DesignWiseSalesReport /> </CustomTabPanel> )}
                          {e?.id === 1159 && ( <CustomTabPanel value={value1} index={i}> <AccountLedger /> </CustomTabPanel> )} {/* {e?.id === 1314 && <CustomTabPanel value={value1} index={i}>
                                                  <PendingMemo />
                                              </CustomTabPanel>} */}
                        </React.Fragment>
                      );
                    })}
                  </CustomTabPanel>
                )}

                <CustomTabPanel value={value} index={accountValidation() ? 4 : 3}>
                  <div>
                    <ChangePassword />
                  </div>
                </CustomTabPanel>
                {/* { loginUSerDeatil?.IsPLWOn && <CustomTabPanel value={value} index={5}> */}
                {<CustomTabPanel value={value} index={5}>
                  <div>
                    <Plm />
                  </div>
                </CustomTabPanel>}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//account mobile view icons
// import AccountBoxIcon from '@mui/icons-material/AccountBox'; - Your Profile
// import ListAltIcon from '@mui/icons-material/ListAlt'; - Order History
// import HomeIcon from '@mui/icons-material/Home'; - Manage Address
// import LockResetIcon from '@mui/icons-material/LockReset'; - change password
// import SummarizeIcon from '@mui/icons-material/Summarize'; -  Accounts
// import ShieldIcon from '@mui/icons-material/Shield'; - PLW
