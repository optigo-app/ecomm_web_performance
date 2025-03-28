import React, { useState, useEffect, useRef, useCallback } from 'react'
import './HomePageBlock1.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../../../Assets/logo.png';
import { CiHeart } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { RxPerson } from "react-icons/rx";
import { IoBagOutline, IoClose, IoSearchOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import colorPicker from '../../../../Assets/color-picker.svg';
import { IoIosMenu } from "react-icons/io";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import gradientColors from '../../LookBook/color.json';
import {
    Container,
    Divider,
    IconButton,
    Link,
    Stack,
    useTheme,
    useMediaQuery,
    Drawer,
    Badge,
    Tooltip,
    List,
    ButtonBase,
    ListItem,
    Skeleton,
} from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"
import PinterestIcon from "@mui/icons-material/Pinterest"
import { motion, AnimatePresence } from 'framer-motion';
import { formatRedirectTitleLine, formatter, formatTitleLine, getDomainName, storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetMenuAPI } from '../../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import imageNotFound from '../../../../Assets/image-not-found.jpg';
import { cartB2CDrawer, CartCount, homeLoading, MetalColor_Image, smr_companyLogo, smr_companyLogoM, smr_loginState, WishCount } from '../../../../Recoil/atom';
import Marquee from "react-fast-marquee";
import Cookies from "js-cookie";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import { Box, Button, Card, CardContent, CardMedia, Grid, ImageList, ImageListItem, Paper, styled, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import Pako from 'pako';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';

const HomePageBlock1 = () => {

    const [drawerShowOverlay, setDrawerShowOverlay] = useState(false);
    const toggleDrawerOverlay = () => {
        setDrawerShowOverlay(!drawerShowOverlay);
    };
    return (
        <div className="smr1_HomePage_main_div">
            <TopSectionOffers />
            <TopSectionHeader toggleDrawerOverlay={toggleDrawerOverlay} />
            <TopSectionMenu drawerShowOverlay={drawerShowOverlay} setDrawerShowOverlay={setDrawerShowOverlay} toggleDrawerOverlay={toggleDrawerOverlay} />
            <HeroSectionSlider />
            <AlbumSection />
            <NewArrival />
            <EcatDesignSet />
            <HotSellingProducts />
            <BrandComponent />
            <Footer />
        </div>
    );
}

export default HomePageBlock1;

const TopSectionOffers = () => {
    return (
        <div className="smr1_TopSection_offers_div">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide>
                    <span className="smr1_Topsection_offers_span">FREE IN-STORE PICKUP Within 2 hours.</span>
                </SwiperSlide>
                <SwiperSlide>
                    <span className="smr1_Topsection_offers_span">FREE SHIPPING on orders $95+</span>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

const TopSectionHeader = ({ toggleDrawerOverlay }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const [isMobile, setIsMobile] = useState(false); // State to check mobile width
    const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open/close state

    // Check if the screen width is smaller than or equal to 1200px
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1200); // Set isMobile to true if screen width <= 1200px
        };

        handleResize(); // Check the initial size
        window.addEventListener('resize', handleResize); // Update on resize

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="smr1_Topsection_Header_div">
            <div className="smr1_Topsection_header_logo_div">
                <img src={logo} alt="logo" />
            </div>
            {isMobile ? (
                <div className="smr1_Topsection_header_mobile">
                    {/* Hamburger Icon */}
                    <IoIosMenu
                        size={30}
                        color="#4a4a4a"
                        className="hamburger-icon"
                        onClick={toggleDrawerOverlay}
                    />
                </div>
            ) : (
                <div className="smr1_Topsection_header_cart_div">
                    <div className="smr1_Topsection_search_div">
                        <input
                            type="text"
                            placeholder='Search'
                            className='smr_Topsection_search_input'
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        {searchText ? (
                            <RxCross1 size={28} className='smr_Topsection_search_icon' onClick={handleClearSearch} />
                        ) : (
                            <CiSearch size={28} className='smr_Topsection_search_icon' />
                        )}
                    </div>
                    <div className="smr1_Topsection_wishCart_div">
                        <div className="smr1_Topsection_wish_div">
                            <CiHeart size={30} color='#4a4a4a' />
                        </div>
                        {/* <div className="smr1_Topsection_location_div">
                            <SlLocationPin size={22} color='#4a4a4a' />
                        </div> */}
                        <div className="smr1_Topsection_profile_div">
                            <RxPerson size={25} color='#4a4a4a' />
                        </div>
                        <div className="smr1_Topsection_cart_div">
                            <IoBagOutline size={25} color='#4a4a4a' />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const TopSectionMenu = ({ drawerShowOverlay, setDrawerShowOverlay, toggleDrawerOverlay }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [islogin, setislogin] = useRecoilState(smr_loginState);
    const divRef = useRef(null);
    const navigate = useNavigate();
    const compnyLogo = useRecoilValue(smr_companyLogo);
    const compnyLogoM = useRecoilValue(smr_companyLogoM);
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
    const IsCartNo = storeinit?.CartNo;
    const [isCartOpen, setIsCartOpen] = useState(false);
    const setCartOpenState = useSetRecoilState(cartB2CDrawer);
    const [searchText, setSearchText] = useState("");
    const [serachsShowOverlay, setSerachShowOverlay] = useState(false);

    const handleLogout = () => {
        navigate("/");
        setislogin(false);
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
        sessionStorage.clear();
    };
    const searchDataFucn = (e) => {
        if (e.key === "Enter") {
            if (searchText) {
                let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
                let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
                let obj = {
                    a: "",
                    b: searchText,
                    m: loginInfo?.MetalId ?? storeInit?.MetalId,
                    d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
                    c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
                    f: {},
                };

                let encodeObj = btoa(JSON.stringify(obj));
                navigate(`/p/${searchText}?S=${encodeObj}`);
                toggleOverlay();
                setSearchText("");
                setSerachShowOverlay(false);
                setDrawerShowOverlay(false);
            }
        }
    };

    const clickSearch = () => {
        if (searchText) {
            let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
            let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
            let obj = {
                a: "",
                b: searchText,
                m: loginInfo?.MetalId ?? storeInit?.MetalId,
                d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
                c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
                f: {},
            };

            let encodeObj = btoa(JSON.stringify(obj));
            setDrawerShowOverlay(false);
            navigate(`/p/${searchText}?S=${encodeObj}`);
            setSearchText("");
            setSerachShowOverlay(false);
        }
    };

    const [cartCountNum, setCartCountNum] = useRecoilState(CartCount);
    const [wishCountNum, setWishCountNum] = useRecoilState(WishCount);

    useEffect(() => {
        const visiterID = Cookies.get("visiterId");
        GetCountAPI(visiterID)
            .then((res) => {
                if (res) {
                    setCartCountNum(res?.cartcount);
                    setWishCountNum(res?.wishcount);
                }
            })
            .catch((err) => {
                if (err) {
                    console.log("getCountApiErr", err);
                }
            });
    }, []);


    const toggleOverlay = () => {
        // setSearchText('');
        setSerachShowOverlay(!serachsShowOverlay);
    };

    const toggleCartDrawer = () => {
        setIsCartOpen((prevState) => !prevState);
        const isCartDrawerOpen = JSON.parse(sessionStorage.getItem("isCartDrawer"));
        sessionStorage.setItem("isCartDrawer", !isCartDrawerOpen);
        setCartOpenState((prevState) => !prevState);
    };

    //mobileMenu.................
    const [selectedMenu, setSelectedMenu] = useState(null);
    const handleMenuClick = async (
        menuItem,
        param1Item = null,
        param2Item = null
    ) => {
        const { param1, param2, ...cleanedMenuItem } = menuItem;
        let menuDataObj = { ...cleanedMenuItem };

        if (param1Item) {
            const { param1, param2, ...cleanedParam1Item } = param1Item;
            menuDataObj = { ...menuDataObj, ...cleanedParam1Item };
            if (param2Item) {
                menuDataObj = { ...menuDataObj, ...param2Item };
            }
        } else {
            // console.log("Menu Item:", cleanedMenuItem);
        }
        let finalData = {
            menuname: menuDataObj?.menuname ?? "",
            FilterKey: menuDataObj.param0name ?? "",
            FilterVal: menuDataObj.param0dataname ?? "",
            FilterKey1: menuDataObj?.param1name ?? "",
            FilterVal1: menuDataObj?.param1dataname ?? "",
            FilterKey2: menuDataObj?.param2name ?? "",
            FilterVal2: menuDataObj?.param2dataname ?? "",
        };
        navigate(`/productpage`, {
            state: { menuFlag: finalData?.menuname, filtervalue: finalData },
        });
        sessionStorage.setItem("menuparams", JSON.stringify(finalData));
    };

    const handleLoginMenuClick = (menuName, menuItem, iconclicked) => {
        if (iconclicked == "iconclicked") {
            setSelectedMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
            return;
        }
        const { param1, ...menuItemWithoutParam1 } = menuItem;
        handleMenuClick(menuItemWithoutParam1);
    };

    const getMenuApi = async () => {
        const loginUserDetail = JSON.parse(
            sessionStorage.getItem("loginUserDetail")
        );
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get("visiterId");
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
        } else {
            finalID = loginUserDetail?.id || "0";
        }

        await GetMenuAPI(finalID)
            .then((response) => {
                setMenuData(response?.Data?.rd);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
        if (
            storeinit?.IsB2BWebsite === 0 ||
            (storeinit?.IsB2BWebsite === 1 && isUserLogin === true)
        ) {
            getMenuApi();
        }
    }, [islogin]);

    useEffect(() => {
        const uniqueMenuIds = [...new Set(menuData?.map((item) => item?.menuid))];
        const uniqueMenuItems = uniqueMenuIds.map((menuid) => {
            const item = menuData?.find((data) => data?.menuid === menuid);
            const param1DataIds = [
                ...new Set(
                    menuData
                        ?.filter((data) => data?.menuid === menuid)
                        ?.map((item) => item?.param1dataid)
                ),
            ];

            const param1Items = param1DataIds.map((param1dataid) => {
                const param1Item = menuData?.find(
                    (data) =>
                        data?.menuid === menuid && data?.param1dataid === param1dataid
                );
                const param2Items = menuData
                    ?.filter(
                        (data) =>
                            data?.menuid === menuid && data?.param1dataid === param1dataid
                    )
                    ?.map((item) => ({
                        param2dataid: item?.param2dataid,
                        param2dataname: item?.param2dataname,
                        param2id: item?.param2id,
                        param2name: item?.param2name,
                    }));
                return {
                    menuname: param1Item?.menuname,
                    param1dataid: param1Item?.param1dataid,
                    param1dataname: param1Item?.param1dataname,
                    param1id: param1Item?.param1id,
                    param1name: param1Item?.param1name,
                    param2: param2Items,
                };
            });

            return {
                menuid: item?.menuid,
                menuname: item?.menuname,
                param0dataid: item?.param0dataid,
                param0dataname: item?.param0dataname,
                param0id: item?.param0id,
                param0name: item?.param0name,
                param1: param1Items,
            };
        });

        setMenuItems(uniqueMenuItems);
    }, [menuData]);

    const handelMenu = (param, param1, param2, event) => {
        if (
            event?.ctrlKey || // Ctrl key
            event?.shiftKey || // Shift key
            event?.metaKey || // Meta key (Command key on macOS)
            (event?.button && event?.button === 1) // Middle mouse button
        ) {
            // Let the default behavior of the <a> tag handle the new tab opening
            return;
        } else {
            event?.preventDefault();
            let finalData = {
                menuname: param?.menuname ?? "",
                FilterKey: param?.key ?? "",
                FilterVal: param?.value ?? "",
                FilterKey1: param1?.key ?? "",
                FilterVal1: param1?.value ?? "",
                FilterKey2: param2?.key ?? "",
                FilterVal2: param2?.value ?? "",
            };
            sessionStorage.setItem("menuparams", JSON.stringify(finalData));

            const queryParameters1 = [
                finalData?.FilterKey && `${finalData.FilterVal}`,
                finalData?.FilterKey1 && `${finalData.FilterVal1}`,
                finalData?.FilterKey2 && `${finalData.FilterVal2}`,
            ]
                .filter(Boolean)
                .join("/");

            const queryParameters = [
                finalData?.FilterKey && `${finalData.FilterVal}`,
                finalData?.FilterKey1 && `${finalData.FilterVal1}`,
                finalData?.FilterKey2 && `${finalData.FilterVal2}`,
            ]
                // .filter(Boolean)
                .join(",");

            const otherparamUrl = Object.entries({
                b: finalData?.FilterKey,
                g: finalData?.FilterKey1,
                c: finalData?.FilterKey2,
            })
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => value)
                .filter(Boolean)
                .join(",");

            const paginationParam = [
                `page=${finalData.page ?? 1}`,
                `size=${finalData.size ?? 50}`,
            ].join("&");

            let menuEncoded = `${queryParameters}/${otherparamUrl}`;
            // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
            const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(
                menuEncoded
            )}`;
            navigate(url);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
    };


    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
        if (divRef.current) {
            divRef.current.scrollTo(0, 0);
        }
    };
    return (
        <>
            {/* Drawer component */}
            {drawerShowOverlay && (
                <>
                    <div className="srm1_MobileSiderBarMain">
                        <div
                            style={{
                                margin: "20px 10px 0px 10px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div className="smr_mobileHeader_top_div1">
                                <IoClose
                                    style={{
                                        height: "30px",
                                        width: "30px",
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                    onClick={toggleDrawerOverlay}
                                />
                            </div>
                            <div className="smr_mobileHeader_top_div2_web">
                                <a href="/">
                                    <img
                                        src={compnyLogo}
                                        loading="lazy"
                                        className="smr_logo_header"
                                    />
                                </a>
                            </div>

                            <div className="smr_mobileHeader_top_div2_mobile">
                                <a href="/">
                                    <img
                                        src={compnyLogoM}
                                        loading="lazy"
                                        className="smr_logo_header"
                                    />
                                </a>
                            </div>

                            <div className="smr_mobileHeader_top_div3">
                                {islogin && (
                                    <>
                                        <Badge
                                            badgeContent={cartCountNum}
                                            max={1000}
                                            overlap={"rectangular"}
                                            color="secondary"
                                            className="badgeColorFix"
                                            style={{ marginInline: "15px" }}
                                        >
                                            <Tooltip title="Cart">
                                                <li
                                                    onClick={
                                                        IsCartNo == 2
                                                            ? toggleCartDrawer
                                                            : () => navigate("/cartPage")
                                                    }
                                                    className="nav_li_smining_Icone"
                                                >
                                                    <ShoppingCartOutlinedIcon
                                                        sx={{ height: "30px", width: "30px" }}
                                                    />
                                                </li>
                                            </Tooltip>
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="smr_mobileMenuSubDivMain">
                            {islogin && (
                                <div
                                    style={{
                                        display: "flex",
                                        border: "1px solid white",
                                        alignItems: "center",
                                        marginBottom: "20px"
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchText}
                                        style={{
                                            width: "100%",
                                            borderBottom: "1px solid white",
                                            border: "none",
                                            outline: "none",
                                            backgroundColor: "transparent",
                                            fontWeight: 500,
                                            color: "white",
                                            fontSize: "17px",
                                            padding: "8px"
                                        }}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="mobileSideBarSearch"
                                        onKeyDown={searchDataFucn}
                                    />
                                    <IoSearchOutline
                                        onClick={() => clickSearch()}
                                        style={{
                                            color: 'white',
                                            height: '25px',
                                            cursor: 'pointer',
                                            width: '25px',
                                            marginInline: '5px',
                                            marginBottom: '4px',
                                        }}
                                    />
                                </div>
                            )}
                            <List
                                className="smr_ListMenuSiderMobile"
                                sx={{ paddingTop: "0", marginBottom: "0px", marginTop: "15px" }}
                            >
                                {menuItems.map((menuItem) => (
                                    <div key={menuItem.menuid}>
                                        <ButtonBase
                                            component="div"
                                            className="muilistMenutext"
                                            onClick={() =>
                                                handleLoginMenuClick(
                                                    menuItem.menuname,
                                                    null,
                                                    "iconclicked"
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <ListItem
                                                style={{
                                                    padding: "5px",
                                                    borderBottom: "1px solid white",
                                                }}
                                            >
                                                <p className="smr_menuStaicMobile">
                                                    {menuItem.menuname}
                                                </p>
                                            </ListItem>
                                        </ButtonBase>
                                        {selectedMenu === menuItem.menuname && (
                                            <>
                                                <ButtonBase
                                                    component="div"
                                                    onClick={() =>
                                                        handelMenu({
                                                            menuname: menuItem?.menuname,
                                                            key: menuItem?.param0name,
                                                            value: menuItem?.param0dataname,
                                                        })
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "start",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            paddingLeft: "10px",
                                                            fontSize: "15px",
                                                            marginTop: "5px",
                                                        }}
                                                    >
                                                        <button className="smr_mobile_viewAllBtn">
                                                            View All
                                                        </button>
                                                    </div>
                                                </ButtonBase>
                                                <List className="smr_mobileMenuScroll">
                                                    {menuItem.param1.map((subMenuItem) => (
                                                        <div key={subMenuItem.param1dataid}>
                                                            <ButtonBase
                                                                component="div"
                                                                onClick={() =>
                                                                    handelMenu(
                                                                        {
                                                                            menuname: menuItem?.menuname,
                                                                            key: menuItem?.param0name,
                                                                            value: menuItem?.param0dataname,
                                                                        },
                                                                        {
                                                                            key: subMenuItem.param1name,
                                                                            value: subMenuItem.param1dataname,
                                                                        }
                                                                    )
                                                                }
                                                                style={{ width: "100%" }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px 0px 0px 15px",
                                                                        width: "100%",
                                                                        fontWeight: "600",
                                                                        color: "white",
                                                                    }}
                                                                >
                                                                    {subMenuItem.param1dataname}
                                                                </p>
                                                            </ButtonBase>
                                                            {/* {selectedSubMenu === subMenuItem.param1dataname && ( */}
                                                            {selectedMenu === menuItem.menuname && (
                                                                <>
                                                                    {/* <div style={{ paddingLeft: '10px' }}>
                                    <button class="underline-button" onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)}>View All</button>
                                  </div> */}
                                                                    <List
                                                                        style={{
                                                                            paddingTop: "0px",
                                                                            paddingBottom: "0px",
                                                                        }}
                                                                    >
                                                                        {subMenuItem.param2.map(
                                                                            (subSubMenuItem) => (
                                                                                <ButtonBase
                                                                                    component="div"
                                                                                    onClick={() =>
                                                                                        handelMenu(
                                                                                            {
                                                                                                menuname: menuItem?.menuname,
                                                                                                key: menuItem?.param0name,
                                                                                                value: menuItem?.param0dataname,
                                                                                            },
                                                                                            {
                                                                                                key: subMenuItem.param1name,
                                                                                                value:
                                                                                                    subMenuItem.param1dataname,
                                                                                            },
                                                                                            {
                                                                                                key: subSubMenuItem.param2name,
                                                                                                value:
                                                                                                    subSubMenuItem.param2dataname,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    style={{
                                                                                        width: "100%",
                                                                                        display: "flex",
                                                                                        justifyContent: "start",
                                                                                    }}
                                                                                >
                                                                                    <p className="smr_mobile_subMenu">
                                                                                        {subSubMenuItem.param2dataname}
                                                                                    </p>
                                                                                </ButtonBase>
                                                                            )
                                                                        )}
                                                                    </List>
                                                                </>
                                                            )}
                                                        </div>
                                                    ))}
                                                </List>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </List>
                        </div>
                        <div>
                            <p
                                className="smr_menuStaicMobilePage"
                                onClick={() => {
                                    setDrawerShowOverlay(false);
                                    navigate("/aboutUs");
                                }}
                            >
                                About us
                            </p>
                        </div>
                        {islogin && (
                            <div>
                                <p
                                    className="smr_menuStaicMobilePageLink"
                                    onClick={() => {
                                        setDrawerShowOverlay(false);
                                        navigate("/myWishList");
                                    }}
                                >
                                    WishList
                                </p>
                            </div>
                        )}

                        {IsB2BWebsiteChek == 1 ? (
                            islogin ? (
                                <>
                                    {storeinit?.IsDesignSetInMenu == 1 && (
                                        <p
                                            className="smr_menuStaicMobilePageLink"
                                            onClick={() => {
                                                setDrawerShowOverlay(false);
                                                navigate("/Lookbook");
                                            }}
                                        >
                                            {storeinit?.DesignSetInMenu}
                                            {/* LOOKBOOK */}
                                        </p>
                                    )}
                                </>
                            ) : (
                                ""
                            )
                        ) : (
                            <>
                                {storeinit?.IsDesignSetInMenu == 1 && (
                                    <p
                                        className="smr_menuStaicMobilePageLink"
                                        onClick={() => {
                                            setDrawerShowOverlay(false);
                                            navigate("/Lookbook");
                                        }}
                                    >
                                        {storeinit?.DesignSetInMenu}
                                        {/* LOOKBOOK */}
                                    </p>
                                )}
                            </>
                        )}

                        {islogin && (
                            <div>
                                <p
                                    className="smr_menuStaicMobilePageLink"
                                    onClick={() => {
                                        setDrawerShowOverlay(false);
                                        navigate("/account");
                                    }}
                                >
                                    Account
                                </p>
                            </div>
                        )}

                        {islogin && (
                            <div>
                                <p
                                    className="smr_menuStaicMobilePageLink"
                                    onClick={() => {
                                        setDrawerShowOverlay(false);
                                        handleLogout();
                                    }}
                                >
                                    Log Out
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
            <div
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
                className={`shop-dropdown ${isDropdownOpen ? "open" : ""} ${isHeaderFixed ? "fixed" : ""
                    }`}
                style={{ borderTop: "5px solid black", borderBottom: "1px solid gray" }}
            >
                <div
                    ref={divRef}
                    style={{
                        display: "flex",
                        color: "#7d7f85",
                        backgroundColor: "white",
                        gap: "50px",
                        justifyContent: "space-between",
                        marginTop: isHeaderFixed && "20px",
                    }}
                    className="smr_showDropOptionMainDiv"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                >
                </div>
                <TopNavBar menuItems={menuItems} handelMenu={handelMenu} />
            </div>
        </>
    )
}

const TopNavBar = ({ menuItems = [], handelMenu = () => { } }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const menuRef = useRef(null);
    const timeoutRef = useRef(null); // To hold the timeout reference

    if (menuItems?.length == 0) {
        return;
    }

    const handleMouseEnter = (index, param) => {
        setHoveredIndex(index);
        setExpandedMenu(index);
        setSelectedData(menuItems[index] || []);
        document.body.style.overflow = "hidden";
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHoveredIndex(null);
            setExpandedMenu(null);
            setSelectedData([]);
            document.body.style.overflow = "auto";
        }, 100);
    };

    const handleMouseLeaveWithDelay = (e) => {
        e.stopPropagation();
        setExpandedMenu(null);
        setSelectedData([]);
        document.body.style.overflow = "auto";
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    return (
        <>
            <div className="smr1_TopNavBar"
                onMouseLeave={handleMouseLeaveWithDelay} // Handle mouse leave from the parent container
            >
                <div className="smr_flat_view_menu">
                    <HoverMenu
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        expandedMenu={expandedMenu}
                        hoveredIndex={hoveredIndex}
                        selectedData={selectedData}
                        handelMenu={handelMenu}
                    />
                    {menuItems?.map((menuItem, index) => (
                        <div
                            key={menuItem.menuid}
                            className="menu_list_Smr"
                            onMouseEnter={() => {
                                handleMouseEnter(index, menuItem);
                            }}
                            onClick={() => handleMouseLeave()}
                        >
                            <div
                                // component="div"
                                onClick={(e) =>
                                    handelMenu(
                                        {
                                            menuname: menuItem?.menuname,
                                            key: menuItem?.param0name,
                                            value: menuItem?.param0dataname,
                                        },
                                        {},
                                        {},
                                        e
                                    )
                                }
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                <a
                                    className="menu_list_Smr_0_title"
                                    href={`/p/${menuItem?.menuname}/?M=${btoa(
                                        `${menuItem?.param0dataname}/${menuItem?.param0name}`
                                    )}`}
                                >
                                    {menuItem.menuname}
                                </a>
                                <FiChevronDown className="down-arrow-icon" size={12} />
                            </div>

                            {menuItem?.param1[0].param1dataname !== "" && (
                                <div className="child_menu_hover" hidden>
                                    <div className="smr_menu_menu">
                                        {menuItem.param1.map((subMenuItem) => {
                                            if (
                                                menuItem?.param1 &&
                                                menuItem?.param1?.length > 0 &&
                                                menuItem?.param1[0].param1name === ""
                                            ) {
                                                return;
                                            }
                                            return (
                                                <div key={subMenuItem.param1dataid}>
                                                    <div
                                                        className="l"
                                                        onClick={(e) =>
                                                            handelMenu(
                                                                {
                                                                    menuname: menuItem?.menuname,
                                                                    key: menuItem?.param0name,
                                                                    value: menuItem?.param0dataname,
                                                                },
                                                                {
                                                                    key: subMenuItem.param1name,
                                                                    value: subMenuItem.param1dataname,
                                                                },
                                                                {},
                                                                e
                                                            )
                                                        }
                                                    >
                                                        <a
                                                            className="smr_menu_title_1"
                                                            href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname
                                                                }/${subMenuItem.param1dataname}/?M=${btoa(
                                                                    `${menuItem?.param0dataname},${subMenuItem.param1dataname}/${menuItem?.param0name},${subMenuItem.param1name}`
                                                                )}`}
                                                        >
                                                            {subMenuItem.param1dataname}
                                                        </a>
                                                    </div>
                                                    <>
                                                        <div className="smr_menu_level1">
                                                            {subMenuItem.param2.map((subSubMenuItem) => {
                                                                if (
                                                                    subMenuItem?.param2 &&
                                                                    subMenuItem?.param2?.length > 0 &&
                                                                    subMenuItem?.param2[0].param2name === ""
                                                                ) {
                                                                    return;
                                                                }
                                                                return (
                                                                    <div
                                                                        component="div"
                                                                        onClick={(e) =>
                                                                            handelMenu(
                                                                                {
                                                                                    menuname: menuItem?.menuname,
                                                                                    key: menuItem?.param0name,
                                                                                    value: menuItem?.param0dataname,
                                                                                },
                                                                                {
                                                                                    key: subMenuItem.param1name,
                                                                                    value: subMenuItem.param1dataname,
                                                                                },
                                                                                {
                                                                                    key: subSubMenuItem.param2name,
                                                                                    value: subSubMenuItem.param2dataname,
                                                                                },
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        <a
                                                                            className="smr_menu_title_2"
                                                                            href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname
                                                                                }/${subMenuItem.param1dataname}/${subSubMenuItem.param2dataname
                                                                                }/?M=${btoa(
                                                                                    `${menuItem?.param0dataname},${subMenuItem.param1dataname},${subSubMenuItem.param2dataname}/${menuItem?.param0name},${subMenuItem.param1name},${subSubMenuItem.param2name}`
                                                                                )}`}
                                                                        >
                                                                            {subSubMenuItem.param2dataname}
                                                                        </a>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </>
                                                </div>
                                            );
                                        })}
                                        {menuItem?.param1[0].param1dataname !== "" && (
                                            <button
                                                className="smr_view_more_button"
                                                onClick={() =>
                                                    handelMenu({
                                                        menuname: menuItem?.menuname,
                                                        key: menuItem?.param0name,
                                                        value: menuItem?.param0dataname,
                                                    })
                                                }
                                            >
                                                view all
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const HoverMenu = ({ selectedData, handelMenu, expandedMenu, hoveredIndex, handleMouseEnter, handleMouseLeave, }) => {
    const SliderbannerImages = [
        storImagePath() + "/1.png",
        storImagePath() + "/2.png",
    ];

    if (expandedMenu === null || expandedMenu === undefined || selectedData?.param1[0].param1dataname === "") {
        return;
    }

    return (
        <>
            <div
                className="new_hover_banner"
                onMouseEnter={() => handleMouseEnter(hoveredIndex)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMouseLeave()}
            >
                <div className="smr_left_list">
                    <div
                        className="smr_menu_level_list"          >
                        {selectedData?.param1?.map((param1Item, param1Index) => {
                            return (
                                <div key={param1Index}>
                                    <span
                                        className="level1MenuData"
                                        key={param1Index}
                                        onClick={(e) => {
                                            handelMenu(
                                                {
                                                    menuname: selectedData?.menuname,
                                                    key: selectedData?.param0name,
                                                    value: selectedData?.param0dataname,
                                                },
                                                {
                                                    key: param1Item.param1name,
                                                    value: param1Item.param1dataname,
                                                },
                                                {},
                                                e
                                            );
                                            handleMouseLeave();
                                        }}
                                    >
                                        <a
                                            href={`/p/${selectedData?.param0dataname}/${param1Item.param1dataname
                                                }/?M=${btoa(
                                                    `${selectedData?.param0dataname},${param1Item?.param1dataname}/${selectedData?.param0name},${param1Item?.param1name}`
                                                )}`}
                                            style={{ color: "black", textDecoration: "none" }}
                                        >
                                            {param1Item?.param1dataname}
                                        </a>
                                    </span>
                                    <div
                                        className="level2menudata"
                                        style={{
                                            height: "28.2vh",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            flexDirection: "column",
                                            marginLeft: "0",
                                        }}
                                    >
                                        {param1Item?.param2?.map((param2Item, param2Index) => {
                                            return (
                                                <p
                                                    className="level2menuData"
                                                    key={param2Index}
                                                    onClick={(e) => {
                                                        handelMenu(
                                                            {
                                                                menuname: selectedData?.menuname,
                                                                key: selectedData?.param0name,
                                                                value: selectedData?.param0dataname,
                                                            },
                                                            {
                                                                key: param1Item?.param1name,
                                                                value: param1Item?.param1dataname,
                                                            },
                                                            {
                                                                key: param2Item?.param2name,
                                                                value: param2Item?.param2dataname,
                                                            },
                                                            e
                                                        );
                                                        handleMouseLeave();
                                                    }}
                                                    style={{
                                                        fontSize: "14px",
                                                        margin: "3px 15px 0px 0px",
                                                        // fontFamily: '"PT Sans", sans-serif',
                                                        letterSpacing: 0.4,
                                                        textAlign: "start",
                                                        cursor: "pointer",
                                                        textTransform: "capitalize",
                                                        paddingRight: "15px",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    <a
                                                        href={`/p/${selectedData?.param0dataname}/${param1Item.param1dataname
                                                            }/${param2Item.param2dataname}/?M=${btoa(
                                                                `${selectedData?.param0dataname},${param1Item.param1dataname},${param2Item.param2dataname}/${selectedData?.param0name},${param1Item.param1name},${param2Item.param2name}`
                                                            )}`}
                                                        style={{ color: "black", textDecoration: "none" }}
                                                    >
                                                        {param2Item?.param2dataname}
                                                    </a>
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="smr_right_side_banner">
                    {SliderbannerImages?.map((image, index) => {
                        return (
                            <div className="image_box_s">
                                <img src={image} alt="image" className="image_s" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const HeroSectionSlider = () => {
    return (
        <div className="smr1_Herosection_slider_div">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {/* First Slide */}
                <SwiperSlide>
                    <img src={`${storImagePath()}/images/image1.webp`} className="smr1_Herosection_slider_img" />
                    <AnimatePresence>
                        <motion.div
                            className="slider-text"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                        >
                            <h2>Welcome to the Hero Section!</h2>
                            <p>Here is some text that fades in and moves up when this image is active.</p>
                        </motion.div>
                    </AnimatePresence>
                </SwiperSlide>

                {/* Second Slide */}
                <SwiperSlide>
                    <img src={`${storImagePath()}/images/image2.webp`} className="smr1_Herosection_slider_img" />
                    <AnimatePresence>
                        <motion.div
                            className="slider-text"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                        >
                            <h2>Another Hero Section!</h2>
                            <p>This text fades in and moves up when the second image is active.</p>
                        </motion.div>
                    </AnimatePresence>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const AlbumSection = () => {
    const [validImages, setValidImages] = useState([]);
    const [albumData, setAlbumData] = useState();
    const islogin = useRecoilValue(smr_loginState);
    const [storeInit, setStoreInit] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const isMobile = useMediaQuery("(max-width: 480px)");
    const isTablet = useMediaQuery("(max-width: 768px)");
    const isLaptop = useMediaQuery("(max-width: 992px)");
    const isDesktop = useMediaQuery("(min-width: 1200px)");

    useEffect(() => {
        const fetchAlbumData = async () => {
            setIsLoading(true);

            const storeInitData = JSON.parse(sessionStorage.getItem("storeInit"));
            const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));

            if (!storeInitData || !loginUserDetail) {
                setIsLoading(false);
                return;
            }

            setStoreInit(storeInitData);

            const { IsB2BWebsite } = storeInitData;
            const visiterID = Cookies.get('visiterId');

            const finalID = IsB2BWebsite === 0
                ? (islogin === false ? visiterID : (loginUserDetail?.id || '0'))
                : loginUserDetail?.id || '0';

            try {
                const response = await Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID);
                if (response?.Data?.rd) {
                    setAlbumData(response.Data.rd);
                } else {
                    console.log("No album data found", response);
                }
            } catch (err) {
                console.error("Error fetching album data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbumData();
    }, [islogin]);


    const columnCount = {
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
    };

    useEffect(() => {
        const getValidImages = async () => {
            if (!albumData?.length) return;

            const imagePromises = albumData.map(async (album) => {
                if (album.AlbumImageName && album.AlbumImageFol) {
                    const imgSrc = `${storeInit?.AlbumImageFol}${album?.AlbumImageFol}/${album?.AlbumImageName}`
                    return { ...album, src: imgSrc, name: album?.AlbumName };
                }
                else {
                    return { ...album, src: imageNotFound, name: album?.AlbumName };
                }
            });

            const images = await Promise.all(imagePromises);
            setValidImages(images);
        };

        getValidImages();
    }, [albumData, storeInit, imageNotFound]);

    const handleNavigate = (data) => {
        const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
        const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
        sessionStorage.setItem('redirectURL', url)
        navigation(islogin || data?.AlbumSecurityId === 0 ? url : redirectUrl);
    };

    const getColumns = (validImages, columnCount) => {
        const columns = Array.from({ length: columnCount }, () => []);

        validImages.forEach((item, index) => {
            columns[index % columnCount].push(item);  // Distribute images into columns
        });

        return columns;
    };

    const getResponsiveColumns = () => {
        const columnCount = isMobile ? 1 : isTablet ? 2 : isLaptop ? 3 : 4;
        const columns = Array.from({ length: columnCount }, () => []);

        validImages.forEach((item, index) => {
            columns[index % columnCount].push(item); // Distribute images into columns
        });

        return columns;
    };

    return (
        <div className="smr1_album_main_div">
            {isLoading ? (
                <div className="smr1_album_cards_div">
                    <div className="loading-spinner">
                        <Box>
                            <ImageList
                                variant="masonry"
                                cols={3}
                                gap={8}
                                style={{ position: "relative", cursor: "pointer" }}
                            >
                                {Array.from(new Array(4)).map((_, columnIndex) => (
                                    <div key={columnIndex} className="masonry-layout__column">
                                        {Array.from(new Array(4)).map((_, index) => (
                                            <ImageListItem key={index}>
                                                <Skeleton variant="rectangular" width="100%" height={180} />
                                            </ImageListItem>
                                        ))}
                                    </div>
                                ))}
                            </ImageList>
                        </Box>
                    </div>
                </div>
            ) : (
                <>
                    <div className="smr1_album_label_div">
                        <span>For every special movement</span>
                    </div>
                    <div className="smr1_album_cards_div">
                        <Box>
                            {/* Image list container */}
                            <ImageList
                                variant="masonry"
                                cols={3}
                                gap={8}
                                style={{ position: "relative", cursor: "pointer" }}
                            >
                                {getResponsiveColumns().map((column, columnIndex) => (
                                    <div key={columnIndex} className="masonry-layout__column" style={{ marginBlock: isLoading ? "0" : "0.5rem" }}>
                                        {column.map((item) => (
                                            <ImageListItem
                                                key={item.src}
                                                sx={{ overflowY: "hidden" }}
                                                onClick={() => handleNavigate(item)}
                                            >
                                                <img
                                                    srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${item.src}?w=248&fit=crop&auto=format`}
                                                    alt={item?.name || "Album Image"} // Added alt text for accessibility
                                                    loading="lazy"
                                                />
                                                <div className="smr1_titleline_album">
                                                    <span>{item?.name}</span>
                                                    <hr style={{ border: "1px solid #333", marginBlock: "5px" }} />
                                                </div>
                                            </ImageListItem>
                                        ))}
                                    </div>
                                ))}
                            </ImageList>
                        </Box>
                    </div>
                </>
            )}
        </div>
    );

}

const NewArrival = () => {
    const location = useLocation();
    const newArrivalRef = useRef(null);
    const [newArrivalData, setNewArrivalData] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    const islogin = useRecoilValue(smr_loginState);
    const [validatedData, setValidatedData] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [isshowDots, setisshowDots] = useState(false);
    const [rollOverImgPd, setRolloverImgPd] = useState({})
    const [selectedMetalColor, setSelectedMetalColor] = useState(null);
    const [imageColor, setImageColor] = useRecoilState(MetalColor_Image);
    const getSessImgColor = JSON.parse(sessionStorage.getItem('imgColorCode'));
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const getSessCartWishImgColor = JSON?.parse(sessionStorage.getItem('cartWishImgColor')) ?? undefined;

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getSlidesPerView = () => {
        if (windowWidth >= 1800) return 4;
        if (windowWidth >= 1024) return 3;
        if (windowWidth >= 600) return 2;
        return 1;
    };

    const slidesPerView = getSlidesPerView();

    const metalColorType = [
        {
            id: 1,
            metal: 'gold'
        },
        {
            id: 2,
            metal: 'white'
        },
        {
            id: 3,
            metal: 'rose'
        },
    ]

    const activeColorCode = getSessImgColor || getSessCartWishImgColor;

    useEffect(() => {
        if ((activeColorCode !== "" && activeColorCode !== undefined && activeColorCode !== null)) {
            // if (!activeColorCode) {
            setImageColor("");
            sessionStorage.removeItem("imgColorCode");
            sessionStorage.removeItem("cartWishImgColor");
            setSelectedMetalColor(null);
        }
    }, [location?.search])

    const handleClick = (metalColorId, autocode) => {
        setSelectedMetalColor((prev) => {
            const updated = { ...prev };
            if (updated?.[autocode] === metalColorId) {
                delete updated[autocode];
            } else {
                updated[autocode] = metalColorId;
            }
            return updated;
        });
        // handleMetalColor(metalColorId, autocode);
    };

    function checkImageAvailability(imageUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getDomainName();
                setisshowDots(res === 'demo' ? true : false)
            } catch (error) {
                return error;
            }
        })();
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callAPI();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (newArrivalRef.current) {
            observer.observe(newArrivalRef.current);
        }
        return () => {
            if (newArrivalRef.current) {
                observer.unobserve(newArrivalRef.current);
            }
        };
    }, [])

    const callAPI = () => {
        setIsLoading(true)
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.CDNDesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID).then((response) => {
            if (response?.Data?.rd) {
                setNewArrivalData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err)).finally(() => { setIsLoading(false) })
    }

    const validateImageURLs = async () => {
        if (!newArrivalData?.length) return;
        const validatedData = await Promise.all(
            newArrivalData.map(async (item) => {
                const imageURL = `${imageUrl}${item?.designno}~1.${item?.ImageExtension}`;
                // const validatedURL = await checkImageAvailability(imageURL);
                // return { ...item, validatedImageURL: validatedURL };
                return { ...item, validatedImageURL: imageURL };
            })
        );
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [newArrivalData]);

    let getDesignImageFol = storeInit?.CDNDesignImageFol;
    const getDesignVideoFol = storeInit?.CDNVPath;

    const getDynamicImage = async (item, designno, extension, type, color) => {
        const baseImagePath = `${getDesignImageFol}${designno}~${type}`;
        const colorImagePath = `${baseImagePath}~${color}.${extension}`;
        let defaultImagePath = "";
        if (type === 2) {
            defaultImagePath = `${getDesignImageFol}${designno}~1.${extension}`;
        } else {
            defaultImagePath = `${baseImagePath}.${extension}`;
        }

        const imageExistsFlag = await checkImageAvailability(colorImagePath);
        if (item?.ImageCount > 0 && imageExistsFlag) {
            return colorImagePath;
        }
        return defaultImagePath;
    };

    const getDynamicYellowImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 1, "Yellow");
    };

    const getDynamicWhiteImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 1, "White");
    };

    const getDynamicRoseImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 1, "Rose");
    };

    const getDynamicRollYellowImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 2, "Yellow");
    };

    const getDynamicRollWhiteImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 2, "White");
    };

    const getDynamicRollRoseImage = async (item, designno, extension) => {
        return await getDynamicImage(item, designno, extension, 2, "Rose");
    };


    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = {};
            await Promise.all(newArrivalData.map(async (item) => {
                const yellowImage = await getDynamicYellowImage(item, item.designno, item.ImageExtension);
                const whiteImage = await getDynamicWhiteImage(item, item.designno, item.ImageExtension);
                const roseImage = await getDynamicRoseImage(item, item.designno, item.ImageExtension);
                const yellowRollImage = await getDynamicRollYellowImage(item, item?.designno, item?.ImageExtension);
                const whiteRollImage = await getDynamicRollWhiteImage(item, item?.designno, item?.ImageExtension);
                const roseRollImage = await getDynamicRollRoseImage(item, item?.designno, item?.ImageExtension);

                // Store images in an object keyed by design number
                loadedImages[item.designno] = {
                    yellowImage,
                    whiteImage,
                    roseImage,
                    yellowRollImage,
                    whiteRollImage,
                    roseRollImage
                };
            }));
            setImageMap(loadedImages);
        };

        if (newArrivalData.length > 0) {
            loadImages();
        }
    }, [newArrivalData]);

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        // navigation(`/d/${titleLine.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""}${designNo}?p=${encodeObj}`)
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleImgRollover = async (pd, yellowRollImage, whiteRollImage, roseRollImage, metalId) => {
        if (pd?.ImageCount > 0) {
            const color = metalId ?? selectedMetalColor?.[pd?.autocode];

            let imageUrl;

            switch (color) {
                case 1:
                    imageUrl = yellowRollImage;
                    break;
                case 2:
                    imageUrl = whiteRollImage
                    break;
                case 3:
                    imageUrl = roseRollImage;
                    break;
                default:
                    imageUrl = checkImageAvailability(pd?.images[1]) ? pd?.images[1] : pd?.images[0];
                    break;
            }

            setRolloverImgPd((prev) => {
                return { [pd?.autocode]: imageUrl };
            });
        }
    };



    const handleLeaveImgRolloverImg = async (pd, yellowImage, whiteImage, roseImage) => {
        if (pd?.images?.length > 0) {

            // const imageUrl = pd?.images[0];
            const color = selectedMetalColor?.[pd?.autocode];

            let imageUrl;
            switch (color) {
                case 1:
                    imageUrl = yellowImage;
                    break;
                case 2:
                    imageUrl = whiteImage;
                    break;
                case 3:
                    imageUrl = roseImage;
                    break;
                default:
                    imageUrl = pd?.images[0];
                    break;
            }
            // const isImageAvailable = await checkImageAvailability(imageUrl);
            if (imageUrl) {
                setRolloverImgPd((prev) => { return { [pd?.autocode]: imageUrl || pd?.images[0] } })
            }
        }
    };

    return (
        <div ref={newArrivalRef}
        >
            {validatedData?.length !== 0 && (
                <motion.div
                    className="smr1_newwArr1MainDiv"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeIn',
                        delay: 0.8,
                    }}

                    viewport={{ once: true, amount: 0.2 }}
                >
                    {isLoading ? (
                        // Skeleton loader for the cards
                        <Box sx={{ height: "100%" }}>
                            <Typography variant="h5" className="smrN_NewArr1Title">
                                New Arrival
                            </Typography>
                            <div className="swiper-container-wrapper">
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={slidesPerView}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        pauseOnMouseEnter: true,
                                    }}
                                    navigation={{
                                        nextEl: ".custom-swiper-button-next",
                                        prevEl: ".custom-swiper-button-prev",
                                    }}
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Autoplay]}
                                    className="smr1_newArr1Swiper"
                                >
                                    {[...Array(5)].map((_, index) => (
                                        <SwiperSlide key={index}>
                                            <Box className="skeleton-card">
                                                <Skeleton variant="rectangular" width="100%" height={300} />
                                                <Skeleton variant="text" width="60%" height={20} sx={{ marginTop: 1 }} />
                                                <Skeleton variant="text" width="40%" height={20} sx={{ marginTop: 1 }} />
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" className="smrN_NewArr1Title">
                                New Arrival
                                {/* <Link
                            className="smr_designSetViewmoreBtn"
                            onClick={() =>
                                navigation(`/p/NewArrival/?N=${btoa('NewArrival')}`)
                            }
                        >
                            View more
                        </Link> */}
                            </Typography>

                            {/* Swiper container */}
                            <div className='swiper-container-wrapper'>
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    breakpoints={{
                                        1024: {
                                            slidesPerView: 4,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                        },
                                        480: {
                                            slidesPerView: 2,
                                        },
                                        0: {
                                            slidesPerView: 1,
                                        },
                                    }}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        pauseOnMouseEnter: true,
                                    }}
                                    navigation={{
                                        nextEl: ".custom-swiper-button-next",
                                        prevEl: ".custom-swiper-button-prev",
                                    }}
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Autoplay]}
                                    className='smr1_newArr1Swiper'
                                >
                                    <div>
                                        {validatedData?.map((product, index) => {
                                            const images = imageMap[product.designno] || {};
                                            const yellowImage = images?.yellowImage;
                                            const whiteImage = images?.whiteImage;
                                            const roseImage = images?.roseImage;
                                            const yellowRollImage = images?.yellowRollImage;
                                            const whiteRollImage = images?.whiteRollImage;
                                            const roseRollImage = images?.roseRollImage;
                                            const isLoading = product && product?.loading === true;
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Card
                                                        className="smr_NewArrproduct-card"
                                                    >
                                                        <div className="smr_newArr1Image">
                                                            <CardMedia

                                                                component="img"
                                                                className="smr_newArrImage"
                                                                image={
                                                                    product?.ImageCount >= 1
                                                                        ? rollOverImgPd[product?.autocode]
                                                                            ? rollOverImgPd[product?.autocode]
                                                                            : selectedMetalColor?.[product?.autocode] === 1
                                                                                ? yellowImage
                                                                                : selectedMetalColor?.[product?.autocode] === 2
                                                                                    ? whiteImage
                                                                                    : selectedMetalColor?.[product?.autocode] === 3
                                                                                        ? roseImage
                                                                                        : product?.validatedImageURL
                                                                        : imageNotFound
                                                                }
                                                                alt={product?.TitleLine}
                                                                onError={(e) => {
                                                                    e.target.src = imageNotFound;
                                                                }}
                                                                onClick={() =>
                                                                    handleNavigation(product?.designno, product?.autocode, product?.TitleLine)
                                                                }
                                                            />
                                                            {!isshowDots && <div className="smr_productList_metaltype_Maindiv">
                                                                <div className="smr_productList_metaltype_div">
                                                                    <img src={colorPicker} alt="" className="image" />
                                                                    <div className="metal-buttons-container">
                                                                        {metalColorType?.map((item) => (
                                                                            <button
                                                                                key={item?.id}
                                                                                className={
                                                                                    selectedMetalColor?.[product?.autocode] === item?.id
                                                                                        ? `smr_metaltype_${item?.metal}_clicked`
                                                                                        : `smr_metaltype_${item?.metal}`
                                                                                }
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    handleClick(item?.id, product?.autocode);
                                                                                    //  handleImgRollover(product, yellowRollImage, whiteRollImage, roseRollImage, item?.id)
                                                                                }}
                                                                            >
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                        <CardContent className="smr_newarrproduct-info">
                                                            <Typography className="smr_newArrTitle">
                                                                {product?.designno}
                                                                {formatTitleLine(product?.TitleLine) && ' - '}
                                                                {formatTitleLine(product?.TitleLine) && product?.TitleLine}
                                                            </Typography>
                                                            {storeInit?.IsPriceShow == 1 && (
                                                                <p className="smr_newArrPrice">
                                                                    <span
                                                                        className="smr_currencyFont"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: decodeEntities(
                                                                                islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode
                                                                            ),
                                                                        }}
                                                                    />
                                                                    {formatter(product?.UnitCostWithMarkUp)}
                                                                </p>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </div>
                                </Swiper>
                                <div className="custom-swiper-button-prev">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                </div>
                                <div className="custom-swiper-button-next">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                            </div>
                        </>
                    )
                    }

                </motion.div >
            )}
        </div >
    )
}

const EcatDesignSet = () => {
    const [designSetLstData, setDesignSetListData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [dstCount, setDstCount] = useState(0);
    const [isProdLoading, setIsProdLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [islogin, setIsLogin] = useState(false); // Assuming recoil state is handled outside of this snippet
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrlDesignSet, setImageUrlDesignSet] = useState();
    const [imageLoadError, setImageLoadError] = useState({});
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const is600Width = useMediaQuery("(max-width: 600px)");

    const handleImageError = (index) => {
        setImageLoadError((prev) => ({ ...prev, [index]: true }));
    };

    const [dataKey, seyDataKey] = useState(null);

    const handleHoverImages = (data) => {
        seyDataKey(data);
    };

    useEffect(() => {
        setIsLoading(true)
        const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
        const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));

        setImageUrl(storeInit?.DesignSetImageFol);
        setImageUrlDesignSet(storeInit?.CDNDesignImageFol);

        const { IsB2BWebsite } = storeInit || {};
        const visiterID = Cookies.get("visiterId");

        const finalID = IsB2BWebsite === 0
            ? (islogin === false ? visiterID : loginUserDetail?.id || "0")
            : loginUserDetail?.id || "0";

        Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID, {}, currentPage, itemsPerPage)
            .then((response) => {
                if (response?.Data?.rd) {
                    setDesignSetListData(response?.Data?.rd);
                    setDstCount(response?.Data?.rd1[0]?.TotalCount);

                    // Extract initial cart items
                    const initialCartItems = response?.Data?.rd.flatMap((slide) =>
                        parseDesignDetails(slide?.Designdetail)
                            .filter((detail) => detail?.IsInCart === 1)
                            .map((detail) => detail.autocode)
                    );
                    setCartItems((prevCartItems) => [
                        ...new Set([...prevCartItems, ...initialCartItems]),
                    ]);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsProdLoading(false);
                setIsLoading(false);
            });
    }, [islogin]);

    const parseDesignDetails = (details) => {
        try {
            return JSON?.parse(details);
        } catch (error) {
            console.error("Error parsing design details:", error);
            return [];
        }
    };

    const [imageSources, setImageSources] = React.useState({});

    useEffect(() => {
        if (designSetLstData && Array.isArray(designSetLstData)) {
            const imagePromises = designSetLstData.flatMap((slide) =>
                parseDesignDetails(slide?.Designdetail).map(async (detail) => {
                    const designImageUrl = `${imageUrlDesignSet}${detail?.designno}~1.${detail?.ImageExtension}`;
                    return {
                        designno: detail?.designno,
                        src: designImageUrl,
                    };
                })
            );

            Promise.all(imagePromises).then((results) => {
                const newImageSources = results.reduce((acc, { designno, src }) => {
                    acc[designno] = src;
                    return acc;
                }, {});

                setImageSources((prevSources) => {
                    const isDifferent = Object.keys(newImageSources).some(
                        (key) => newImageSources[key] !== prevSources[key]
                    );
                    return isDifferent ? newImageSources : prevSources;
                });
            });
        }
    }, [imageUrlDesignSet, designSetLstData]);

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.DefaultImageName) {
            finalprodListimg =
                imageUrl + pd?.designsetuniqueno + "/" + pd?.DefaultImageName;
        } else {
            finalprodListimg = 'a.jpg';
        }
        return finalprodListimg;
    };

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: "string" });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error("Error compressing and encoding:", error);
            return null;
        }
    };

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
            d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
            f: {},
        };
        let encodeObj = compressAndEncode(JSON?.stringify(obj));
        navigate(
            `/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
            }${designNo}?p=${encodeObj}`
        );
    };

    const getRandomBgColor = (index) => {
        const colorsLength = gradientColors.length;
        return gradientColors[index % colorsLength];
    };

    const [showImages, setShowImages] = useState(false);

    const handleInView = () => {
        setTimeout(() => {
            setShowImages(true);
        }, 1500);
    };



    return (
        <>
            {designSetLstData?.length !== 0 && (
                <Box className="smr1_ecat_container">
                    <Typography variant="h5" className="smrN_NewArr1Title">
                        Complete the look
                    </Typography>
                    {/* Swiper Section */}
                    <div className="swiper-container-wrapper">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".custom-swiper-button-next",
                                prevEl: ".custom-swiper-button-prev",
                            }}
                            className='smr1_newEactDesign'
                        >
                            {designSetLstData.map((designSet, index) => {
                                const images = designSet.images || [];
                                return (
                                    <SwiperSlide key={index}>
                                        <Box className="swiper-slide-content" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            height: '100%', // Ensure the entire container takes full height
                                            '@media (max-width: 900px)': {
                                                flexDirection: 'column', // Switch to column layout on small screens
                                            },
                                        }}>

                                            {/* Banner Image */}

                                            {(ProdCardImageFunc(designSet) && !imageLoadError[index]) ? (
                                                <Box className="banner-image" sx={{
                                                    flex: '1 60%',
                                                    height: '100%', // Make sure the banner takes full height
                                                    display: 'flex',
                                                    alignItems: 'center', // Vertically center the image
                                                    justifyContent: 'center', // Horizontally center the image
                                                }}>
                                                    <img
                                                        className="styled-image"
                                                        loading="lazy"
                                                        src={ProdCardImageFunc(designSet)}
                                                        alt={`Slide ${index}`}
                                                        onError={() => handleImageError(index)}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            cursor: "pointer",
                                                            backgroundColor: ProdCardImageFunc(designSet) === null ? "rgb(191, 200, 255)" : getRandomBgColor(index),
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <div className="smr1_lb3ctlImg_containe">
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height: '100%',
                                                            ...getRandomBgColor(index),
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                    </div>
                                                </div>
                                            )}

                                            {/* 3 Static Images in Zigzag Pattern */}
                                            <Box
                                                className="zigzag-images"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: (parseDesignDetails(designSet?.Designdetail)?.length <= 2) ? 'flex-start' : 'space-between',
                                                    flex: '1 40%',
                                                    height: '100%', // Ensure the zigzag section takes full height
                                                    position: 'relative',
                                                    marginTop: (parseDesignDetails(designSet?.Designdetail)?.length <= 2) ? '20px' : '0',
                                                }}
                                            >
                                                {(parseDesignDetails(designSet?.Designdetail))?.slice(0, 3)?.map((detail, subIndex) => {
                                                    const imageSrc = imageSources[detail?.designno] || imageNotFound;
                                                    const transformValue = subIndex % 2 === 0 ? 'translateX(-4rem)' : 'translateX(4rem)';
                                                    const StyletransformValue = (subIndex % 2 === 0 && is600Width) ? 'translateX(-3rem)' : 'translateX(3rem)';

                                                    return (
                                                        <motion.div
                                                            whileInView={handleInView}
                                                            style={{
                                                                transform: is600Width ? StyletransformValue : transformValue,
                                                                boxShadow: showImages ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "none",
                                                            }}
                                                            viewport={{ once: true }}
                                                            key={subIndex} className="smr_lookBookSubImageDiv"
                                                        >
                                                            {showImages && (
                                                                <SwiperSlide
                                                                    className="smr_lookBookSliderSubDiv"
                                                                    style={{ marginRight: '0px', cursor: 'pointer' }}
                                                                >
                                                                    <motion.img
                                                                        className="smr_lookBookSubImage"
                                                                        loading="lazy"
                                                                        src={imageSrc}
                                                                        alt={`Sub image ${subIndex} for slide ${detail?.designno}`}
                                                                        onClick={() =>
                                                                            handleNavigation(
                                                                                detail?.designno,
                                                                                detail?.autocode,
                                                                                detail?.TitleLine || ''
                                                                            )
                                                                        }
                                                                        onError={(e) => {
                                                                            e.target.src = imageNotFound;
                                                                        }}
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        whileInView={{
                                                                            opacity: 1,
                                                                            scale: 1,
                                                                            transition: {
                                                                                duration: 0.8,
                                                                                ease: "easeOut",
                                                                                delay: subIndex * 0.5,
                                                                            },
                                                                        }}
                                                                        viewport={{ once: true, margin: '0px' }}
                                                                    />
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <h3 className='smr1_ecat_title' style={{ fontSize: "16px", fontWeight: "bold", margin: "5px 0", color: "#333" }}>
                                                                            {formatTitleLine(detail?.TitleLine)}
                                                                        </h3>
                                                                        <span style={{ marginBottom: "0" }}>
                                                                            <span className="smr_currencyFont">
                                                                                {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                                            </span>&nbsp;
                                                                            <span>{formatter(detail?.UnitCostWithMarkUp)}</span>
                                                                        </span>
                                                                    </div>
                                                                </SwiperSlide>
                                                            )}
                                                        </motion.div>
                                                    );
                                                })}
                                            </Box>

                                        </Box>

                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <div className="custom-swiper-button-prev">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </div>
                        <div className="custom-swiper-button-next">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>

                </Box>
            )}
        </>
    );
};

const HotSellingProducts = () => {
    const bestSallerRef = useRef(null);
    const [imageUrl, setImageUrl] = useState();
    const [imageUrl1, setImageUrl1] = useState();
    const [bestSellerData, setBestSellerData] = useState('')
    const [storeInit, setStoreInit] = useState({});
    const [isLoding, setIsLoding] = useState(true);
    const navigation = useNavigate();
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const islogin = useRecoilValue(smr_loginState);
    const [hoveredItem, setHoveredItem] = useState(null);
    const setLoadingHome = useSetRecoilState(homeLoading);
    const [validatedData, setValidatedData] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };

    const callAllApi = () => {
        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (storeInit?.IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'))
        setImageUrl(data?.CDNVPath);
        setImageUrl1(data?.CDNDesignImageFol);
        setLoadingHome(false);
        Get_Tren_BestS_NewAr_DesigSet_Album("GETBestSeller", finalID).then((response) => {
            if (response?.Data?.rd) {
                setIsLoding(false);
                setBestSellerData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))

    }

    useEffect(() => {
        setLoadingHome(true);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callAllApi()
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (bestSallerRef.current) {
            observer.observe(bestSallerRef.current);
        }
        return () => {
            if (bestSallerRef.current) {
                observer.unobserve(bestSallerRef.current);
            }
        };
    }, [])

    function checkImageAvailability(imageUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imageUrl;
        });
    }

    function checkVideoAvailability(videoUrl) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.oncanplaythrough = () => resolve(true);
            video.onerror = () => resolve(false);
            video.src = videoUrl;
        });
    }

    const compressAndEncode = (inputString) => {
        try {
            const uint8Array = new TextEncoder().encode(inputString);
            const compressed = Pako.deflate(uint8Array, { to: 'string' });
            return btoa(String.fromCharCode.apply(null, compressed));
        } catch (error) {
            console.error('Error compressing and encoding:', error);
            return null;
        }
    };
    const [mediaArray, setMediaArray] = useState([]);

    const validateImageURLs = async () => {
        if (!bestSellerData?.length) return;
        const validatedData = await Promise.all(
            bestSellerData.map(async (item) => {
                const videoUrl = `${imageUrl}${item?.designno}~1.mp4`;
                const imageURL = `${imageUrl1}${item?.designno}~1.${item?.ImageExtension}`;
                // const validatedURL = await checkImageAvailability(imageURL);
                return { ...item, validatedImageURL: videoUrl, imageUrl: imageURL };
            })
        );
        let arr = [];

        for (const [index, item] of validatedData?.entries()) {
            if (item?.validatedImageURL) {
                const isVideoValid = await checkVideoAvailability(item?.validatedImageURL);
                if (isVideoValid) {
                    arr.push({
                        id: index,
                        type: "video",
                        src: item?.validatedImageURL,
                    });
                    continue; // Skip further checks if video is valid
                }
            }

            if (item?.imageUrl) {
                // Check if image is available
                const isImageValid = await checkImageAvailability(item?.imageUrl);
                if (isImageValid) {
                    arr.push({
                        id: index,
                        type: "image",
                        src: item?.imageUrl,
                    });
                    continue; // Skip default image check if image is valid
                }
            }

            arr.push({
                id: index,
                type: "noimage",
                src: imageNotFound,
            });
        }

        setMediaArray(arr);
        setValidatedData(validatedData);
    };

    useEffect(() => {
        validateImageURLs();
    }, [bestSellerData]);

    const handleNavigation = (designNo, autoCode, titleLine) => {
        let obj = {
            a: autoCode,
            b: designNo,
            m: loginUserDetail?.MetalId,
            d: loginUserDetail?.cmboDiaQCid,
            c: loginUserDetail?.cmboCSQCid,
            f: {}
        }
        let encodeObj = compressAndEncode(JSON.stringify(obj))
        navigation(`/d/${formatRedirectTitleLine(titleLine)}${designNo}?p=${encodeObj}`);
    }

    const chunkedData = [];
    for (let i = 0; i < bestSellerData?.length; i += 3) {
        chunkedData.push(bestSellerData?.slice(i, i + 3));
    }


    return (
        <div ref={bestSallerRef}>
            <div>
                {bestSellerData?.length != 0 &&
                    <div className='smr1_mainBestSeler1Div' >
                        <div className='smr_bestseler1TitleDiv'>
                            {/* <span className='smr_bestseler1Title'>HOT SELLING PRODUCTS</span> */}
                            <span className='smr_bestseler1Title1'>Discover</span>
                            <div>
                                <span className='smr_bestseler1Title2'>Sonasons</span>
                            </div>
                        </div>
                        <div className="product-grid">
                            <div className='smr_leftSideBestSeler'>
                                {validatedData?.slice(0, 4).map((data, index) => {
                                    const media = mediaArray?.[index];
                                    const { type, src } = media ?? {};

                                    return (
                                        <div key={index} className="product-card">
                                            <motion.div
                                                className="smr_btimageDiv"
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 1,
                                                    ease: 'easeInOut',
                                                    delay: index * 0.2,
                                                }}
                                                viewport={{ once: true, amount: 0.2 }}
                                            >
                                                {type === "video" ? (
                                                    <video
                                                        src={src}
                                                        alt={data.name}
                                                        onError={(e) => {
                                                            e.target.poster = imageNotFound;
                                                        }}
                                                        autoPlay
                                                        muted
                                                        loop
                                                    />
                                                ) : type === "image" ? (
                                                    <img
                                                        src={src}
                                                        alt={data.name}
                                                        onError={(e) => {
                                                            e.target.src = imageNotFound;
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={imageNotFound}
                                                        alt="No media available"
                                                    />
                                                )}
                                                <div className='smr1_titleline_hotseller'>
                                                    <div className='smr1_titleline'>
                                                        <span className="ellipsis-text">{formatTitleLine(data?.TitleLine)}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ marginBottom: "0" }}>
                                                            <span className="smr_currencyFont">
                                                                {islogin ? loginUserDetail?.CurrencyCode : storeInit?.CurrencyCode}
                                                            </span>&nbsp;
                                                            <span>{formatter(data?.UnitCostWithMarkUp)}</span>
                                                        </span>
                                                        <hr style={{ border: "1px solid #333", marginBlock: "5px" }} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                }
            </div >
        </div >
    )
}

const BrandComponent = () => {
    const sonasonsLogo = [
        "logo1.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo5.png",
        "logo6.png",
        "logo1.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo5.png",
        "logo6.png",
    ];

    const SonasonslogoElements = sonasonsLogo.map((logo, index) => (
        <img
            key={index}
            className="smr_affilitionImg"
            loading="lazy"
            src={`${storImagePath()}/images/HomePage/BrandLogo/sonasons/${logo}`}
            style={{ width: "130px", objectFit: "cover", marginRight: "90px" }}
        />
    ));
    return (
        <div className="smr1_brandsComponentsDiv">
            <p className="smr1_brandsCompoents">Participation In Exhibitions</p>
            <Marquee
                className="smr_brandsComponentClass"
                gradient={false}
                speed={40}
                pauseOnHover={true}
            >
                {SonasonslogoElements}
            </Marquee>
        </div>
    )
}

const Footer = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [email, setemail] = useState("");
    const StoreData = JSON?.parse(sessionStorage?.getItem("storeInit"));
    const [companyInfoData, setCompanuInfoData] = useState(StoreData);
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [result, setResult] = useState();
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let interval;
        const fetchData = () => {
            try {
                const storeInitData = sessionStorage.getItem("storeInit");
                if (storeInitData) {
                    const parsedStoreInit = JSON?.parse(storeInitData);
                    const companyInfoDataStr = sessionStorage.getItem("CompanyInfoData");
                    if (companyInfoDataStr) {
                        const parsedCompanyInfo = JSON?.parse(companyInfoDataStr);
                        setCompanuInfoData(parsedCompanyInfo);

                        const socialLinkStr = parsedCompanyInfo?.SocialLinkObj;
                        if (socialLinkStr) {
                            try {
                                const parsedSocialMediaData = JSON?.parse(socialLinkStr);
                                setSocialMediaData(parsedSocialMediaData);
                            } catch (error) {
                                console.error("Error parsing social media data:", error);
                            }
                        }
                    }

                    setLoading(false);
                    clearInterval(interval); // Clear the interval once data is found
                }
            } catch (error) {
                console.error("Error parsing data from sessionStorage:", error);
                setLoading(false);
                clearInterval(interval); // Clear the interval in case of error
            }
        };

        // Initial fetch
        fetchData();

        // Set up interval for continuous checking
        interval = setInterval(fetchData, 1000);

        // Cleanup function to clear interval on unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    const HandleFormSubmit = async (e) => {
        setLoading1(true);
        e.preventDefault();
        const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
        const newslater = storeInit?.newslatter;
        if (newslater && email) {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const newsletterUrl = `${newslater}${email}`;
            fetch(newsletterUrl)
                .then((response) => response.text())
                .then((result) => {
                    setResult(result); setLoading1(false); setTimeout(() => {
                        setResult(""); // Clear the result after 3000 ms
                        setemail('')

                    }, 3000);
                })
                .catch((error) => setResult(error));
        }
    };

    const footerSections = [
        {
            title: "POLICIES",
            links: [
                { name: "Privacy Policy", url: "/privacyPolicy" },
                { name: "Terms & Conditions", url: "/terms-and-conditions" },
                { name: "Contact", url: "/contactUs" }
            ],
        },
        {
            title: "ABOUT",
            links: [
                { name: "Our Story", url: "aboutUs" },
                { name: "Bespoke Jewellery", url: "bespoke-jewellery" },
                { name: "Appointment", url: "/appointment" },
            ]
        }
    ]
    return (
        <Box sx={{ bgcolor: "#f8f8f8", pt: 4, pb: 2, marginTop: '5rem' }}>
            <Container maxWidth="lg">
                <Grid sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontFamily: "PanText-Regular, serif" }}>
                                Join&nbsp;
                                <Typography component="span" variant="h6" sx={{ fontWeight: "bold", fontFamily: "PanText-Regular, serif" }}>
                                    Sonasons
                                </Typography>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "PanText-Regular, serif" }}>
                                Join our rewards program today to earn points, get personal offers and enjoy exclusive benefits.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#222222",
                                "&:hover": { bgcolor: "#000000" },
                                borderRadius: 0,
                                px: 3,
                                fontFamily: "PanText-Regular, serif"
                            }}
                        >
                            JOIN NOW
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />
                <Grid spacing={4} sx={{
                    display: "flex", justifyContent: "space-between", width: "100%", flexWrap: 'nowrap',
                    '@media (max-width: 1000px)': {
                        flexWrap: 'wrap',
                    }
                }}>
                    <Grid item xs={12} sm={6} md={3} sx={{ flex: "1 1 25%" }}>
                        <ContactInformation socialLinkStr={socialMediaData} companyInfoData={companyInfoData} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ flex: "1 1 25%" }}>
                        <NewsLetter
                            onsubmit={HandleFormSubmit}
                            email={email}
                            setemail={setemail}
                            loading1={loading1}
                            result={result}
                        />
                    </Grid>
                    {footerSections.map((section) => (
                        <Grid item xs={12} sm={6} md={3} key={section.title} marginTop="2rem" sx={{ flex: "1 1 25%", marginLeft: "1rem" }}>
                            <Typography variant="subtitle2" className='smr1_font-fam' fontWeight="bold" gutterBottom>
                                {section.title}
                            </Typography>
                            <Stack spacing={1}>
                                {section.links.map((link) => (
                                    <RouterLink to={link.url} key={link.name} className="smr1_font-fam" style={{ fontSize: "0.8rem", textDecoration: 'none', color: '#696969' }}>
                                        {link.name}
                                    </RouterLink>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>


                <Divider sx={{ my: 3 }} />

                <Grid spacing={2} display="flex" alignItems="center" justifyContent="space-between" sx={{
                    flexWrap: 'nowrap',
                    '@media (max-width: 1000px)': {
                        flexWrap: 'wrap',
                        justifyContent: "center"
                    }
                }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" sx={{ fontFamily: "PanText-Regular, serif" }} color="text.secondary">
                            © ALL RIGHTS RESERVED. 2025 Sonasons
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, flexWrap: 'wrap' }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ gap: { xs: "5px", md: "10px" }, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                                {/* <IconButton size="small" color="inherit">
                                    <FacebookIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <InstagramIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <TwitterIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <YouTubeIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <PinterestIcon fontSize="small" />
                                </IconButton> */}
                                {socialMediaData?.map((val, i) => {
                                    return <React.Fragment key={i}>
                                        <RouterLink
                                            key={i}
                                            to={val?.SLink}
                                            style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                            target="_blank"
                                        >
                                            <img src={val?.SImgPath} alt="" width={20} height={20} style={{
                                                mixBlendMode: "darken"
                                            }} />
                                        </RouterLink>
                                    </React.Fragment>
                                })}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >

    )
}

const NewsLetter = ({ onsubmit, email, setemail, loading1, result }) => {
    const alreadySubs = 'Already Subscribed.';
    return (
        <div className="smr1_footer-section">
            <h4>NEWSLETTER</h4>
            <p className="address_hoq">
                Subscribe to get special offers, new collection launches, and
                once-in-a-while deals.
            </p>
            <form className="smr1_subscribe-form" onSubmit={onsubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
            </form>
            {
                loading1 ? <span className="hoq_error_message" style={{ color: 'black' }}>Loading...</span> : (
                    <>
                        {result && (
                            <span
                                className="hoq_error_message"
                                style={{
                                    color: result === alreadySubs ? "#FF0000" : "#04AF70",
                                    marginTop: "0px",
                                    display: "block",
                                }}
                            >
                                {result}
                            </span>
                        )}
                    </>
                )}
        </div>
    );
};

const ContactInformation = ({ socialLinkStr, companyInfoData }) => {
    return (
        <div className="smr1_footer-section">
            <h4>CONTACT US</h4>
            <p className="add_hoq_new_kl">
                {companyInfoData?.FrontEndAddress},
                <br />
                {companyInfoData?.FrontEndCity},
                <br />
                {companyInfoData?.FrontEndState},
                <br />
                {companyInfoData?.FrontEndZipCode}
            </p>
            <p className="add_hoq_new_kl">
                Mob. {companyInfoData?.FrontEndContactno1}
                <br />
                Email:     {companyInfoData?.FrontEndEmail1}
            </p>
            {/* <div className="social-links">
                {
                    socialLinkStr?.map((val, i) => {
                        return <React.Fragment key={i}>
                            <RouterLink
                                key={i}
                                to={val?.SLink}
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                target="_blank"
                            >
                                <img src={val?.SImgPath} alt="" width={15} height={15} style={{
                                    mixBlendMode: "darken"
                                }} />
                                {val?.SName}
                            </RouterLink>
                        </React.Fragment>
                    })
                }
            </div> */}
        </div>
    );
};