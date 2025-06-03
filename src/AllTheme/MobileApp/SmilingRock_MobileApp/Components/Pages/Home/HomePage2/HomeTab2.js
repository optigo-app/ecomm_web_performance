// BottomTabNavigation.js
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingBag } from 'react-icons/fa';
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Badge, Button, Tooltip } from '@mui/material';
import { IoMenuOutline } from 'react-icons/io5';
import { GiNecklaceDisplay } from "react-icons/gi";
import { SlMenu } from "react-icons/sl";
import Cookies from 'js-cookie';
import { smrMA_CartCount, smrMA_loginState, smrMA_WishCount } from '../../../Recoil/atom';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';



const HomeTab2 = React.memo(() => {
    const [activeTab, setActiveTab] = useState("/");
    const getCartListCount = useRecoilValue(smrMA_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount)
    const islogin = useRecoilValue(smrMA_loginState);
    const location = useLocation();
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    let cookie = Cookies.get('visiterId')

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname])

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        GetCountAPI(cookie).then((res) => {
            if (res) {
                setWishCountNum(res?.wishcount)
            }
        }).catch((err) => {
            if (err) {
                return err
            }
        })
    }, [islogin])

    // useEffect(() => {
    //     const SCROLL_THRESHOLD = 100;

    //     const handleScroll = () => {
    //         const currentScrollY = window.scrollY;

    //         // If user hasn't scrolled past threshold, always hide
    //         if (currentScrollY < SCROLL_THRESHOLD) {
    //             setIsVisible(false);
    //         } else {
    //             // Once past threshold, determine direction
    //             if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
    //                 // Scrolling down
    //                 setIsVisible(false);
    //             } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
    //                 // Scrolling up
    //                 setIsVisible(true);
    //             }
    //         }

    //         setLastScrollY(currentScrollY);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [lastScrollY]);


    useEffect(() => {
        let timeoutId = null;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
                // Scrolling down (hide)
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
                // Scrolling up (show)
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [lastScrollY]);


    return (
        <>
            {location.pathname == '/d' || location.pathname == '/myWishList' || location.pathname == '/CartPage' || location.pathname == '/payment' || location.pathname == '/Confirmation' ?
                <>
                    {/* <button
            style={{
              position:'fixed',
              bottom:0,
              height:'8vh',
              width:'100%',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor:'#f0f0f0',
              color: '#7D7f85',
              border:'none',
              cursor: 'pointer',
              fontWeight:'bold',
              boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              transition: 'background-color 0.3s',
            }}
          >
            Add to cart
          </button> */}
                </>
                :
                <div style={{
                    ...styles.container,
                    transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}>
                    <NavLink to="/" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/")}>
                        <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/" ? "#f4f4f5" : "" }}>
                            <FaHome style={activeTab === "/" ? styles.activeIcon : styles.icon} />
                            <span style={activeTab === "/" ? styles.activeText : styles.text}>Home</span>
                        </Button>
                    </NavLink>

                    <NavLink to="/Menu" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/Menu")}>
                        <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/Menu" ? "#f4f4f5" : "" }}>
                            <SlMenu style={activeTab === "/Menu" ? styles.activeIcon : styles.icon} />
                            <span style={activeTab === "/Menu" ? styles.activeText : styles.text}>Shop</span>
                        </Button>
                    </NavLink>

                    <NavLink to="/myWishList" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/myWishList")}>
                        <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/myWishList" ? "#f4f4f5" : "" }}>
                            <Badge
                                badgeContent={wishCountNum}
                                overlap={"rectangular"}
                                color="secondary"
                                style={{ marginInline: '4px' }}
                                className="smilingHeaderWhishlistIcon">
                                <BsFillSuitHeartFill style={activeTab === "/myWishList" ? styles.activeIcon : styles.icon} />
                            </Badge>
                            <span style={activeTab === "/myWishList" ? styles.activeText : styles.text}>Wishlist</span>
                        </Button>

                    </NavLink>

                    {islogin === true ?
                        <NavLink to="/account" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/account")}>
                            <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/account" ? "#f4f4f5" : "" }}>
                                <FaUser style={activeTab === "/account" ? styles.activeIcon : styles.icon} />
                                <span style={activeTab === "/account" ? styles.activeText : styles.text}>Me</span>
                            </Button>
                        </NavLink>
                        : <NavLink to="/AccountWithoutLogin" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/AccountWithoutLogin")}>
                            <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/AccountWithoutLogin" ? "#f4f4f5" : "" }}>
                                <FaUser style={activeTab === "/AccountWithoutLogin" ? styles.activeIcon : styles.icon} />
                                <span style={activeTab === "/AccountWithoutLogin" ? styles.activeText : styles.text}>Me</span>
                            </Button>
                        </NavLink>}

                    {IsB2BWebsiteChek === 1 ? (
                        islogin === true ? (
                            <>
                                {storeinit?.IsDesignSetInMenu == 1 &&
                                    <NavLink to="/Lookbook" style={styles.tab} activeClassName="active" onClick={() => handleTabChange("/Lookbook")}>
                                        <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/Lookbook" ? "#f4f4f5" : "" }}>
                                            <GiNecklaceDisplay style={activeTab === "/Lookbook" ? styles.activeIcon : styles.icon} />
                                            <span style={activeTab === "/Lookbook" ? styles.activeText : styles.text}>LOOKBOOK</span>
                                        </Button>
                                    </NavLink>
                                }
                            </>
                        ) : (
                            ""
                        )
                    ) : (
                        <>
                            {storeinit?.IsDesignSetInMenu == 1 &&
                                <NavLink to="/Lookbook" style={({ isActive }) => ({
                                    ...styles.tab,
                                    marginRight: '5px',
                                    ...(isActive ? styles.active : {})
                                })} activeClassName="active" onClick={() => handleTabChange("/Lookbook")}>
                                    <Button style={{ display: 'flex', flexDirection: 'column', color: 'rgb(102, 102, 102)', background: activeTab === "/Lookbook" ? "#f4f4f5" : "" }}>
                                        <FaShoppingBag style={activeTab === "/Lookbook" ? styles.activeIcon : styles.icon} />
                                        <span GiNecklaceDisplay={activeTab === "/Lookbook" ? styles.activeText : styles.text}>LOOKBOOK</span>
                                    </Button>
                                </NavLink>
                            }
                        </>
                    )}
                </div >
            }
        </>
    );
});

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        height: '70px',
        zIndex: 111111111111111
    },
    tab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        flex: 1,
        color: '#666',
    },
    icon: {
        marginBottom: '5px',
        fontSize: '20px',
    },
    activeIcon: {
        // color: 'rgb(214 176 139)',
        // color: '#0000ff78',
        fontSize: '20px',
    },
    text: {
        fontSize: '12px',
    },
    activeText: {
        // color: 'rgb(214 176 139)',
        // color: '#0000ff78',
        color: '#000',
        fontSize: '12px',
        marginBottom: '-5px',
        paddingBlock: '5px'
    },
};

export default HomeTab2;
