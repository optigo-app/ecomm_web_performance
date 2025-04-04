import React, { useState, useEffect, useRef } from 'react';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { Badge, ButtonBase, List, ListItem, Tooltip, useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSection.scss';
import { Link, useNavigate } from 'react-router-dom';
import { cartB2CDrawer, CartCount, smr_companyLogo, smr_companyLogoM, smr_loginState, WishCount } from '../../../../../Recoil/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { GetMenuAPI } from '../../../../../../../../utils/API/GetMenuAPI/GetMenuAPI';
import { GetCountAPI } from '../../../../../../../../utils/API/GetCount/GetCountAPI';
import { FiChevronDown } from 'react-icons/fi';
import { storImagePath } from '../../../../../../../../utils/Glob_Functions/GlobalFunction';

export default function HeroSection() {
    const [isHovered, setIsHovered] = useState(false);
    const [isFixed, setIsFixed] = useState(false); // New state to track scroll position
    const isMobile = useMediaQuery('(max-width:768px)');
    const [drawerShowOverlay, setDrawerShowOverlay] = useState(false);
    const [isSearchActive, setisSearchActive] = useState(false);
    const [serachsShowOverlay, setSerachShowOverlay] = useState(false);
    const [searchText, setSearchText] = useState("");
    const navigation = useNavigate();
    const [isTrue, setIsTrue] = useState(false);

    const video = `${storImagePath()}/images/HomePage/demo-images/video.mp4`;
    const webLogo = `${storImagePath()}/images/HomePage/demo-images/webLogo.png`;
    const webLogo1 = `${storImagePath()}/images/HomePage/demo-images/webLogo1.png`;
    const banner1 = `${storImagePath()}/images/HomePage/demo-images/banner1.webp`;
    const banner2 = `${storImagePath()}/images/HomePage/demo-images/banner2.webp`;

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

    const toggleDrawerOverlay = () => {
        setDrawerShowOverlay(!drawerShowOverlay);
    };

    const handleChange = () => {
        setIsTrue(!isTrue);
    }

    // Effect to track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight / 2) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleOverlay = () => {
        setSerachShowOverlay(prev => !prev);
        setisSearchActive(prevState => !prevState);
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
                setDrawerShowOverlay(false);
                navigation(`/p/${searchText}?S=${encodeObj}`);
                setSearchText("");
                setSerachShowOverlay(false);
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
            navigation(`/p/${searchText}?S=${encodeObj}`);
            setSearchText("");
            setisSearchActive(false);
            setSerachShowOverlay(false);
        }
    }


    return (
        <>
            <div className="hero-section">
                {serachsShowOverlay && (
                    <div className="main_smlingSearchoverlay_div">
                        <div className={`main_smlingTopSerachOver ${serachsShowOverlay ? "active" : ""}`}>
                            <IoClose
                                style={{
                                    height: "30px",
                                    position: "absolute",
                                    right: '2rem',
                                    top: '1rem',
                                    width: "30px",
                                    color: "#b7bccd",
                                    cursor: "pointer",
                                }}
                                onClick={toggleOverlay}
                            />
                            <div className="main_search_div">
                                <input
                                    type="text"
                                    placeholder="Enter Design Number"
                                    value={searchText}
                                    autoFocus
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="main_serachinputBoxOverly"
                                    onKeyDown={searchDataFucn}
                                />
                                <IoSearchOutline
                                    onClick={() => clickSearch()}
                                    style={{ height: "25px", width: "25px", marginRight: "10px" }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="main_TopSection_offers_div">
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
                            <span className="main_Topsection_offers_span">FREE IN-STORE PICKUP Within 2 hours.</span>
                        </SwiperSlide>
                        <SwiperSlide>
                            <span className="main_Topsection_offers_span">FREE SHIPPING on orders $95+</span>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Video Background */}
                {isTrue ? (
                    <div className="video-background">
                        <HeroSectionSlider banner1={banner1} banner2={banner2} />
                    </div>
                ) : (
                    <div className="video-background">
                        <video autoPlay muted loop playsInline poster="/placeholder.svg?height=1080&width=1920">
                            <source src={video} type="video/mp4" />
                            <img src="/placeholder.svg?height=1080&width=1920" alt="Luxury jewelry" />
                        </video>
                    </div>
                )}

                <div className="main_overlay"></div>
                <header className={`main_header ${isHovered ? 'scrolled' : ''} ${isFixed ? 'fixed scrolled' : ''}`} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="main_container">
                        {!isFixed && (
                            <div className="logo">
                                <a href="/" className="logo-text">
                                    {isHovered ? (
                                        <img src={webLogo1} alt="" />
                                    ) : (
                                        <img src={webLogo} alt="" />
                                    )}
                                </a>
                            </div>
                        )}
                        <nav className="nav">
                            <div className="search-btn">
                                <button aria-label="Search" className="search-btn" onClick={toggleOverlay}>
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>

                            {!isMobile && (
                                <ul className="menu">
                                    {/* <li><a href="/" className="menu-link">Home</a></li>
                                    <li><a href="/jewelry" className="menu-link dropdown">Jewelry</a></li>
                                    <li><a href="/high-jewelry" className="menu-link">High Jewelry</a></li>
                                    <li><a href="/bespoke-jewelry" className="menu-link">Bespoke Jewelry</a></li>
                                    <li><a href="/bridal-jewelry" className="menu-link">Bridal Jewelry</a></li>
                                    <li className="menu-item">
                                        <a
                                            href="/the-house"
                                            className="menu-link dropdown"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleChange();
                                            }}
                                        >
                                            The House
                                        </a>
                                        {isTrue && (
                                            <ul className="dropdown-menu">
                                                <li><a href="/the-house/true" className="dropdown-item">True</a></li>
                                                <li><a href="/the-house/false" className="dropdown-item">False</a></li>
                                            </ul>
                                        )}
                                    </li>
                                    <li><a href="/contact" className="menu-link">Contact</a></li> */}
                                    <TopSectionMenu drawerShowOverlay={drawerShowOverlay} setDrawerShowOverlay={setDrawerShowOverlay} toggleDrawerOverlay={toggleDrawerOverlay} isHovered={isHovered}
                                        isFixed={isFixed} />
                                </ul>
                            )}

                            <div className="cart">
                                <button aria-label="wishlist" className="wish-icon">
                                    <Heart className="w-5 h-5" />
                                    <span className="wish-count">{wishCountNum}</span>
                                </button>
                                <button aria-label="Shopping cart" className="cart-icon">
                                    <ShoppingBag className="w-5 h-5" />
                                    <span className="cart-count">{cartCountNum}</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem", marginTop: "2rem" }}>
                <Link to={"/"}>Ecat</Link>
                <Link to={"/diamond"}>Diamond</Link>
                <Link to={"/album"}>Album</Link>
                <Link to={"/banner"}>Banner</Link>
            </div> */}
        </>
    );
}

const HeroSectionSlider = ({ banner1, banner2 }) => {
    return (
        <div className="main_Herosection_slider_div">
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
                    <img src={banner1} className="main_Herosection_slider_img" />
                    <AnimatePresence>
                        <motion.div
                            className="slider-text"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                        >
                        </motion.div>
                    </AnimatePresence>
                </SwiperSlide>

                {/* Second Slide */}
                <SwiperSlide>
                    <img src={banner2} className="main_Herosection_slider_img" />
                    <AnimatePresence>
                        <motion.div
                            className="slider-text"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                        >
                        </motion.div>
                    </AnimatePresence>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

const TopSectionMenu = ({ drawerShowOverlay, setDrawerShowOverlay, toggleDrawerOverlay, isHovered, isFixed }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const divRef = useRef(null);
    const navigate = useNavigate();
    const [islogin, setislogin] = useRecoilState(smr_loginState);
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
    const IsCartNo = storeinit?.CartNo;
    const [isCartOpen, setIsCartOpen] = useState(false);
    const compnyLogo = useRecoilValue(smr_companyLogo);
    const compnyLogoM = useRecoilValue(smr_companyLogoM);
    const setCartOpenState = useSetRecoilState(cartB2CDrawer);
    const [searchText, setSearchText] = useState("");
    const [serachsShowOverlay, setSerachShowOverlay] = useState(false);

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
                <TopNavBar menuItems={menuItems} handelMenu={handelMenu} isHovered={isHovered} isFixed={isFixed} />
            </div>
        </>
    )
}

const TopNavBar = ({ menuItems = [], handelMenu = () => { }, isHovered, isFixed, setIsHovered }) => {
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
                onMouseLeave={handleMouseLeaveWithDelay}
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
                                    style={{ color: (isHovered || isFixed) ? "black" : "white" }}
                                >
                                    {menuItem.menuname}
                                </a>
                                <FiChevronDown className="down-arrow-icon" style={{ color: (isHovered || isFixed) ? "black" : "white" }} size={12} />
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

const HoverMenu = ({ selectedData, handelMenu, expandedMenu, hoveredIndex, handleMouseEnter, handleMouseLeave }) => {
    const SliderbannerImages = [
        storImagePath() + "/1.png",
        // storImagePath() + "/2.png",
    ];

    if (expandedMenu === null || expandedMenu === undefined || selectedData?.param1[0].param1dataname === "") {
        return;
    }

    return (
        <>
            <div
                className="new_hover_banner"
                onMouseEnter={() => handleMouseEnter(hoveredIndex)}
                onMouseLeave={() => {
                    handleMouseLeave();
                }}
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