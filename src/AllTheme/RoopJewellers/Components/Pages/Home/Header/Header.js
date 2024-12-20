import React, { useEffect, useRef, useState } from "react";
import "./Header.modul.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Badge,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { PiStarThin } from "react-icons/pi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import pako from "pako";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GoHeart } from "react-icons/go";
import CartDrawer from "../../Cart/CartPageB2c/Cart";
import useCountdown from "../../CountDownTimer/CountDownTimer";
import {
  roop_cartB2CDrawer,
  roop_CartCount,
  roop_CartNo,
  roop_companyLogo,
  roop_companyLogoM,
  roop_loginState,
  roop_WishCount,
} from "../../../Recoil/atom";
import { MdAccountBox } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const setCartOpenState = useSetRecoilState(roop_cartB2CDrawer);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderFixedDropShow, setIsHeaderFixedDropShow] = useState(false);
  const maxWidth1200 = useMediaQuery('(max-width: 1200px)');
  const maxWidth425 = useMediaQuery('(max-width: 425px)');
  const maxWidth500 = useMediaQuery('(max-width: 500px)');

  const compnyLogo = useRecoilValue(roop_companyLogo);
  const compnyLogoM = useRecoilValue(roop_companyLogoM);
  const [islogin, setislogin] = useRecoilState(roop_loginState);
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [cartCountNum, setCartCountNum] = useRecoilState(roop_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(roop_WishCount);

  const [searchText, setSearchText] = useState("");
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
  const IsCartNo = storeinit?.CartNo;
  const location = useLocation();
  const cartTheameNo = useRecoilValue(roop_CartNo);

  let navigate = useNavigate();
  let cookie = Cookies.get("visiterId");

  const [serachsShowOverlay, setSerachShowOverlay] = useState(false);
  const navigation = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

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

  const { showTimer, countdown } = useCountdown();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
      setIsHeaderFixedDropShow(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log("showtimejhjdhsjhjf", showTimer, countdown);

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
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
      setIsHeaderFixedDropShow(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = () => {
    const value = JSON.parse(sessionStorage.getItem("LoginUser"));
    setislogin(value);
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

  const handleLogout = () => {
    navigation("/");
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef(null);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    if (divRef.current) {
      divRef.current.scrollTo(0, 0);
    }
  };

  const toggleOverlay = () => {
    setSerachShowOverlay(prev => !prev);
  };

  const [drawerShowOverlay, setDrawerShowOverlay] = useState(false);
  const toggleDrawerOverlay = () => {
    setDrawerShowOverlay(!drawerShowOverlay);
  };

  const handelMenu = (param, param1, param2, event) => {
    console.log('event: ', event);
    console.log('param2: ', param2);
    console.log('param1: ', param1);
    console.log('param: ', param);
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
      setDrawerShowOverlay(false);
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
        .filter(Boolean)
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
      handleDropdownClose();
      navigate(url);
    }
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
    navigation(`/productpage`, {
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

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
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
      setSerachShowOverlay(false);
    }
  }

  // for cart drawer

  const toggleCartDrawer = () => {
    // setTimeout(() => {
    if (cartTheameNo == 3) {
      setIsCartOpen((prevState) => !prevState);
      const isCartDrawerOpen = JSON.parse(
        sessionStorage.getItem("isCartDrawer")
      );
      sessionStorage.setItem("isCartDrawer", !isCartDrawerOpen);
      setCartOpenState((prevState) => !prevState);
      setDrawerShowOverlay(false);
    } else {
      navigate("/cartPage");
    }
    // }, 500);
  };

  const handleContextMenu = (e) => { };

  const handleMouseDown = (e) => {
    // console.log("rrrrrrrrrrrrrrrrrrr", e);
    if (e.button === 1) {
    }
  };

  const hanldeStaticPageNavigation = (event, path) => {
    if (
      event?.ctrlKey ||
      event?.shiftKey ||
      event?.metaKey ||
      (event?.button && event?.button === 1)
    ) {
      return;
    } else {
      event?.preventDefault();
      navigation(path);
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="roop_headerMain_div">
      {serachsShowOverlay && (
        <>
          <div className="roop_smlingSearchoverlay">
            <div className="roop_smlingSearchoverlay_div">
              <div className={`roop_smlingTopSerachOver ${serachsShowOverlay ? "active" : ""}`}>
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
                <div className="roop_search_div">
                  <input
                    type="text"
                    placeholder="Enter Design Number"
                    value={searchText}
                    autoFocus
                    onChange={(e) => setSearchText(e.target.value)}
                    className="roop_serachinputBoxOverly"
                    onKeyDown={searchDataFucn}
                  />
                  <IoSearchOutline
                    onClick={() => clickSearch()}
                    style={{ height: "25px", width: "25px", marginRight: "10px" }}
                  />
                </div>
              </div>
            </div>

            {/* <div
              className={`roop_smlingSearchoverlayNew ${isHeaderFixedDropShow ? "fixed" : ""
                }`}
            >
              <div className="roop_smlingTopSerachOver-Fixed">
                <IoSearchOutline
                  style={{ height: "15px", width: "15px", marginRight: "10px" }}
                />
                <input
                  type="text"
                  placeholder="Enter Design Number"
                  value={searchText}
                  autoFocus
                  onChange={(e) => setSearchText(e.target.value)}
                  className="roop_serachinputBoxOverly"
                  onKeyDown={searchDataFucn}
                />
                <IoClose
                  style={{
                    height: "30px",
                    width: "30px",
                    color: "#7d7f85",
                    cursor: "pointer",
                  }}
                  onClick={toggleOverlay}
                />
              </div>
            </div> */}
          </div>
        </>
      )
      }

      {maxWidth1200 && (
        <>
          {drawerShowOverlay && (
            <>
              <div className="roop_MobileSiderBarMain">
                <div
                  style={{
                    margin: "20px 10px 0px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="roop_mobileHeader_top_div1">
                    <IoClose
                      style={{
                        height: "30px",
                        width: "30px",
                        color: "black",
                        // color: "white",
                        cursor: "pointer",
                      }}
                      onClick={toggleDrawerOverlay}
                    />
                  </div>
                  {!maxWidth500 && (
                    <div className="roop_mobileHeader_top_div2">
                      <a href="/">
                        <img
                          src={compnyLogo}
                          loading="lazy"
                          className="roop_logo_header"
                          alt="roop_logo_header-mobile"
                        />
                      </a>
                    </div>
                  )}

                  {maxWidth500 && (
                    <div className="roop_mobileHeader_top_div2">
                      <a href="/">
                        <img
                          src={compnyLogoM}
                          loading="lazy"
                          className="roop_logo_header"
                          alt="roop_logo_header-mobile-500"
                        />
                      </a>
                    </div>
                  )}

                  <div className="roop_mobileHeader_top_div3">
                    {IsB2BWebsiteChek == 0 ? (
                      <>
                        <Badge
                          badgeContent={wishCountNum}
                          max={1000}
                          overlap={"rectangular"}
                          color="secondary"
                          className="badgeColorFix roop_mobileHideIcone"
                          style={{ marginInline: "5px" }}
                        >
                          <Tooltip title="WishList">
                            <li
                              className="nav_li_smining_Icone"
                              onClick={() => navigation("/myWishList")}
                            >
                              <GoHeart
                                style={{
                                  height: "25px",
                                  cursor: "pointer",
                                  width: "25px",
                                  fontWeight: "600",
                                  // color: "#D14A61"
                                }}
                              />
                            </li>
                          </Tooltip>
                        </Badge>
                        {/* <li
                          className="nav_li_smining_Icone roop_mobileHideIcone"
                          onClick={toggleOverlay}
                          style={{}}
                        >
                          <IoSearchOutline
                            style={{
                              height: "23px",
                              cursor: "pointer",
                              width: "23px",
                            }}
                          />
                        </li> */}
                        <Badge
                          badgeContent={cartCountNum}
                          max={1000}
                          overlap={"rectangular"}
                          color="secondary"
                          className="badgeColorFix roop_mobileHideIcone"
                          style={{ marginInline: "15px" }}
                        >
                          <Tooltip title="Cart">
                            <li
                              onClick={
                                IsCartNo == 3
                                  ? toggleCartDrawer
                                  : () => navigate("/cartPage")
                              }
                              className="nav_li_smining_Icone"
                            >
                              <ShoppingCartOutlinedIcon
                                sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                              />
                            </li>
                          </Tooltip>
                        </Badge>
                      </>
                    ) : (
                      <>
                        {islogin && (
                          <>
                            <Badge
                              badgeContent={wishCountNum}
                              max={1000}
                              overlap={"rectangular"}
                              color="secondary"
                              className="badgeColorFix roop_mobileHideIcone"
                              style={{ marginInline: "5px" }}
                            >
                              <Tooltip title="WishList">
                                <li
                                  className="nav_li_smining_Icone"
                                  onClick={() => navigation("/myWishList")}
                                >
                                  <GoHeart
                                    style={{
                                      height: "25px",
                                      cursor: "pointer",
                                      width: "25px",
                                      fontWeight: "600",
                                      // color: "#D14A61"
                                    }}
                                  />
                                </li>
                              </Tooltip>
                            </Badge>
                            {/* <li
                              className="nav_li_smining_Icone roop_mobileHideIcone"
                              onClick={toggleOverlay}
                              style={{}}
                            >
                              <IoSearchOutline
                                style={{
                                  height: "23px",
                                  cursor: "pointer",
                                  width: "23px",
                                }}
                              />
                            </li> */}
                            <Badge
                              badgeContent={cartCountNum}
                              max={1000}
                              overlap={"rectangular"}
                              color="secondary"
                              className="badgeColorFix roop_mobileHideIcone"
                              style={{ marginInline: "15px" }}
                            >
                              <Tooltip title="Cart">
                                <li
                                  onClick={
                                    IsCartNo == 3
                                      ? toggleCartDrawer
                                      : () => navigate("/cartPage")
                                  }
                                  className="nav_li_smining_Icone"
                                >
                                  <ShoppingCartOutlinedIcon
                                    sx={{ height: "25px", width: "25px", cursor: "pointer", }}
                                  />
                                </li>
                              </Tooltip>
                            </Badge>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {IsB2BWebsiteChek === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid black",
                      // border: "1px solid white",
                      alignItems: "center",
                      height: "40px",
                      justifyContent: "center",
                      marginInline: "5px",
                      paddingBlock: "15px",
                      marginBottom: "10px",
                      paddingInline: "8px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      // autoFocus
                      onChange={(e) => setSearchText(e.target.value)}
                      className="mobileSideBarSearch"
                      onKeyDown={searchDataFucn}
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent",
                        fontWeight: 500,
                        // color: "white",
                        color: "black",
                        fontSize: "17px",
                      }}

                    />
                    <IoSearchOutline
                      onClick={() => clickSearch()}
                      style={{
                        height: "20px",
                        cursor: "pointer",
                        // color: "white",
                        color: "black",
                        width: "20px",
                        marginInline: "5px",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    {islogin && (
                      <div
                        style={{
                          display: "flex",
                          // border: "1px solid white",
                          border: "1px solid black",
                          alignItems: "center",
                          height: "40px",
                          justifyContent: "center",
                          marginInline: "5px",
                          paddingBlock: "15px",
                          marginBottom: "10px",
                          paddingInline: "8px",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchText}
                          // autoFocus
                          onChange={(e) => setSearchText(e.target.value)}
                          className="mobileSideBarSearch"
                          onKeyDown={searchDataFucn}
                          style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                            fontWeight: 500,
                            // color: "white",
                            color: "black",
                            fontSize: "17px",
                          }}

                        />
                        <IoSearchOutline
                          onClick={() => clickSearch()}
                          style={{
                            height: "20px",
                            cursor: "pointer",
                            // color: "white",
                            color: "black",
                            width: "20px",
                            marginInline: "5px",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="roop_mobileMenuSubDivMain">
                  <List
                    className="roop_ListMenuSiderMobile"
                    sx={{ paddingTop: "0", marginBottom: "0px", marginTop: "15px" }}
                  >
                    {menuItems.map((menuItem, index) => (
                      <div key={menuItem.menuid || index}>
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
                          // onClick={(e) => {
                          //   handelMenu(
                          //     { menuname: menuItem?.menuname, key: menuItem?.param0name, value: menuItem?.param0dataname },
                          //     {},
                          //     {},
                          //     e
                          //   );
                          // }}
                          style={{ width: "100%" }}
                        >
                          <ListItem
                            style={{
                              padding: "5px",
                              borderBottom: "1px solid black",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <p className="roop_menuStaicMobile">
                              {menuItem.menuname}
                            </p>
                            {selectedMenu === menuItem.menuname ? (
                              <KeyboardArrowUpIcon style={{ fontSize: '20px', color: 'black' }} />
                            ) : (
                              <KeyboardArrowDownIcon style={{ fontSize: '20px', color: 'black' }} />
                            )}
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
                                <button className="roop_mobile_viewAllBtn">
                                  View All
                                </button>
                              </div>
                            </ButtonBase>
                            <List className="roop_mobileMenuScroll">
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
                                        color: "black",
                                        // color: "white",
                                      }}
                                    >
                                      {subMenuItem.param1dataname}
                                    </p>
                                  </ButtonBase>
                                  {/* {selectedSubMenu === subMenuItem.param1dataname && ( */}
                                  {/* {selectedMenu === menuItem.menuname && (
                                  <>
                        <div style={{ paddingLeft: '10px' }}>
                                    <button class="underline-button" onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)}>View All</button>
                                  </div>
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
                                            <p className="roop_mobile_subMenu">
                                              {subSubMenuItem.param2dataname}
                                            </p>
                                          </ButtonBase>
                                        )
                                      )}
                                    </List>
                                  </>
                                )} */}
                                </div>
                              ))}
                            </List>
                          </>
                        )}
                      </div>
                    ))}
                  </List>
                </div>
                {IsB2BWebsiteChek === 1 ? (
                  islogin === true ? (
                    <>
                      {storeinit?.IsDesignSetInMenu == 1 && (
                        <p
                          className="roop_menuStaicMobilePageLink"
                          style={{ marginTop: "10px" }}
                          onClick={() => {
                            setDrawerShowOverlay(false);
                            navigation("/Lookbook");
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
                        className="roop_menuStaicMobilePageLink"
                        style={{ marginTop: "10px" }}
                        onClick={() => {
                          setDrawerShowOverlay(false);
                          navigation("/Lookbook");
                        }}
                      >
                        {storeinit?.DesignSetInMenu}
                        {/* LOOKBOOK */}
                      </p>
                    )}
                  </>
                )}

                <div>
                  <p className="roop_menuStaicMobilePageLink">About us</p>
                </div>

                {IsB2BWebsiteChek === 0 ? (
                  <>
                    {!islogin && (
                      <div>
                        <p
                          className="roop_menuStaicMobilePageLink"
                          style={{ cursor: "pointer" }}
                          onClick={() => { navigation("/LoginOption"); setDrawerShowOverlay(false); }}
                        >
                          Log In
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {!islogin && (
                      <div>
                        <p
                          className="roop_menuStaicMobilePageLink"
                          style={{ cursor: "pointer" }}
                          onClick={() => { navigation("/LoginOption"); setDrawerShowOverlay(false); }}
                        >
                          Log In
                        </p>
                      </div>
                    )}
                  </>
                )}


                {/* {islogin == true && (
                <div>
                  <p
                    className="roop_menuStaicMobilePageLink"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      setDrawerShowOverlay(false);
                      navigation("/myWishList");
                    }}
                  >
                    WishList
                  </p>
                </div>
              )} */}



                {islogin && (
                  <>
                    <div>
                      <p
                        className="roop_menuStaicMobilePageLink"
                        onClick={() => {
                          setDrawerShowOverlay(false);
                          navigation("/account");
                        }}
                      >
                        Account
                      </p>
                    </div>
                    <div>
                      <p
                        className="roop_menuStaicMobilePageLink"
                        onClick={() => {
                          setDrawerShowOverlay(false);
                          handleLogout();
                        }}
                      >
                        Log Out
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}

      <div className="roop_Top_header">
        <div className="roop_header_top_line">
          <p className="roop_header_top_line_text" aria-labelledby="title">
            {/* For Vara */}
            {/* Welcome To Vara Jewels Offical Website */}

            {/* For Shinjini */}
            {/* Welcome To Shinjini Jewels Offical Website */}
            {/* Welcome To Roop Jewellers's Offical Website */}
          </p>
        </div>
        {!maxWidth1200 && (
          <div className={`roop_Top_header_sub ${isHeaderFixed ? "roop_Top_Header_fixed_main fixed" : ""}`}>
            <div className="roop_Top2_header_div1">
              <a href="/" className="roop_desk_logo">
                <img
                  src={compnyLogo}
                  loading="lazy"
                  className="roop_logo_header"
                  alt="roop_logo_header-mobile-1200"
                />
              </a>
            </div>
            {/* <div className="roop_Top2_header_div2">
             <div className="roop_smlingTopSerachOver">
               <IoSearchOutline
                 style={{ height: "15px", width: "15px", marginRight: "10px" }}
               />
               <input
                 type="text"
                 placeholder="Enter Design Number"
                 value={searchText}
                 autoFocus
                 onChange={(e) => setSearchText(e.target.value)}
                 className="roop_serachinputBoxOverly"
                 onKeyDown={searchDataFucn}
               />
             </div>
           </div> */}
            <div className="roop_Top2_header_div2">
              <ul role="menu" className="roop_header_menu">
                {menuItems.map((item, index) => {
                  const { menuname, param1, param2 } = item;
                  return (
                    <li
                      role="menuitem"
                      className="roop_header_li"
                      key={index}
                      label={item.menuname}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={`/p/${item?.menuname}/?M=${btoa(`${item?.param0dataname}/${item?.param0name}`)}`}
                        className="roop_header_link"
                        onClick={(e) => {
                          handelMenu(
                            {
                              menuname: item.menuname,
                              key: item?.param0name,
                              value: item?.param0dataname,
                            },
                            {},
                            {},
                            e
                          )
                        }}
                      >
                        {item.menuname}
                      </Link>
                      {param1 && param1.length > 0 && param1[0].param1name !== "" && (
                        <ul className="submenu-rp" role="listbox">
                          {param1.map(({ param1dataname, param1name }, j) => (
                            <li role="menuitem" key={j}>
                              <span
                                onClick={(e) => {
                                  handelMenu(
                                    {
                                      menuname: item.menuname,
                                      key: item?.param0name,
                                      value: item?.param0dataname,
                                    },
                                    {
                                      key: param1name,
                                      value: param1dataname,
                                    },
                                    {},
                                    e
                                  );

                                  window.scrollTo({
                                    behavior: "smooth",
                                    top: 0,
                                    left: 0,
                                  });
                                }}
                                role="link"
                                className="submenu-link"
                              >
                                {param1dataname}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {IsB2BWebsiteChek === 1 ? (
                islogin === true ? (
                  storeinit?.IsDesignSetInMenu == 1 && (
                    <li
                      className="nav_li_smining_Fixed nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                    >
                      <a href="/Lookbook" className="roop_A_linkFixed">
                        {storeinit?.DesignSetInMenu}
                      </a>
                    </li>
                  )
                ) : null
              ) : (
                storeinit?.IsDesignSetInMenu == 1 && (
                  <li
                    className="nav_li_smining_Fixed nav_li_smining_Mobile"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                  >
                    <a href="/Lookbook" className="roop_A_linkFixed">
                      {storeinit?.DesignSetInMenu}
                    </a>
                  </li>
                )
              )}
            </div>
            <div className="roop_Top2_header_div3">
              <ul className="nav_ul_shop">
                {IsB2BWebsiteChek == 0 ? (
                  <>
                    <Badge
                      badgeContent={wishCountNum}
                      max={1000}
                      overlap="rectangular"
                      color="primary"
                      // style={{ backgroundColor: '#D14A61', color: '#fff' }}
                      className="badgeColorFix roop_mobileHideIcone custom-badge"
                    >
                      <Tooltip title="WishList">
                        <li
                          className="nav_li_smining_Icone"
                          onClick={() => navigation("/myWishList")}
                        >
                          <GoHeart
                            style={{
                              height: "25px",
                              cursor: "pointer",
                              width: "25px",
                              // fontWeight: "600",
                              // color: "#D14A61",
                            }}
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                    <Tooltip title="Search">
                      <li
                        className="nav_li_smining_Icone roop_mobileHideIcone"
                        onClick={toggleOverlay}
                        style={{}}
                      >
                        <IoSearchOutline
                          style={{
                            height: "23px",
                            cursor: "pointer",
                            width: "23px",
                          }}
                        />
                      </li>
                    </Tooltip>
                    <Badge
                      badgeContent={cartCountNum}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="badgeColorFix roop_mobileHideIcone"
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={IsCartNo == 3 ? toggleCartDrawer : () => navigate("/cartPage")}
                          className="nav_li_smining_Icone"
                        >
                          <ShoppingCartOutlinedIcon
                            sx={{ height: "25px", width: "25px", cursor: "pointer", }}
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                  </>
                ) : (
                  islogin && (
                    <>
                      <Badge
                        badgeContent={wishCountNum}
                        max={1000}
                        overlap={"rectangular"}
                        color="secondary"
                        className="badgeColorFix roop_mobileHideIcone"
                      >
                        <Tooltip title="WishList">
                          <li
                            className="nav_li_smining_Icone"
                            onClick={() => navigation("/myWishList")}
                          >
                            <GoHeart
                              style={{
                                height: "25px",
                                cursor: "pointer",
                                width: "25px",
                              }}
                            />
                          </li>
                        </Tooltip>
                      </Badge>
                      <Tooltip title="Search">
                        <li
                          className="nav_li_smining_Icone roop_mobileHideIcone"
                          onClick={toggleOverlay}
                          style={{}}
                        >
                          <IoSearchOutline
                            style={{
                              height: "23px",
                              cursor: "pointer",
                              width: "23px",
                            }}
                          />
                        </li>
                      </Tooltip>
                      <Badge
                        badgeContent={cartCountNum}
                        max={1000}
                        overlap={"rectangular"}
                        color="secondary"
                        className="badgeColorFix roop_mobileHideIcone"
                      >
                        <Tooltip title="Cart">
                          <li
                            onClick={IsCartNo == 3 ? toggleCartDrawer : () => navigate("/cartPage")}
                            className="nav_li_smining_Icone"
                          >
                            <ShoppingCartOutlinedIcon
                              sx={{ height: "25px", width: "25px", cursor: "pointer" }}
                            />
                          </li>
                        </Tooltip>
                      </Badge>
                    </>
                  )
                )}

                {islogin ? (
                  <Tooltip title="Account">
                    <li
                      className="nav_li_smining_Icone"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigation("/account")}
                    >
                      <MdAccountCircle size={25} />
                    </li>
                  </Tooltip>
                ) : (
                  <li
                    className="nav_li_roop"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigation("/LoginOption")}
                  >
                    LOG IN
                  </li>
                )}

                {islogin && (
                  <Tooltip title="Logout">
                    <li
                      className="nav_li_roop"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLogout()}
                    >
                      <IoLogOut style={{
                        height: "25px",
                        cursor: "pointer",
                        width: "25px",
                      }} />
                    </li>
                  </Tooltip>
                )}
              </ul>
            </div>
          </div>
        )}

        {maxWidth1200 && (
          <div className={`roop_top_header3 ${isHeaderFixed ? "roop_Top_Header_fixed_main fixed" : ""}`}>
            {/* <div className="roop_top_header3"> */}

            <div className="roop_top_header3_logo_Web">
              <a href="/">
                <img
                  src={compnyLogo}
                  loading="lazy"
                  className="roop_logo_header"
                  style={{
                    visibility: !drawerShowOverlay ? "visible" : "hidden",
                  }}
                  alt="roop_logo_header-mobile-1200"
                />
              </a>
            </div>


            <div className="roop_top_header3_logo_mobile">
              <a href="/">
                <img
                  src={compnyLogoM}
                  loading="lazy"
                  className="roop_logo_header"
                  style={{
                    visibility: !drawerShowOverlay ? "visible" : "hidden",
                  }}
                  alt="roop_logo_header-mobile-mobile"
                />
              </a>
            </div>

            <ul className="nav_ul_shop_menu_Mobile">
              <MenuIcon
                style={{ fontSize: "35px", color: "black" }}
                className="muIconeMobileHeader"
                onClick={toggleDrawerOverlay}
              />
            </ul>
            {/* {IsB2BWebsiteChek == 1 ? (
                islogin == true ? (
                  <li
                    className="nav_li_roop nav_li_smining_shop"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <span
                      className="nav_li_roop"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      SHOP
                      <RiArrowDropDownLine
                        style={{ width: "20px", height: "20px" }}
                      />
                    </span>
                  </li>
                ) : (
                  ""
                )
              ) : (
                <li
                  className="nav_li_roop nav_li_smining_shop"
                  onMouseEnter={handleDropdownOpen}
                  onMouseLeave={handleDropdownClose}
                >
                  <span
                    className="nav_li_roop"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    SHOP
                    <RiArrowDropDownLine
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>
                </li>
              )} */}

            {/* <li
                className="nav_li_roop nav_li_smining_Mobile"
                style={{ cursor: "pointer" }}
                onClick={(event) => hanldeStaticPageNavigation(event, "/aboutUs")}
              >
                <a href="/aboutUs" className="stam_A_link">
                  ABOUT US
                </a>
              </li> */}

            {/* <li
                className="nav_li_roop nav_li_smining_Mobile"
                style={{ cursor: "pointer" }}
                onClick={(event) =>
                  hanldeStaticPageNavigation(event, "/servicePolicy")
                }
              >
                <a href="/servicePolicy" className="stam_A_link">
                  SERVICE POLICY
                </a>
              </li> */}

            {/* <li
                className="nav_li_roop nav_li_smining_Mobile"
                style={{ cursor: "pointer" }}
                onClick={(event) =>
                  hanldeStaticPageNavigation(event, "/ExpertAdvice")
                }
              >
                <a href="/ExpertAdvice" className="stam_A_link">
                  EXPERT ADVICE
                </a>
              </li> */}
          </div>
        )}

        {/* <div
          className={`stam_Top_Header_fixed_main ${isHeaderFixed ? "fixed" : ""
            }  ${serachsShowOverlay ? "searchoverly" : ""}`}
        >
          <div className="stam_Top_header_sub" style={{ width: "100%" }}>
            <div className="smiling_Top_header_div2">
              <a href="/">
                <img
                  src={compnyLogo}
                  loading="lazy"
                  className="roop_logo_header_Fixed"
                />
              </a>
            </div>
            <div className="smiling_Top_header_div1">
              <ul className="nav_ul_shop">
                {IsB2BWebsiteChek == 1 ? (
                  islogin == true ? (
                    <li
                      className="nav_li_smining_Fixed nav_li_smining_shop"
                      onMouseEnter={handleDropdownOpen}
                      onMouseLeave={handleDropdownClose}
                    >
                      <span
                        className="nav-li-smining"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        SHOP
                        <RiArrowDropDownLine
                          style={{ width: "20px", height: "20px" }}
                        />
                      </span>
                    </li>
                  ) : (
                    ""
                  )
                ) : (
                  <li
                    className="nav_li_smining_Fixed nav_li_smining_shop"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <span
                      className="nav-li-smining"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      SHOP
                      <RiArrowDropDownLine
                        style={{ width: "20px", height: "20px" }}
                      />
                    </span>
                  </li>
                )}



                {IsB2BWebsiteChek === 1 ? (
                  islogin === true ? (
                    <>
                      {storeinit?.IsDesignSetInMenu == 1 &&
                        <li
                          className="nav_li_smining_Fixed nav_li_smining_Mobile"
                          style={{ cursor: "pointer" }}
                          onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                        >
                          <a href="/Lookbook" className="roop_A_linkFixed">
                            {storeinit?.DesignSetInMenu}
                          </a>
                        </li>
                      }
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  <>
                    {storeinit?.IsDesignSetInMenu == 1 &&
                      <li
                        className="nav_li_smining_Fixed nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                      >
                        <a href="/Lookbook" className="roop_A_linkFixed">
                          {storeinit?.DesignSetInMenu}
                        </a>
                      </li>
                    }
                  </>
                )}

                <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/servicePolicy")}
                >
                  <a href="/servicePolicy" className="roop_A_linkFixed">
                    SERVICE POLICY
                  </a>
                </li>

                <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/ExpertAdvice")}
                >
                  <a href="/ExpertAdvice" className="roop_A_linkFixed">
                    EXPERT ADVICE
                  </a>
                </li>

                <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/FunFact")}
                >
                  <a href="/FunFact" className="roop_A_linkFixed">
                    FUN FACT
                  </a>
                </li>

                <ul className="nav_ul_shop_menu_Mobile">
                  <MenuIcon
                    style={{ fontSize: "35px", color: "#7d7f85" }}
                    className="muIconeMobileHeader"
                    onClick={toggleDrawerOverlay}
                  />
                </ul>
              </ul>
            </div>

            <div className="smiling_Top_header_div3">
              <ul className="nav_ul_shop">
                <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/aboutUs")}
                >
                  <a href="/aboutUs" className="roop_A_linkFixed">
                    ABOUT US
                  </a>
                </li>

                {storeinit?.IsPLW == 0 && IsB2BWebsiteChek == 0 ? (
                  <>
                    {
                      (islogin === true) && <li
                        className="nav_li_smining_Fixed nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigation("/account")}
                      >
                        ACCOUNT
                      </li>
                    }
                  </>
                ) : (
                  islogin && (
                    <li
                      className="nav_li_smining_Fixed nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigation("/account")}
                    >
                      ACCOUNT
                    </li>
                  )
                )}

                {islogin ? (
                  <li
                    className="nav_li_smining_Fixed nav_li_smining_Mobile"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </li>
                ) : (
                  <li
                    className="nav_li_smining_Fixed"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigation("/LoginOption")}
                  >
                    LOG IN
                  </li>
                )}

                {IsB2BWebsiteChek == 0 ? (
                  <>
                    <Badge
                      badgeContent={wishCountNum}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="badgeColor roop_mobileHideIcone"
                    >
                      <Tooltip title="WishList">
                        <li
                          className="nav_li_smining_Fixed_Icone roop_mobileHideIcone"
                          onClick={() => navigation("/myWishList")}
                        >
                          <GoHeart
                            style={{
                              height: "20px",
                              cursor: "pointer",
                              width: "20px",
                            }}
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                    <li
                      className="nav_li_smining_Fixed_Icone roop_mobileHideIcone"
                      onClick={toggleOverlay}
                      style={{}}
                    >
                      <IoSearchOutline
                        style={{
                          height: "20px",
                          cursor: "pointer",
                          width: "20px",
                        }}
                      />
                    </li>
                    <Badge
                      badgeContent={cartCountNum}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="badgeColor"
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={toggleCartDrawer}
                          className="nav_li_smining_Fixed_Icone"
                        >
                          <ShoppingCartOutlinedIcon
                            sx={{ height: "30px", width: "30px" }}
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                  </>
                ) : (
                  islogin && (
                    <>
                      <Badge
                        badgeContent={wishCountNum}
                        max={1000}
                        overlap={"rectangular"}
                        color="secondary"
                        className="badgeColor roop_mobileHideIcone"
                      >
                        <Tooltip title="WishList">
                          <li
                            className="nav_li_smining_Fixed_Icone roop_mobileHideIcone"
                            onClick={() => navigation("/myWishList")}
                          >
                            <GoHeart
                              style={{
                                height: "20px",
                                cursor: "pointer",
                                width: "20px",
                              }}
                            />
                          </li>
                        </Tooltip>
                      </Badge>
                      <li
                        className="nav_li_smining_Fixed_Icone roop_mobileHideIcone"
                        onClick={toggleOverlay}
                        style={{}}
                      >
                        <IoSearchOutline
                          style={{
                            height: "20px",
                            cursor: "pointer",
                            width: "20px",
                          }}
                        />
                      </li>
                      <Badge
                        badgeContent={cartCountNum}
                        max={1000}
                        overlap={"rectangular"}
                        color="secondary"
                        className="badgeColor"
                      >
                        <Tooltip title="Cart">
                          <li
                            onClick={() => {
                              navigate("/cartPage");
                            }}
                            className="nav_li_smining_Fixed_Icone"
                          >
                            <ShoppingCartOutlinedIcon
                              sx={{ height: "30px", width: "30px" }}
                            />
                          </li>
                        </Tooltip>
                      </Badge>
                    </>
                  )
                )}
              </ul>
            </div>
          </div>
        </div> */}

        <div
          onMouseEnter={handleDropdownOpen}
          onMouseLeave={handleDropdownClose}
          className={`roop_shop_dropdown ${isDropdownOpen ? "open" : ""} ${isHeaderFixed ? "fixed" : ""
            }`}
          style={{ backgroundColor: isHeaderFixed && "transparent" }}
        >
          <div
            ref={divRef}
            style={{
              display: "flex",
              padding: "25px",
              color: "#7d7f85",
              backgroundColor: "white",
              gap: "50px",
              justifyContent: "space-between",
              backgroundColor: "#e9e9e9",
              borderTop: "3px solid #d14a61",
              // marginTop: isHeaderFixed && "20px",
            }}
            className="roop_showDropOptionMainDiv"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div style={{ display: "flex" }}>
              {menuItems.map((menuItem, index) => (
                <div
                  key={menuItem.menuid || index}
                  className="roop_headerOptionSingleDiv"
                  style={{
                    minWidth: "fitContent",
                    paddingLeft: "25px",
                  }}
                >
                  <ButtonBase
                    component="div"
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
                  >
                    <a
                      href={`/p/${menuItem?.menuname}/?M=${btoa(
                        `${menuItem?.param0dataname}/${menuItem?.param0name}`
                      )}`}
                      className="roop_menuSubTitle"
                    // onClick={() =>
                    //   handelMenu({
                    //     menuname: menuItem?.menuname,
                    //     key: menuItem?.param0name,
                    //     value: menuItem?.param0dataname,
                    //   })
                    // }
                    >
                      <p className="muilistMenutext">{menuItem.menuname}</p>
                    </a>
                  </ButtonBase>
                  <>
                    {/* <ButtonBase
                      component="div"
                      style={{ display: 'flex', justifyContent: 'start' }}
                    >
                      <div style={{ paddingLeft: '10px', fontSize: '15px', marginTop: '5px' }}>
                        <button className="roop_underline_button" onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname })}>view all</button>
                      </div>
                    </ButtonBase> */}
                    <List className="roop_listMain">
                      {menuItem.param1.map((subMenuItem, index) => (
                        <div key={subMenuItem.param1dataid || index}>
                          <ButtonBase
                            component="div"
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "start",
                              height: "25px",
                            }}
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
                            {/* <a href='#' className='roop_menuSubTitle'> */}
                            <a
                              href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname
                                }/${subMenuItem.param1dataname}/?M=${btoa(
                                  `${menuItem?.param0dataname},${subMenuItem.param1dataname}/${menuItem?.param0name},${subMenuItem.param1name}`
                                )}`}
                              className="roop_menuSubTitle"

                            // onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname })}
                            >
                              <p
                                style={{
                                  margin: "0px 0px 0px 6px",
                                  fontWeight: 500,
                                }}
                              >
                                {subMenuItem.param1dataname}
                              </p>
                            </a>
                            {/* </a> */}
                          </ButtonBase>
                          <>
                            <List
                              style={{
                                paddingTop: "0px",
                                paddingBottom: "0px",
                              }}
                            >
                              {subMenuItem.param2.map((subSubMenuItem, index) => (
                                <div
                                  key={index}
                                  component="div"
                                  style={{ width: "100%" }}
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
                                    href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname
                                      }/${subMenuItem.param1dataname}/${subSubMenuItem.param2dataname
                                      }/?M=${btoa(
                                        `${menuItem?.param0dataname},${subMenuItem.param1dataname},${subSubMenuItem.param2dataname}/${menuItem?.param0name},${subMenuItem.param1name},${subSubMenuItem.param2name}`
                                      )}`}
                                    className="roop_menuSubTitle"
                                  // onClick={() =>
                                  //   handelMenu(
                                  //     {
                                  //       menuname: menuItem?.menuname,
                                  //       key: menuItem?.param0name,
                                  //       value: menuItem?.param0dataname,
                                  //     },
                                  //     {
                                  //       key: subMenuItem.param1name,
                                  //       value: subMenuItem.param1dataname,
                                  //     },
                                  //     {
                                  //       key: subSubMenuItem.param2name,
                                  //       value: subSubMenuItem.param2dataname,
                                  //     }
                                  //   )
                                  // }
                                  >
                                    {/* <ListItem key={subSubMenuItem.param2dataid} style={{ paddingLeft: '0px', paddingTop: '0px', paddingBottom: '0px' }}> */}
                                    <p className="muilist2ndSubMenutext">
                                      {subSubMenuItem.param2dataname}
                                    </p>
                                    {/* </ListItem> */}
                                  </a>
                                </div>
                              ))}
                            </List>
                          </>
                        </div>
                      ))}
                      <button
                        className="roop_underline_button"
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
                    </List>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {IsCartNo == 3 && <CartDrawer open={isCartOpen} />}
    </div >
  );
};

export default Header;
