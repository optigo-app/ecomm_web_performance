import React, { useEffect, useState } from 'react'
import './Menu.modul.scss'
import { IoClose } from 'react-icons/io5';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { Box, ButtonBase, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import SwipeableViews from 'react-swipeable-views';
import { toast } from 'react-toastify';
import { PC_ApploginState } from '../../Recoil/atom';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import Cookies from 'js-cookie';

const Menu = () => {

    const navigation = useNavigate();
    const [islogin, setislogin] = useRecoilState(PC_ApploginState);
    const [isB2bFlag, setIsB2BFlaf] = useState('');
    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
        setIsB2BFlaf(storeinit?.IsB2BWebsite);
        if (storeinit?.IsB2BWebsite === 0) {
            getMenuApi();
            return;
        } else if (storeinit?.IsB2BWebsite === 1 && isUserLogin === true) {
            getMenuApi();
            return;
        } else {
            return;
        }
    }, [islogin]);

    const getMenuApi = async () => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        await GetMenuAPI(finalID).then((response) => {
            setMenuData(response?.Data?.rd)
        }).catch((err) => console.log(err))
    }



    useEffect(() => {
        const uniqueMenuIds = [...new Set(menuData?.map(item => item?.menuid))];
        const uniqueMenuItems = uniqueMenuIds.map(menuid => {
            const item = menuData?.find(data => data?.menuid === menuid);
            const param1DataIds = [...new Set(menuData?.filter(data => data?.menuid === menuid)?.map(item => item?.param1dataid))];

            const param1Items = param1DataIds.map(param1dataid => {
                const param1Item = menuData?.find(data => data?.menuid === menuid && data?.param1dataid === param1dataid);
                const param2Items = menuData?.filter(data => data?.menuid === menuid && data?.param1dataid === param1dataid)?.map(item => ({
                    param2dataid: item?.param2dataid,
                    param2dataname: item?.param2dataname,
                    param2id: item?.param2id,
                    param2name: item?.param2name
                }));
                return {
                    menuname: param1Item?.menuname,
                    param1dataid: param1Item?.param1dataid,
                    param1dataname: param1Item?.param1dataname,
                    param1id: param1Item?.param1id,
                    param1name: param1Item?.param1name,
                    param2: param2Items
                };
            });

            return {
                menuid: item?.menuid,
                menuname: item?.menuname,
                param0dataid: item?.param0dataid,
                param0dataname: item?.param0dataname,
                param0id: item?.param0id,
                param0name: item?.param0name,
                param1: param1Items
            };
        });

        setMenuItems(uniqueMenuItems);
        handleLoginMenuClickSwipe(uniqueMenuItems[0]?.menuname, null, "iconclicked")
    }, [menuData]);



    const [selectedMenu, setSelectedMenu] = useState(menuItems[0]?.menuname);
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
        handleLoginMenuClickSwipe(menuItems[index]?.menuname, null, "iconclicked")
    };

    const handleLoginMenuClickSwipe = (menuName, menuItem, iconclicked) => {

        if (iconclicked == 'iconclicked') {
            setSelectedMenu(prevMenu => (prevMenu === menuName ? menuName : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
    };

    const handleLoginMenuClickMainMenu = (menuName, menuItem, iconclicked) => {

        if (iconclicked == 'iconclicked') {
            setSelectedMenu(prevMenu => (prevMenu === menuName ? menuName : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
    };

    const handelMenu = (param, param1, param2) => {
        let finalData = {
            "menuname": param?.menuname ?? "",
            "FilterKey": param?.key ?? "",
            "FilterVal": param?.value ?? "",
            "FilterKey1": param1?.key ?? "",
            "FilterVal1": param1?.value ?? "",
            "FilterKey2": param2?.key ?? "",
            "FilterVal2": param2?.value ?? ""
        }
        sessionStorage.setItem("menuparams", JSON.stringify(finalData))

        const queryParameters1 = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join('/');

        const queryParameters = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join(',');

        const otherparamUrl = Object.entries({
            b: finalData?.FilterKey,
            g: finalData?.FilterKey1,
            c: finalData?.FilterKey2,
        })
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => value)
            .filter(Boolean)
            .join(',');

        const paginationParam = [
            `page=${finalData.page ?? 1}`,
            `size=${finalData.size ?? 50}`
        ].join('&');

        console.log('otherparamsUrl--', otherparamUrl);
        let menuEncoded = `${queryParameters}/${otherparamUrl}`;
        // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
        const url = `/p/${queryParameters1}/?M=${btoa(menuEncoded)}`;

        // let d = new Date();
        // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
        navigation(url)
    }

    return (
        <div className='PC_AppmenuPageMain'>

            {isB2bFlag == 1 ?
                islogin == false ?
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '200px' }}>
                        <p style={{ margin: '0px', fontWeight: 500 }}>No Data Available</p>
                        <button style={{
                            height: '35px',
                            width: '150px',
                            backgroundColor: 'rgb(214 176 139)',
                            border: 'none',
                            outline: 'none',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 500,
                            borderRadius: '5px',
                            marginTop: '5px'
                        }} onClick={() => navigation('/signin')}>Login</button>
                    </div>
                    :
                    <TabContext value={value}>
                        <div className='tabMainMenu'>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                centered
                                variant='scrollable'
                                className='tabMainSmilingMobile'
                            >
                                {menuItems.map((item, index) => (
                                    <Tab label={item.menuname} style={{fontSize: '16px'}} onClick={() => handleLoginMenuClickMainMenu(item.menuname, null, "iconclicked")} />
                                ))}
                            </Tabs>
                        </div>
                        



                        <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                        enableMouseEvents
                        animateTransitions
                        className='PC_AppmenuMainSwipe'
                    >
                        {menuItems.map(menuItem => (
                            <TabPanel value={value} index={0} style={{ margin: '20px 10% 20px 10%', padding: '0px' }}>
                                {selectedMenu === menuItem.menuname && (
                                    <>
                                        <ButtonBase
                                            component="div"
                                            onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname })}
                                            style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                        >
                                            <div style={{ paddingLeft: '10px', fontSize: '15px', marginTop: '5px' }}>
                                                <button class="PC_AppmenuVieAllLink">View All</button>
                                            </div>
                                        </ButtonBase>
                                        <List>
                                            {menuItem.param1.map(subMenuItem => (
                                                <div key={subMenuItem.param1dataid}>
                                                    <ButtonBase
                                                        component="div"
                                                        onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname })}
                                                        style={{ width: '100%' }}
                                                    >
                                                        <p className='PC_AppmenuMainTitle' style={{ margin: '0px 0px 0px 15px',fontSize: '18px', width: '100%', fontWeight: 600, height: '38px', display: 'flex', alignItems: 'center' }}>{subMenuItem.param1dataname}</p>
                                                    </ButtonBase>
                                                    {selectedMenu === menuItem.menuname && (
                                                        <>
                                                            <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                                {subMenuItem.param2.map(subSubMenuItem => (
                                                                    <ButtonBase
                                                                        component="div"
                                                                        onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname }, { "key": subSubMenuItem.param2name, "value": subSubMenuItem.param2dataname })}
                                                                        style={{ width: '100%', height: '30px' }}
                                                                    >
                                                                        <p className="PC_AppSuMenuTitle">
                                                                            {subSubMenuItem.param2dataname}
                                                                        </p>
                                                                    </ButtonBase>
                                                                ))}
                                                            </List>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </TabPanel>
                        ))}
                        {/* <TabPanel value={value} index={1} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel>
                    <TabPanel value={value} index={2} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel> */}
                    </SwipeableViews>
                    </TabContext>
                :
                <TabContext value={value}>
                    <div className='tabMainMenu'>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            centered
                            variant='scrollable'
                            className='tabMainSmilingMobile'
                        >
                            {menuItems.map((item, index) => (
                                <Tab label={item.menuname} onClick={() => handleLoginMenuClickMainMenu(item.menuname, null, "iconclicked")} />
                            ))}
                        </Tabs>
                    </div>



                    <SwipeableViews
                        index={value}
                        onChangeIndex={handleChangeIndex}
                        enableMouseEvents
                        animateTransitions
                        className='PC_AppmenuMainSwipe'
                    >
                        {menuItems.map(menuItem => (
                            <TabPanel value={value} index={0} style={{ marginInline: value == 0 ? '' : '15%', padding: '0px', marginBottom: '20px' }}>
                                {selectedMenu === menuItem.menuname && (
                                    <>
                                        <ButtonBase
                                            component="div"
                                            onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname })}
                                            style={{ width: '100%', display: 'flex', justifyContent: 'start' }}
                                        >
                                            <div style={{ paddingLeft: '10px', fontSize: '15px', marginTop: '5px' }}>
                                                <button class="PC_AppmenuVieAllLink">View All</button>
                                            </div>
                                        </ButtonBase>
                                        <List>
                                            {menuItem.param1.map(subMenuItem => (
                                                <div key={subMenuItem.param1dataid}>
                                                    <ButtonBase
                                                        component="div"
                                                        onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname })}
                                                        style={{ width: '100%' }}
                                                    >
                                                        <p className='PC_AppmenuMainTitle' style={{ margin: '0px 0px 0px 15px',fontSize: '18px', width: '100%', fontWeight: 600, height: '38px', display: 'flex', alignItems: 'center' }}>{subMenuItem.param1dataname}</p>
                                                    </ButtonBase>
                                                    {selectedMenu === menuItem.menuname && (
                                                        <>
                                                            <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                                {subMenuItem.param2.map(subSubMenuItem => (
                                                                    <ButtonBase
                                                                        component="div"
                                                                        onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname }, { "key": subSubMenuItem.param2name, "value": subSubMenuItem.param2dataname })}
                                                                        style={{ width: '100%', height: '30px' }}
                                                                    >
                                                                        <p className="PC_AppSuMenuTitle">
                                                                            {subSubMenuItem.param2dataname}
                                                                        </p>
                                                                    </ButtonBase>
                                                                ))}
                                                            </List>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </TabPanel>
                        ))}
                        {/* <TabPanel value={value} index={1} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel>
                    <TabPanel value={value} index={2} style={{ marginInline: '15%', padding: '0px' }}>


                    </TabPanel> */}
                    </SwipeableViews>
                </TabContext>
            }

        </div>
    )
}

export default Menu