import React, { useEffect, useState } from 'react'
import './MenuBar.modul.scss'
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { el_CartCount, el_WishCount, el_companyLogo, el_companyLogoM, el_loginState } from '../../../Recoil/atom';
import { Link, useNavigate } from 'react-router-dom';
import { GetMenuAPI } from '../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { IoCaretDownSharp, IoPersonOutline } from 'react-icons/io5';
import { Badge, Tooltip } from '@mui/material';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { GoHeart } from 'react-icons/go';
import { GetCountAPI } from '../../../../../../utils/API/GetCount/GetCountAPI';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

const Menubar = () => {
    const [lodingLogo, setLodingLogo] = useState(true);
    const [storeinit, setStoreInit] = useState();
    const navigation = useNavigate();
    const [islogin, setislogin] = useRecoilState(el_loginState);
    const [toggle, setToggle] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);

    const compnyLogo = useRecoilValue(el_companyLogo);
    const compnyLogoM = useRecoilValue(el_companyLogoM);

    const handleToggle = () => {
        setToggle(!toggle);
    }
    const handleMenuToggle = (index) => {
        setMenuToggle(menuToggle === index ? null : index);
    }

    useEffect(() => {
        const value = JSON.parse(sessionStorage.getItem('LoginUser'));
        setislogin(value);
        const storeData = JSON.parse(sessionStorage.getItem('storeInit'));
        setStoreInit(storeData)
        setTimeout(() => {
            setLodingLogo(false);
        }, 100);
    }, []);


    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [isIconOpen, setIsIconOpen] = useState(false);

    // const setCartCount = useRecoilState(el_CartCount);
    const [wishCount, setWishCount] = useRecoilState(el_WishCount);
    const [cartCount, setCartCount] = useRecoilState(el_CartCount);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visiterID = Cookies.get('visiterId');
                const res = await GetCountAPI(visiterID);

                setCartCount(res?.cartcount);
                setWishCount(res?.wishcount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleToogle = (index) => {
        setIsOpen(isOpen === index ? null : index);
    }

    const handleIcon = (i) => {
        setIsIconOpen(isIconOpen === i ? null : i);
    }

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
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
    }, [menuData]);

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
        // const url = `/p/${queryParameters1}/?M=${btoa(menuEncoded)}`;
        const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;

        // let d = new Date();
        // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
        navigation(url)
    }

    const getMenuApi = async () => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId')
        let finalId;
        if (IsB2BWebsite === 0) {
            finalId = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        }
        else {
            finalId = loginUserDetail?.id || '0'
        }

        await GetMenuAPI(finalId).then((response) => {
            setMenuData(response?.Data?.rd)
        }).catch((err) => console.log(err))
    }

    const handleMenuClick = async (menuItem, param1Item = null, param2Item = null) => {
        const { param1, param2, ...cleanedMenuItem } = menuItem;

        let menuDataObj = { ...cleanedMenuItem };

        if (param1Item) {
            const { param1, param2, ...cleanedParam1Item } = param1Item;
            menuDataObj = { ...menuDataObj, ...cleanedParam1Item };

            if (param2Item) {
                menuDataObj = { ...menuDataObj, ...param2Item };
            }
        } else {
            console.log('Menu Item:', cleanedMenuItem);
        }
    };


    const handleMouseEnter = (index, param) => {
        setHoveredIndex(index);
        setExpandedMenu(index);
        setSelectedData(menuItems[index] || []);
        document.body.style.overflow = 'hidden';

    };
    const handleMouseLeave = (index) => {
        setExpandedMenu(null);
        setHoveredIndex(null);
        document.body.style.overflow = 'auto';
    };

    function ScrollToView(param) {
        if (navigation("/")) {
            sessionStorage.setItem("scrollParam", param);
            navigation('/')
            setToggle(false)
            return;
        }
        const element = document?.getElementById(param);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
            setToggle(false)
        }
        setToggle(false)
    }

    return (
        <>
            <div className="el_display_background">
                {toggle ? (
                    <>
                        {islogin ? (
                            <>
                                <div className="el_login_header_menu_main">
                                    <div className='elv_login_header_menu_div'>
                                        <div>
                                            <CloseIcon onClick={handleToggle} className='elv_login_header_menu_close_btn' />
                                        </div>
                                        {/* <div className="el_login_header_menu_main_div1">
                                            <a href="/" onClick={() => { handleToggle() }} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '25px' }}>
                                                {compnyLogo && <img src={compnyLogo} alt="Title" className="el_login_header_menu_main_div1_logo" />}
                                            </a>
                                        </div> */}

                                        <ul className="el_login_header_menu_main_div2">
                                            <>
                                                <Badge
                                                    badgeContent={wishCount}
                                                    max={1000}
                                                    overlap={"rectangular"}
                                                    color="secondary"
                                                    className='el_login_header_menu_main_div2_li'
                                                >
                                                    <Tooltip title="WishList">
                                                        <li
                                                            onClick={() => {
                                                                handleToggle();
                                                                navigation("/myWishList");
                                                            }}
                                                            style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} >
                                                            <GoHeart className='elv_heart_menu_icon' />
                                                        </li>
                                                    </Tooltip>
                                                </Badge></>
                                            <Badge
                                                badgeContent={cartCount}
                                                max={1000}
                                                overlap={"rectangular"}
                                                color="secondary"
                                                className="el_login_header_main_div2_li"
                                            >
                                                <Tooltip title="Cart">
                                                    <li
                                                        onClick={() => {
                                                            handleToggle();
                                                            navigation("/cartPage");
                                                        }}
                                                        style={{
                                                            cursor: "pointer",
                                                            marginTop: "0px",
                                                        }}
                                                    >
                                                        <HiOutlineShoppingBag
                                                            className="elv_shopping_icon"
                                                            color="#7D7F85"
                                                            fontSize="25px"
                                                        />
                                                    </li>
                                                </Tooltip>
                                            </Badge>
                                        </ul>
                                    </div>
                                    <div className='elv_login_header_menu_lists_div'>
                                        <ul className="el_login_header_menu_main_div1_ul">
                                            {storeinit?.IsDesignSetInMenu == 1 && (
                                                <li
                                                    className="el_Login_header_li go-lookbook"
                                                    style={{
                                                        marginLeft: "33px",
                                                        marginBottom: '20px',
                                                        cursor: "pointer",
                                                        textDecoration: "none",
                                                        position: "relative",
                                                        color: "inherit"
                                                    }}
                                                    onClick={() => {
                                                        handleToggle();
                                                        navigation("Lookbook");
                                                    }}
                                                >
                                                    <small
                                                        style={{
                                                            backgroundColor: "#9C27B0",
                                                            position: "absolute",
                                                            marginTop: "-30px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            height: "15px",
                                                            borderRadius: "",
                                                            padding: "0 5px",
                                                            fontSize: "10px",
                                                            borderRadius: " 3px",
                                                            marginLeft: "-10px",
                                                            color: 'white'
                                                        }}
                                                    >
                                                        New
                                                    </small>
                                                    {storeinit?.DesignSetInMenu}
                                                </li>
                                            )}
                                            {menuItems.map((item, index) => {
                                                return (
                                                    <li
                                                        className="el_login_header_menu_li"
                                                        style={{ textDecoration: hoveredIndex === index ? 'underline' : 'none' }}
                                                        key={index}
                                                        label={item.menuname}
                                                        onClick={(e) => {
                                                            handleMouseEnter(index, item);
                                                            handleMenuClick(item);
                                                            handleMouseLeave(index);
                                                            handleToogle(index);
                                                            handleIcon(index);
                                                        }}
                                                    >
                                                        <div className='elv_login_header_menu_menunames'>
                                                            <div className='elv_menubar_menu_div'>
                                                                <span className='elv_login_header_menu_names' onClick={() => {
                                                                    handleToggle();
                                                                    handelMenu({
                                                                        menuname: item?.menuname,
                                                                        key: item?.param0name,
                                                                        value: item?.param0dataname,
                                                                    });
                                                                }}>{item.menuname}</span>
                                                                {isIconOpen === index ? (
                                                                    <MdKeyboardArrowUp />
                                                                ) :
                                                                    <MdKeyboardArrowDown />
                                                                }

                                                            </div>
                                                            <div>
                                                                <div
                                                                    style={{
                                                                        padding: "6px",
                                                                        color: "#7d7f85",
                                                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                                        gap: "50px",
                                                                        marginBottom: '25px'
                                                                    }}
                                                                    className="menuDropdownData"
                                                                >
                                                                    <hr className='elv_login_header_menu_hr' />
                                                                    {(item?.menuid === selectedData?.menuid) && isOpen ? (
                                                                        <>
                                                                            {/* <div style={{ background: '#F1F2F3', padding: '5px', marginRight: '8px', marginTop: '5px' }}> */}
                                                                            <div style={{ padding: '5px', marginRight: '8px', marginTop: '10px' }}>
                                                                                <div style={{ width: '95%', textTransform: 'uppercase' }}>
                                                                                    {selectedData?.param1?.map((param1Item, param1Index) => (
                                                                                        <div key={param1Index}>
                                                                                            <span
                                                                                                onClick={() => {
                                                                                                    handleToggle();
                                                                                                    navigation(`/p/${selectedData?.param0dataname}/${param1Item.param1dataname}/?M=${btoa(`${selectedData?.param0dataname},${param1Item?.param1dataname}/${selectedData?.param0name},${param1Item?.param1name}`)}`);
                                                                                                }}
                                                                                                className="level1MenuData" key={param1Index} style={{ fontSize: '16px', textDecoration: 'underline', marginBottom: '10px', fontFamily: 'sans-serif', color: 'black', textAlign: 'start', letterSpacing: 1, fontWeight: 500, cursor: 'pointer' }} >
                                                                                                <span className='elv_param1'>{param1Item?.param1dataname}</span>
                                                                                            </span>
                                                                                            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', marginLeft: '15px' }}>
                                                                                                {param1Item?.param2?.map((param2Item, param2Index) => (
                                                                                                    <p className="level2menuData" key={param2Index} onClick={() =>
                                                                                                        handelMenu({ "menuname": selectedData?.menuname, "key": selectedData?.param0name, "value": selectedData?.param0dataname }, { "key": param1Item?.param1name, "value": param1Item?.param1dataname }, { "key": param2Item?.param2name, "value": param2Item?.param2dataname })
                                                                                                    } style={{ fontSize: '15px', margin: '3px 15px 3px 0px', fontFamily: 'sans-serif', letterSpacing: 0.4, textAlign: 'start', cursor: 'pointer', textTransform: 'capitalize', paddingRight: '15px' }}>
                                                                                                        <span
                                                                                                            onClick={() => {
                                                                                                                handleToggle();
                                                                                                                navigation(`/p/${selectedData?.param0dataname}/${param1Item.param1dataname}/${param2Item.param2dataname}/?M=${btoa(`${selectedData?.param0dataname},${param1Item.param1dataname},${param2Item.param2dataname}/${selectedData?.param0name},${param1Item.param1name},${param2Item.param2name}`)}`);
                                                                                                            }}
                                                                                                            className='elv_param2'> {param2Item?.param2dataname}</span>
                                                                                                    </p>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>

                                                        </div>
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                    </div>

                                    <div className={`el_shop_dropdown ${expandedMenu !== null ? "open" : ""}`} onClick={() => handleMouseEnter(hoveredIndex)} onMouseLeave={handleMouseLeave}>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="el_login_header_menu_main_side">
                                    <div className='elv_login_header_menu_div'>
                                        <div>
                                            <CloseIcon onClick={handleToggle} className='elv_login_header_menu_close_btn' />
                                        </div>
                                        <div className="el_login_header_menu_main_div1">
                                            <a href="/" onClick={() => { handleToggle() }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {compnyLogo && <img src={compnyLogo} alt="Title" className="el_login_header_menu_main_div1_logo_side" />}
                                            </a>
                                        </div>
                                        <div className="el_login_header_menu_main_div2">
                                            <div className="el_whioutL_headerDiv3_sub2">
                                                <p
                                                    style={{
                                                        fontSize: "14px",
                                                        textTransform: "capitalize",
                                                        margin: "0px 20px 0px 0px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        navigation("/LoginOption");
                                                        setToggle(false);
                                                    }}
                                                >
                                                    Log In
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='elv_menu_without_login_div'>
                                        <ul className="el_withoutL_ul_Main_side">
                                            <div className="el_whioutL_headerDiv1_side">
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => ScrollToView("brandsComponentID")}
                                                >
                                                    Our Brands
                                                </li>
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => ScrollToView("elveeGiftMainId")}
                                                >
                                                    Product
                                                </li>
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => ScrollToView("craftmenshipId")}
                                                >
                                                    Our Craftsmanship
                                                </li>
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => ScrollToView("mainGalleryConatinerID")}
                                                >
                                                    Gallery
                                                </li>
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => ScrollToView("mainSocialMediaConatinerID")}
                                                >
                                                    Social Media
                                                </li>
                                                <li
                                                    className="el_whioutL_li_side"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => { navigation("/contact-us"); setToggle(false) }}
                                                >
                                                    Contact
                                                </li>
                                            </div>
                                        </ul >
                                    </div>
                                </div>
                            </>
                        )}

                    </>
                ) : (
                    <MenuIcon className='elv_Menu_size' onClick={handleToggle} />
                )
                }

            </div >
        </>
    )
}

export default Menubar