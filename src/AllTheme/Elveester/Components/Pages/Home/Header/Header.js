import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./Header.modul.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import {
  el_companyLogo,
  el_loginState,
  el_CartCount,
  el_WishCount,
  el_companyLogoM,
} from "../../../Recoil/atom";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { IoCaretDownSharp, IoPersonOutline } from "react-icons/io5";
import { Badge, ButtonBase, List, ListItem, Tooltip, useMediaQuery } from "@mui/material";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoSearch } from "react-icons/go";
import { FaPowerOff } from "react-icons/fa";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import Menubar from "../MenuBar/Menubar";
import { RxCross1 } from "react-icons/rx";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Pako from "pako";
import reportWebVitals from './../../../../../../reportWebVitals';

const Header = () => {
  const [lodingLogo, setLodingLogo] = useState(true);
  const navigation = useNavigate();
  const [islogin, setislogin] = useRecoilState(el_loginState);
  const [cartCount, setCartCount] = useRecoilState(el_CartCount);
  const [wishCount, setWishCount] = useRecoilState(el_WishCount);
  const [storeinit, setStoreInit] = useState();
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [burgerMenu1, setBurgerMenu1] = useState(false);
  const [mobilenav, setMobilenav] = useState(false);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const isTabletResponsive = useMediaQuery('(max-width:1000px)');
  const isDesktopResp = useMediaQuery('(max-width:1650px)');
  const isMobile = useMediaQuery('(max-width:425px)');
  const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;


  const compnyLogo = useRecoilValue(el_companyLogo);
  const compnyLogoM = useRecoilValue(el_companyLogoM);

  // useEffect(() => {
  //   const value = JSON.parse(sessionStorage.getItem("LoginUser"));
  //   setislogin(value);

  // if (titleImg) {
  //   const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
  //   setCompanyTitleLogo(storeInit?.companylogo);
  // }
  // setTimeout(() => {
  //   setLodingLogo(false);
  // }, 100);
  // }, []);

  const GetCompanyLogo = async () => {
    try {
      const value = JSON?.parse(sessionStorage?.getItem("LoginUser"));
      setislogin(value);
      const storeData = JSON?.parse(sessionStorage?.getItem('storeInit'));
      setStoreInit(storeData);
      window.scroll({ behavior: "smooth", top: 0 });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetCompanyLogo()
  }, []);

  // useEffect(() => {
  //   let interval;
  //   const checkStoreInit = () => {
  //     try {
  //       const storeInit = sessionStorage.getItem("storeInit");
  //       if (storeInit) {
  //         const parsedData = JSON.parse(storeInit);
  //         setCompanyTitleLogo(parsedData?.companylogo);
  //         setMobileLogo(parsedData?.companyMlogo)
  //         window.scroll({ behavior: "smooth", top: 0 });
  //         console.log(parsedData, "avaiable");

  //         if (interval) {
  //           clearInterval(interval);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error parsing storeInit:', error);

  //       if (interval) {
  //         clearInterval(interval);
  //       }
  //     }
  //   };

  //   checkStoreInit();
  //   interval = setInterval(checkStoreInit, 1000);
  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visiterID = Cookies.get("visiterId");
        const res = await GetCountAPI(visiterID);
        setCartCount(res?.cartcount);
        setWishCount(res?.wishcount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function ScrollToView(param) {
    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollParam", param);
      window.location.href = "/";
      return;
    }
    const element = document?.getElementById(param);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  const handleIconClick = () => {
    setSearchOpen(true);
  };

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Update showBtn based on input length
    if (searchOpen) {
      if (value.length > 0) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    }
  };

  const handleClose = () => {
    setSearchOpen(false);
    setShowBtn(false);
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchDataFucn();
    }
  };

  const searchDataFucn = () => {
    if (inputValue) {
      // navigation(`/p/${searchText}/?S=${btoa(JSON.stringify(searchText))}`)

      // const handleMoveToDetail = () => {

      let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
      let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

      let obj = {
        a: "",
        b: inputValue,
        m: loginInfo?.MetalId ?? storeInit?.MetalId,
        d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
        c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
        f: {},
      };

      let encodeObj = btoa(JSON.stringify(obj))

      navigate(`/p/${inputValue}?S=${encodeObj}`);
      setInputValue("");
      setShowBtn(false);
      setSearchOpen(false);
      // navigate(`/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${searchText}?p=${encodeObj}`)

      // }
    }
  };


  const handleButtonClick = () => {
    if (showBtn) {
      searchDataFucn();
    } else if (inputValue.length < 1) {
      setShowBtn(false);
    }
  };


  //After Login Header...........
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    let isUserLogin = JSON.parse(sessionStorage.getItem("LoginUser"));
    if (
      storeinit?.IsB2BWebsite === 0 ||
      (storeinit?.IsB2BWebsite === 1 && isUserLogin === true)) {
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
      event?.ctrlKey ||     // Ctrl key
      event?.shiftKey ||    // Shift key
      event?.metaKey ||     // Meta key (Command key on macOS)
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

      // console.log("otherparamsUrl--", otherparamUrl);

      let menuEncoded = `${queryParameters}/${otherparamUrl}`;
      // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
      const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(
        menuEncoded
      )}`;

      // let d = new Date();
      // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
      navigate(url);
    }
  };

  const getMenuApi = async () => {
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalId;
    if (IsB2BWebsite === 0) {
      finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalId = loginUserDetail?.id || "0";
    }

    await GetMenuAPI(finalId)
      .then((response) => {
        setMenuData(response?.Data?.rd);
      })
      .catch((err) => console.log(err));
  };

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
    }
  };

  const handleMouseEnter = (index, param) => {
    setHoveredIndex(index);
    setExpandedMenu(index);
    setSelectedData(menuItems[index] || []);
    document.body.style.overflow = "hidden";
  };
  const handleMouseLeave = (index) => {
    setExpandedMenu(null);
    setHoveredIndex(null);
    document.body.style.overflow = "auto";
  };

  const handleLogout = () => {
    setislogin(false);
    sessionStorage.clear();
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
    // navigation('/')
    window.location.href = "/";
    // window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1400) {
        setBurgerMenu(true);
      } else {
        setBurgerMenu(false);
      }
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;

    if (width <= 1400 && width >= 767) {
      setBurgerMenu1(true);
    } else {
      setBurgerMenu1(false);
    }

    if (width <= 766 && width >= 0) {
      setMobilenav(true);
    } else {
      setMobilenav(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const location = useLocation();
  const [Menu, setMenuId] = useState('');

  const HandleMoveToMenu = (MenuId) => {
    navigation('/');
    setMenuId(MenuId);
  };

  useLayoutEffect(() => {
    const scrollToElement = () => {
      const targetElement = document.querySelector(`[name='${Menu}']`);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top;
        let top = 135;
        if (Menu === 'elveeGiftMainId') {
          top = 70;
        }

        window.scrollTo({
          top: offsetTop - top,
          behavior: 'smooth',
        });
        setMenuId('')
      }
    };

    if (Menu !== '') {
      const timeoutId = setTimeout(() => {
        scrollToElement();
        const targetElement = document.querySelector(`[name='${Menu}']`);
        if (targetElement) {
          const resizeObserver = new ResizeObserver(() => {
            scrollToElement();
          });

          resizeObserver.observe(targetElement);
          return () => resizeObserver.disconnect();
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [Menu, location.pathname]);



  return (
    <>
      <div className="el_header_main">
        {!islogin ? (
          isTabletResponsive ? (
            <>
              <div className="el_withoutL_Header_Main ">
                <ul className="el_withoutL_ul_Main_side">
                  <Menubar />
                  <div className="el_whioutL_headerDiv2_side">
                    <a href="/">
                      {compnyLogo && (
                        <img
                          src={isMobile ? compnyLogoM : compnyLogo}
                          alt="Title"
                          className="el_without_headerLogo_side"
                        />
                      )}
                    </a>
                  </div>
                  <div className="el_whioutL_headerDiv3_side">
                    <div className="el_whioutL_headerDiv3_sub2">
                      <p
                        className="elv_withoutL_login"
                        onClick={() => navigation("/LoginOption")}
                      >
                        Log In
                      </p>
                    </div>
                  </div>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="el_withoutL_Header_Main ">
                <ul className="el_withoutL_ul_Main">
                  <div className="el_whioutL_headerDiv1">
                    <li
                      className="el_whioutL_li"
                      style={{ cursor: "pointer" }}
                      // onClick={() => ScrollToView("brandsComponentID")}
                      onClick={() => HandleMoveToMenu('brandsComponentID')}
                    >
                      Our Brands
                    </li>
                    <li
                      className="el_whioutL_li"
                      style={{ cursor: "pointer" }}
                      // onClick={() => ScrollToView("elveeGiftMainId")}
                      onClick={() => HandleMoveToMenu('elveeGiftMainId')}
                    >
                      Product
                    </li>
                    <li
                      className="el_whioutL_li"
                      style={{ cursor: "pointer" }}
                      // onClick={() => ScrollToView("craftmenshipId")}
                      onClick={() => HandleMoveToMenu('craftmenshipId')}
                    >
                      Our Craftsmanship
                    </li>
                  </div >
                  <div className="el_whioutL_headerDiv2">
                    <a href='/'>
                      {compnyLogo && (
                        <img
                          src={isMobile ? compnyLogoM : compnyLogo}
                          alt="Title"
                          className="el_without_headerLogo"
                        />
                      )}
                    </a>
                  </div>
                  <div className="el_whioutL_headerDiv3">
                    <div className="el_whioutL_headerDiv3_sub1">
                      <li
                        className="el_whioutL_li"
                        style={{ cursor: "pointer" }}
                        // onClick={() => ScrollToView("mainGalleryConatinerID")}
                        onClick={() => HandleMoveToMenu('mainGalleryConatinerID123')}

                      >
                        Gallery
                      </li>
                      <li
                        className="el_whioutL_li"
                        style={{ cursor: "pointer" }}
                        // onClick={() => ScrollToView("mainSocialMediaConatinerID")}
                        onClick={() => HandleMoveToMenu('mainSocialMediaConatinerID')}

                      >
                        Social Media
                      </li>
                      <li
                        className="el_whioutL_li"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigation("/contact-us")}
                      >
                        Contact
                      </li>
                    </div>
                    <div className="el_whioutL_headerDiv3_sub2">
                      <p
                        className="elv_withoutL_login"
                        onClick={() => navigation("/LoginOption")}
                      >
                        Log In
                      </p>
                    </div>
                  </div>
                </ul >
              </div >
            </>
          )
        ) : (
          <div
            className={`${burgerMenu
              ? "elv_login_header_main_bg_active"
              : "el_login_header_main"
              }`}
          >
            {!burgerMenu ? (
              <>
                <div className="el_login_header_main_div1">
                  <a
                    href="/"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {compnyLogo && (
                      <img
                        src={isMobile ? compnyLogoM : compnyLogo}
                        alt="Title"
                        className="el_login_header_main_div1_logo"
                      />
                    )}
                  </a>
                  <ul className="el_login_header_main_div1_ul">
                    {/* {IsB2BWebsiteChek == 1 && (
                      <> */}
                    {menuItems.map((item, index) => {
                      return (
                        <li
                          className="el_Login_header_li"
                          style={{
                            textDecoration:
                              hoveredIndex === index ? "underline" : "none",
                          }}
                          key={index}
                          label={item.menuname}
                          onMouseEnter={() => {
                            handleMouseEnter(index, item);
                          }}
                          onMouseLeave={() => {
                            handleMouseLeave();
                          }}
                          onClick={(e) => {
                            handelMenu({ "menuname": item?.menuname, "key": item?.param0name, "value": item?.param0dataname }, {}, {}, e)
                            handleMouseLeave();
                          }}
                        >
                          <a href={`/p/${item?.menuname}/?M=${btoa(
                            `${item?.param0dataname}/${item?.param0name}`
                          )}`} style={{ color: 'black', textDecoration: 'none' }}>
                            {item.menuname}
                          </a>
                        </li>
                      );
                    })}
                    {/* </>
                    )} */}
                    {/* {IsB2BWebsiteChek == 1 && (
                      <> */}
                    {storeinit?.IsDesignSetInMenu == 1 && (
                      <Link
                        to={"/Lookbook"}
                        className="el_Login_header_li go-lookbook"
                        style={{
                          marginLeft: " 22px",
                          cursor: "pointer",
                          textDecoration: "none",
                          position: "relative",
                          color: "inherit"
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
                      </Link>
                      //   )}
                      // </>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Menubar />
                </div>
              </>
            )}
            {burgerMenu && (
              <a
                href="/"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {compnyLogo && (
                  <img
                    src={isMobile ? compnyLogoM : compnyLogo}
                    alt="Title"
                    className="el_login_header_main_div1_logo"
                  />
                )}
              </a>
            )}

            <ul className="el_login_header_main_div2">
              <>
                {!burgerMenu && (
                  <>
                    {/* <Tooltip title="Search"> */}
                    <li
                      className="el_login_header_main_div2_li"
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        marginBottom: "0px",
                      }}
                    // onClick={() => navigation("/account")}
                    >
                      <div
                        className={`elv_search_area ${searchOpen ? "open" : ""}`}
                      >
                        <div onClick={handleIconClick}>
                          <GoSearch
                            className="elv_search_icon"
                            color="#7D7F85"
                            fontSize="25px"
                          />
                        </div>
                        {searchOpen && (
                          <>
                            <div className="elv_search_design">
                              <input
                                className="elv_search_inp"
                                placeholder="Search..."
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                ref={inputRef}
                                onKeyDown={handleKeyDown}
                              />
                            </div>
                            <div className="elv_search_btn">
                              {/* {!showBtn ? (
                            <button
                              type='button'
                              className='elv_cancel_bar'
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              type='button'
                              className='elv_search_bar'
                              onClick={handleButtonClick}
                            >
                              Search
                            </button>
                          )} */}
                              <RxCross1 onClick={handleClose} />
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                    {/* </Tooltip> */}
                    {/* {IsB2BWebsiteChek == 1 && islogin ? (
                      <> */}
                    <Badge
                      badgeContent={wishCount}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="el_login_header_main_div2_li"
                    >
                      <Tooltip title="WishList">
                        <li
                          style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            marginTop: "0",
                          }}
                          onClick={() => navigation("/myWishList")}
                        >
                          <GoHeart
                            className="elv_heart_icon"
                            color="#7D7F85"
                            fontSize="25px"
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                    <Badge
                      badgeContent={cartCount}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="el_login_header_main_div2_li"
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={() => navigation("/CartPage")}
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
                    {/* </>
                    ) : null} */}
                  </>
                )}
              </>
              {burgerMenu1 && (
                <li
                  className="el_login_header_main_div2_li_respo"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    marginTop: "6px",
                  }}
                // onClick={() => navigation("/account")}
                >
                  <div
                    className={`elv_search_area_respo ${searchOpen ? "open" : ""
                      }`}
                  >
                    <div onClick={handleIconClick}>
                      <GoSearch className="elv_search_icon_respo" />
                    </div>
                    {searchOpen && (
                      <>
                        <div className="elv_search_design_respo">
                          <input
                            className="elv_search_inp"
                            placeholder="Search..."
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                        <div className="elv_search_btn_respo">
                          {/* {!showBtn ? (
                        <button
                          type='button'
                          className='elv_cancel_bar_respo'
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='elv_search_bar_respo'
                          onClick={handleButtonClick}
                        >
                          Search
                        </button>
                      )} */}
                          <RxCross1 onClick={handleClose} />
                        </div>
                      </>
                    )}
                  </div>
                </li>
              )}
              {mobilenav && (
                <li
                  className={
                    mobilenav
                      ? "el_login_header_main_div2_li_respo_1"
                      : "el_login_header_main_div2_li_respo_1_hidden"
                  }
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    marginTop: "6px",
                  }}
                // onClick={() => navigation("/account")}
                >
                  <div onClick={handleIconClick}>
                    <GoSearch className="elv_search_icon_respo_1" />
                  </div>
                  {searchOpen && (
                    <>
                      <div
                        className={`elv_search_area_respo_1 ${searchOpen ? "open" : ""
                          }`}
                      >
                        <div className="elv_search_design_respo_1">
                          <input
                            className="elv_search_inp"
                            placeholder="Search..."
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                        <div className="elv_search_btn_respo_1">
                          {/* {!showBtn ? (
                        <button
                          type='button'
                          className='elv_cancel_bar_respo_1'
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='elv_search_bar_respo_1'
                          onClick={handleButtonClick}
                        >
                          Search
                        </button>
                      )} */}
                          <RxCross1 onClick={handleClose} />
                        </div>
                      </div>
                    </>
                  )}
                </li>
              )}
              {/* {storeinit?.IsPLW == 0 && (IsB2BWebsiteChek == 1 && islogin) ? (
                <> */}
              <Tooltip title="Account">
                <li
                  className="el_login_header_main_div2_li"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    marginTop: "0",
                  }}
                  onClick={() => navigation("/account")}
                >
                  <IoPersonOutline
                    className="elv_person_icon"
                    color="#7D7F85"
                    fontSize="25px"
                  />
                </li>
              </Tooltip>
              {/* </>
              ) : null} */}

              <li
                className="el_login_header_main_div2_li"
                style={{ cursor: "pointer", marginTop: "0" }}
                onClick={handleLogout}
              >
                <FaPowerOff className="elv_power_icon" />
              </li>
            </ul>
          </div>
        )}

        <div
          className={`el_shop_dropdown ${expandedMenu !== null ? "open" : ""}`}
          onMouseEnter={() => handleMouseEnter(hoveredIndex)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleMouseLeave()}
        >
          <div
            className={`el_shop_dropdown_1 ${expandedMenu !== null ? "open" : ""
              }`}
          >
            <img
              src={`${storImagePath()}/images/Menu/Menu1.jpg`}
              alt="Image 1"
              class="dropdown-image-1"
            />
            <img
              src={`${storImagePath()}/images/Menu/Menu2.jpg`}
              alt="Image 2"
              class="dropdown-image-2"
            />
          </div>
          <div
            style={{
              display: "flex",
              padding: "50px",
              color: "#7d7f85",
              // backgroundColor: "rgba(255, 255, 255, 0.8)",
              // flexDirection: "column",
              gap: "50px",
              justifyContent: "space-between",
            }}
            className="menuDropdownData"
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "60px",
                textTransform: "uppercase",
                maxWidth: '70rem',
                overflowX: 'auto',
                scrollbarWidth: "thin",
                msOverflowStyle: "none",
              }}
            >
              {selectedData?.param1?.map((param1Item, param1Index) => {
                return (
                  <div key={param1Index}>
                    <span
                      className="level1MenuData"
                      key={param1Index}
                      style={{
                        fontSize: "14px",
                        textDecoration: "underline",
                        marginBottom: "10px",
                        // fontFamily: '"PT Sans", sans-serif',
                        color: "black",
                        textAlign: "start",
                        letterSpacing: 1,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}

                      onClick={(e) =>
                        handelMenu({ "menuname": selectedData?.menuname, "key": selectedData?.param0name, "value": selectedData?.param0dataname }, { "key": param1Item.param1name, "value": param1Item.param1dataname }, {}, e
                        )
                      }
                    >
                      <a
                        href={`/p/${selectedData?.param0dataname}/${param1Item.param1dataname
                          }/?M=${btoa(
                            `${selectedData?.param0dataname},${param1Item?.param1dataname}/${selectedData?.param0name},${param1Item?.param1name}`
                          )}`}
                        style={{ color: 'black', textDecoration: 'none' }}
                      >
                        {param1Item?.param1dataname}
                      </a>
                    </span>
                    <div
                      style={{
                        height: "300px",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        marginLeft: "15px",
                      }}
                    >
                      {param1Item?.param2?.map((param2Item, param2Index) => {
                        return (
                          <p
                            className="level2menuData"
                            key={param2Index}
                            onClick={(e) =>
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
                              )
                            }
                            style={{
                              fontSize: "14px",
                              margin: "3px 15px 3px 0px",
                              // fontFamily: '"PT Sans", sans-serif',
                              letterSpacing: 0.4,
                              textAlign: "start",
                              cursor: "pointer",
                              textTransform: "capitalize",
                              paddingRight: "15px",
                            }}
                          >
                            <a
                              href={`/p/${selectedData?.param0dataname}/${param1Item.param1dataname
                                }/${param2Item.param2dataname}/?M=${btoa(
                                  `${selectedData?.param0dataname},${param1Item.param1dataname},${param2Item.param2dataname}/${selectedData?.param0name},${param1Item.param1name},${param2Item.param2name}`
                                )}`}
                              style={{ color: 'black', textDecoration: 'none' }}
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
        </div>

      </div >
    </>

  );
};

reportWebVitals(console.log);

export default Header;
