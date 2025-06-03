import React, { useEffect, useState } from 'react'
import { smrMA_CartCount, smrMA_WishCount, smrMA_companyLogo, smrMA_loginState } from '../../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import './Header1.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Badge, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PiBagFill } from "react-icons/pi";
import SearchIcon from '@mui/icons-material/Search';
import { FiArrowLeft } from "react-icons/fi";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cookies from 'js-cookie'
import Pako from 'pako';
import { GetCountAPI } from '../../../../../../../../utils/API/GetCount/GetCountAPI';



const Header1 = () => {
    const compnyLogo = useRecoilValue(smrMA_companyLogo);
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    const [searchText, setSearchText] = useState('');
    const location = useLocation();
    const navigation = useNavigate();
    const [isB2bFlag, setIsB2BFlaf] = useState('');
    const [cartCountNum, setCartCountNum] = useRecoilState(smrMA_CartCount)
    const [wishCountNum, setWishCountNum] = useRecoilState(smrMA_WishCount)
    const [islogin, setislogin] = useRecoilState(smrMA_loginState);

    let cookie = Cookies.get('visiterId')

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setIsB2BFlaf(storeinit?.IsB2BWebsite);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [islogin]);



    useEffect(() => {
        GetCountAPI(cookie).then((res) => {
            if (res) {
                setCartCountNum(res?.cartcount)
                setWishCountNum(res?.wishcount)
            }
        }).catch((err) => {
            if (err) {
                return err
            }
        })
    }, [islogin])


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

                let encodeObj = btoa(JSON.stringify(obj))
                navigation(`/p/${searchText}?S=${encodeObj}`);
                setSearchText("")
            }
        }
    };

    const handleSearchIconClick = () => {
        searchDataFucn({ key: "Enter" });  // Trigger the search logic as if the "Enter" key was pressed
    };

    // const searchDataFucn = (e) => {
    //   if(e.key === 'Enter'){
    //     if(searchText){
    //       navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
    //       console.log("searchtext",searchText);
    //     }
    //   }else{
    //     if(searchText){
    //       navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
    //       console.log("searchtext",searchText);
    //     }
    //   }
    // }
    const handleNaviagteSearch = () => {
        if (isB2bFlag == 1) {
            if (islogin == false) {
                navigation('/SearchPage')
            } else {
                navigation('/SearchPage')
            }
        } else {
            navigation('/SearchPage')
        }
    }
    const height = location.pathname === "/logout"
        ? '60px'
        : isB2bFlag === 1
            ? islogin === true
                ? '123px'
                : '80px'
            : '123px';


    return (
        <div>
            {(location.pathname.split('/')[1] === "p") || (location.pathname.split('/')[1] === "d") || (location.pathname.split('/')[1] === "/home1") ?
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: '10px', height: '50px', position: 'fixed', width: '100%', alignItems: 'center', padding: '0px 0px 0px 5px', borderBottom: '1px solid lightgray', backgroundColor: 'white', zIndex: '111111' }}>
                    <FiArrowLeft style={{ height: '25px', width: '25px' }} onClick={() => navigation(-1)} />
                    <ul className="mobileViewTopIconeMain" style={{ listStyle: 'none', margin: '0px', display: 'flex', padding: '0px', width: '90%' }}>
                        <div className="smeMASearchBoxDiv">
                            <div style={{ width: '30px' }} onClick={handleSearchIconClick}>
                                <FiSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="smeMASearchBoxInputDiv"
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        searchDataFucn(event);
                                    }
                                }}
                            />
                        </div>
                        <Badge
                            badgeContent={cartCountNum}
                            overlap={"rectangular"}
                            color="secondary"
                            style={{ marginTop: '5px', marginLeft: '5px' }}
                            className="mobileCartIconePage"
                        >
                            <Tooltip title="Cart">
                                <li
                                    onClick={() => navigation('/CartPage')}
                                    // onClick={toggleCartDrawer(true)}CartPage
                                    style={{
                                        marginTop: "0px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <ShoppingCartOutlinedIcon
                                        sx={{ height: '25x', width: '25px' }}
                                    />
                                </li>
                            </Tooltip>
                        </Badge>
                    </ul>
                </div>

                :

                (location.pathname === "CartPage") ?
                    ""
                    :
                    // isB2bFlag == 1 ? islogin == true ? '123px' : '60px' : '123px' 
                    <div className='smrm_HeaderMain' style={{ height: height }}>
                        <div className='smrm_Top_header_sub'>
                            <div className='smrm_Div1Main'
                            // style={{
                            //     paddingBlock: islogin == false ? '2.5px' : '10px',
                            // }}
                            >
                                {/* <a href="/"> */}
                                <img src={compnyLogo} loading='lazy' className='smrm_logo_header' />
                                {/* </a> */}
                                {location.pathname !== "/logout" ? (isB2bFlag == 1 ?
                                    islogin == false ?
                                        <Badge
                                            badgeContent={cartCountNum}
                                            overlap={"rectangular"}
                                            color="secondary"
                                            style={{ marginInline: '6px' }}
                                            className="smilingHeaderWhishlistIcon"
                                        // className="smilingHeaderWhishlistIcon badge12"
                                        >
                                            <Tooltip title="Cart">
                                                <li style={{ listStyle: 'none' }} onClick={() => navigation("/CartPage")}>
                                                    <PiBagFill
                                                        style={{
                                                            height: "25px",
                                                            cursor: "pointer",
                                                            width: "25px",
                                                            // color: "white",
                                                        }}
                                                        className="mobileViewSmilingTop1Icone"
                                                    />
                                                </li>
                                            </Tooltip>
                                        </Badge>
                                        :
                                        <Badge
                                            badgeContent={cartCountNum}
                                            overlap={"rectangular"}
                                            color="secondary"
                                            style={{ marginInline: '6px' }}
                                            className="smilingHeaderWhishlistIcon"
                                        // className="smilingHeaderWhishlistIcon badge12"
                                        >
                                            <Tooltip title="Cart">
                                                <li style={{ listStyle: 'none' }} onClick={() => navigation("/CartPage")}>
                                                    <PiBagFill
                                                        style={{
                                                            height: "25px",
                                                            cursor: "pointer",
                                                            width: "25px",
                                                            // color: "white",
                                                        }}
                                                        className="mobileViewSmilingTop1Icone"
                                                    />
                                                </li>
                                            </Tooltip>
                                        </Badge>
                                    :
                                    <Badge
                                        badgeContent={cartCountNum}
                                        overlap={"rectangular"}
                                        color="secondary"
                                        style={{ marginInline: '6px' }}
                                        className="smilingHeaderWhishlistIcon"
                                    // className="smilingHeaderWhishlistIcon badge12"   
                                    >
                                        <Tooltip title="Cart">
                                            <li style={{ listStyle: 'none' }} onClick={() => navigation("/CartPage")}>
                                                <PiBagFill
                                                    style={{
                                                        height: "25px",
                                                        cursor: "pointer",
                                                        width: "25px",
                                                        // color: "white",
                                                    }}
                                                    className="mobileViewSmilingTop1Icone"
                                                />
                                            </li>
                                        </Tooltip>
                                    </Badge>
                                ) : null}

                            </div>
                            {location.pathname !== "/logout" ? (isB2bFlag == 1 ?
                                islogin == true ?
                                    <div>
                                        <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                            <FiSearch onClick={handleNaviagteSearch} />
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                className="searchBoxOnlyHeaderFiexed"
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        searchDataFucn();
                                                        // setSerachShowOverlay(false);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <>
                                        {location?.pathname !== "/Menu" &&
                                            <div>
                                                <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                                    <FiSearch onClick={handleNaviagteSearch} />
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        value={searchText}
                                                        onChange={(e) => setSearchText(e.target.value)}
                                                        className="searchBoxOnlyHeaderFiexed"
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                                searchDataFucn();
                                                                // setSerachShowOverlay(false);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </>
                                :
                                <div>
                                    <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                        <FiSearch onClick={handleNaviagteSearch} />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className="searchBoxOnlyHeaderFiexed"
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    searchDataFucn();
                                                    // setSerachShowOverlay(false);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>


                        {location.pathname !== "/logout" ? (isB2bFlag == 1 ?
                            islogin == true ?
                                <div
                                    className={`smrm_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
                                >

                                    <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                        <FiSearch onClick={handleNaviagteSearch} />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className="searchBoxOnlyHeaderFiexed"
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    searchDataFucn();
                                                    // setSerachShowOverlay(false);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                :
                                <>
                                    {location?.pathname !== "/Menu" &&
                                        <div
                                            className={`smrm_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
                                        >

                                            <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                                <FiSearch onClick={handleNaviagteSearch} />
                                                <input
                                                    type="text"
                                                    placeholder="Search"
                                                    value={searchText}
                                                    onChange={(e) => setSearchText(e.target.value)}
                                                    className="searchBoxOnlyHeaderFiexed"
                                                    onKeyDown={(event) => {
                                                        if (event.key === 'Enter') {
                                                            searchDataFucn();
                                                            // setSerachShowOverlay(false);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    }
                                </>
                            :
                            <div
                                className={`smrm_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
                            >

                                <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                                    <FiSearch onClick={handleNaviagteSearch} />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="searchBoxOnlyHeaderFiexed"
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                searchDataFucn();
                                                // setSerachShowOverlay(false);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}


                    </div>
            }
        </div>
    )
};


export default Header1;