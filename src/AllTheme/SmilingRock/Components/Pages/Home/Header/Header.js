import React, { useEffect, useRef, useState } from "react";
import "./Header.modul.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CartCount,
  WishCount,
  cartB2CDrawer,
  companyLogo,
  companyLogoM,
  loginState,
  smr_companyLogo,
  smr_companyLogoM,
  smr_loginState,
} from "../../../Recoil/atom";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Badge,
  ButtonBase,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { PiStarThin } from "react-icons/pi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import pako from "pako";
import CartDrawer from "../../Cart/CartPageB2c/Cart";
import useCountdown from "../../CountDownTimer/CountDownTimer";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const setCartOpenState = useSetRecoilState(cartB2CDrawer);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderFixedDropShow, setIsHeaderFixedDropShow] = useState(false);

  const compnyLogo = useRecoilValue(smr_companyLogo);
  const compnyLogoM = useRecoilValue(smr_companyLogoM);
  const [islogin, setislogin] = useRecoilState(smr_loginState);
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [cartCountNum, setCartCountNum] = useRecoilState(CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(WishCount);

  const [searchText, setSearchText] = useState("");
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const IsB2BWebsiteChek = storeinit?.IsB2BWebsite;
  const IsCartNo = storeinit?.CartNo;
  const [htmlContent, setHtmlContent] = useState("");
  const location = useLocation();


  let navigate = useNavigate();
  let cookie = Cookies.get("visiterId");

  const [serachsShowOverlay, setSerachShowOverlay] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    fetch(`${storImagePath()}/ExtraFlag.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

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
    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
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
    // setSearchText('');
    setSerachShowOverlay(!serachsShowOverlay);
  };

  const [drawerShowOverlay, setDrawerShowOverlay] = useState(false);
  const toggleDrawerOverlay = () => {
    setDrawerShowOverlay(!drawerShowOverlay);
  };

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

        let encodeObj = btoa(JSON.stringify(obj))
        navigation(`/p/${searchText}?S=${encodeObj}`);
        toggleOverlay();
        setSearchText("")
      }
    }
  };


  const toggleCartDrawer = () => {
    setIsCartOpen((prevState) => !prevState);
    const isCartDrawerOpen = JSON.parse(sessionStorage.getItem("isCartDrawer"));
    sessionStorage.setItem("isCartDrawer", !isCartDrawerOpen);
    setCartOpenState((prevState) => !prevState);
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
  }
  return (
    <div className="smr_headerMain_div">
      {serachsShowOverlay && (
        <>
          <div className="smr_smlingSearchoverlay">
            <div className="smr_smlingTopSerachOver">
              <IoSearchOutline
                style={{ height: "15px", width: "15px", marginRight: "10px" }}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="smr_serachinputBoxOverly"
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
          </div>

          <div
            className={`smr_smlingSearchoverlayNew ${isHeaderFixedDropShow ? "fixed" : ""
              }`}
          >
            <div className="smr_smlingTopSerachOver-Fixed">
              <IoSearchOutline
                style={{ height: "15px", width: "15px", marginRight: "10px" }}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="smr_serachinputBoxOverly"
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
          </div>
        </>
      )}

      {drawerShowOverlay && (
        <>
          <div className="srm_MobileSiderBarMain">
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
                      badgeContent={wishCountNum}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                      className="badgeColorFix smr_mobileHideIcone"
                      style={{ marginInline: "15px" }}
                    >
                      <Tooltip title="WishList">
                        <li
                          className="nav_li_smining_Icone"
                          onClick={() => navigation("/myWishList")}
                        >
                          <PiStarThin
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
                      className="nav_li_smining_Icone smr_mobileHideIcone"
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
                      className="badgeColorFix"
                      style={{ marginInline: "15px" }}
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={IsCartNo == 2 ? toggleCartDrawer : () => navigate("/cartPage")}
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
              <p className="smr_menuStaicMobilePage"
                onClick={() => {
                  setDrawerShowOverlay(false);
                  navigation("/aboutUs");
                }}>About us</p>
            </div>
            {islogin &&
              <div>
                <p
                  className="smr_menuStaicMobilePageLink"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    setDrawerShowOverlay(false);
                    navigation("/myWishList");
                  }}
                >
                  WishList
                </p>
              </div>
            }

            {IsB2BWebsiteChek == 1 ? (
              islogin ? (
                <>
                  {storeinit?.IsDesignSetInMenu == 1 &&
                    <p
                      className="smr_menuStaicMobilePageLink"
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        setDrawerShowOverlay(false);
                        navigation("/Lookbook");
                      }}
                    >
                      {storeinit?.DesignSetInMenu}
                      {/* LOOKBOOK */}
                    </p>
                  }
                </>
              ) : (
                ""
              )
            ) : (
              <>
                {storeinit?.IsDesignSetInMenu == 1 &&
                  <p
                    className="smr_menuStaicMobilePageLink"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      setDrawerShowOverlay(false);
                      navigation("/Lookbook");
                    }}
                  >
                    {storeinit?.DesignSetInMenu}
                    {/* LOOKBOOK */}
                  </p>
                }
              </>
            )}

            {
              islogin && <div>
                <p
                  className="smr_menuStaicMobilePageLink"
                  onClick={() => {
                    setDrawerShowOverlay(false);
                    navigation("/account");
                  }}
                >
                  Account
                </p>
              </div>
            }

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
              </div>)}

            {islogin && (
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid white",
                  alignItems: "end",
                  marginInline: "15px",
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    width: "100%",
                    borderBottom: "1px solid white",
                    border: "none",
                    outline: "none",
                    backgroundColor: "rgba(192, 187, 177, 1.8)",
                    marginTop: "15px",
                    fontWeight: 500,
                    color: "white",
                    fontSize: "17px",
                  }}
                  className="mobileSideBarSearch"
                />
                <IoSearchOutline
                  style={{
                    height: "20px",
                    cursor: "pointer",
                    color: "white",
                    width: "20px",
                    marginInline: "5px",
                  }}
                />
              </div>
            )}
          </div>
        </>
      )}

      <div className="smiling_Top_header">
        <div className="smiling_Top_header_sub">
          <div className="smiling_Top_header_div1">
            <ul className="nav_ul_shop">
              {IsB2BWebsiteChek == 1 ? (
                islogin == true ? (
                  <li
                    className="nav_li_smining nav_li_smining_shop"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <span
                      className="nav_li_smining"
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
                  className="nav_li_smining nav_li_smining_shop"
                  onMouseEnter={handleDropdownOpen}
                  onMouseLeave={handleDropdownClose}
                >
                  <span
                    className="nav_li_smining"
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
              )}

              {/* Miora Needed */}
              {/* Kayra Don't */}
              {/* <li
                className="nav_li_smining nav_li_smining_Mobile"
                style={{ cursor: "pointer" }}
                onClick={(event) => hanldeStaticPageNavigation(event, "/servicePolicy")}
              >
                <a href="/servicePolicy" className="smr_A_link">
                  SERVICE POLICY
                </a>
              </li> */}
              {htmlContent?.rd && htmlContent?.rd.length > 0 &&
                (
                  htmlContent?.rd[0]?.ExtraMenu == 1 &&
                  <>
                    <li
                      className="nav_li_smining nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={(event) => hanldeStaticPageNavigation(event, "/ExpertAdvice")}
                    >
                      <a href="/ExpertAdvice" className="smr_A_link">
                        EXPERT ADVICE
                      </a>
                    </li>

                    {/* Maiora not needed fun facts */}
                    {/* Kayra needed */}

                    <li
                      className="nav_li_smining nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={(event) => hanldeStaticPageNavigation(event, "/FunFact")}
                    >
                      <a href="/FunFact" className="smr_A_link">
                        FUN FACT
                      </a>
                    </li>
                  </>
                )}
              {IsB2BWebsiteChek === 1 ? (
                islogin === true ? (
                  <>
                    {storeinit?.IsDesignSetInMenu == 1 &&
                      <li
                        className="nav_li_smining nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                      >
                        {/* <a href="/Lookbook" className="smr_A_link"> */}
                        {storeinit?.DesignSetInMenu}
                        {/* LOOKBOOK */}
                        {/* </a> */}
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
                      className="nav_li_smining nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={(event) => hanldeStaticPageNavigation(event, "/Lookbook")}
                    >
                      {/* <a href="/Lookbook" className="smr_A_link"> */}
                      {storeinit?.DesignSetInMenu}
                      {/* LOOKBOOK */}
                      {/* </a> */}
                    </li>
                  }
                </>
              )}
            </ul>
            <ul className="nav_ul_shop_menu_Mobile">
              <MenuIcon
                style={{ fontSize: "35px", color: "white" }}
                className="muIconeMobileHeader"
                onClick={toggleDrawerOverlay}
              />
            </ul>
          </div>
          <div className="smiling_Top_header_div2_web">
            <a href="/">
              <img
                src={compnyLogo}
                loading="lazy"
                className="smr_logo_header"
              />
            </a>
          </div>
          <div className="smiling_Top_header_div2_Mobile">
            <a href="/">
              <img
                src={compnyLogoM}
                loading="lazy"
                className="smr_logo_header"
              />
            </a>
          </div>
          <div className="smiling_Top_header_div3">
            <ul className="nav_ul_shop">
              <li
                className="nav_li_smining nav_li_smining_Mobile"
                style={{ cursor: "pointer" }}
                onClick={(event) => hanldeStaticPageNavigation(event, "/aboutUs")}
              >
                <a href="/aboutUs" className="smr_A_link">
                  ABOUT US
                </a>
              </li>
              {IsB2BWebsiteChek == 0 ? (
                storeinit?.IsPLW ? (
                  ""
                ) : (
                  <>
                    {
                      islogin && <li
                        className="nav_li_smining nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigation("/account")}
                      >
                        {/* <a href="/account" className="smr_A_link"> */}
                        ACCOUNT
                        {/* </a> */}
                      </li>
                    }
                  </>
                )
              ) : islogin && storeinit?.IsPLW ? (
                ""
              ) : (
                <>
                  {
                    (islogin === true) && <li
                      className="nav_li_smining nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigation("/account")}
                    >
                      {/* <a href="/account" className="smr_A_link"> */}
                      ACCOUNT
                      {/* </a> */}
                    </li>
                  }
                </>
              )}
              {islogin ? (
                <li
                  className="nav_li_smining nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  LOG OUT
                </li>
              ) : (
                <li
                  className="nav_li_smining"
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
                    className="badgeColorFix smr_mobileHideIcone"
                  >
                    <Tooltip title="WishList">
                      <li
                        className="nav_li_smining_Icone"
                        onClick={() => navigation("/myWishList")}
                      >
                        <PiStarThin
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
                    className="nav_li_smining_Icone smr_mobileHideIcone"
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
                    className="badgeColorFix"
                  >
                    <Tooltip title="Cart">
                      <li
                        onClick={IsCartNo == 2 ? toggleCartDrawer : () => navigate("/cartPage")}
                        className="nav_li_smining_Icone"
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
                      className="badgeColorFix smr_mobileHideIcone"
                    >
                      <Tooltip title="WishList">
                        <li
                          className="nav_li_smining_Icone"
                          onClick={() => navigation("/myWishList")}
                        >
                          <PiStarThin
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
                      className="nav_li_smining_Icone smr_mobileHideIcone"
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
                      className="badgeColorFix"
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={IsCartNo == 2 ? toggleCartDrawer : () => navigate("/cartPage")}
                          className="nav_li_smining_Icone"
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

        <div
          className={`Smining-Top-Header-fixed-main ${isHeaderFixed ? "fixed" : ""
            }  ${serachsShowOverlay ? "searchoverly" : ""}`}
        >
          <div className="smiling_Top_header_sub" style={{ width: "100%" }}>
            <div className="smiling_Top_header_div1">
              <ul className="nav_ul_shop">
                {/* {islogin && */}
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

                {/* Miora Needed */}
                {/* Kayra Don't */}
                {/* <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/servicePolicy")}
                >
                  <a href="/servicePolicy" className="smr_A_linkFixed">
                    SERVICE POLICY
                  </a>
                </li> */}

                {htmlContent?.rd && htmlContent?.rd.length > 0 &&
                  (
                    htmlContent?.rd[0]?.ExtraMenu == 1 &&
                    <>
                      <li
                        className="nav_li_smining_Fixed nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={(event) => hanldeStaticPageNavigation(event, "/ExpertAdvice")}
                      >
                        <a href="/ExpertAdvice" className="smr_A_linkFixed">
                          EXPERT ADVICE
                        </a>
                      </li>


                      {/* Maiora not needed fun facts */}
                      {/* Kayra needed */}
                      <li
                        className="nav_li_smining_Fixed nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        onClick={(event) => hanldeStaticPageNavigation(event, "/FunFact")}
                      >
                        <a href="/FunFact" className="smr_A_linkFixed">
                          FUN FACT
                        </a>
                      </li>
                    </>
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
                          <a href="/Lookbook" className="smr_A_linkFixed">
                            {storeinit?.DesignSetInMenu}
                            {/* LOOKBOOK */}
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
                        <a href="/Lookbook" className="smr_A_linkFixed">
                          {storeinit?.DesignSetInMenu}
                          {/* LOOKBOOK */}
                        </a>
                      </li>
                    }
                  </>
                )}

                <ul className="nav_ul_shop_menu_Mobile">
                  <MenuIcon
                    style={{ fontSize: "35px", color: "#7d7f85" }}
                    className="muIconeMobileHeader"
                    onClick={toggleDrawerOverlay}
                  />
                </ul>
                {/* } */}
              </ul>
            </div>
            <div className="smiling_Top_header_div2_web">
              <a href="/">
                <img
                  src={compnyLogo}
                  loading="lazy"
                  className="smr_logo_header_Fixed"
                />
              </a>
            </div>

            <div className="smiling_Top_header_div2_Mobile">
              <a href="/">
                <img
                  src={compnyLogoM}
                  loading="lazy"
                  className="smr_logo_header_Fixed"
                />
              </a>
            </div>
            <div className="smiling_Top_header_div3">
              <ul className="nav_ul_shop">
                <li
                  className="nav_li_smining_Fixed nav_li_smining_Mobile"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => hanldeStaticPageNavigation(event, "/aboutUs")}
                >
                  <a href="/aboutUs" className="smr_A_linkFixed">
                    ABOUT US
                  </a>
                </li>

                {storeinit?.IsPLW == 0 && IsB2BWebsiteChek == 0 ? (
                  <>
                    {
                      (islogin === true) && <li
                        className="nav_li_smining_Fixed nav_li_smining_Mobile"
                        style={{ cursor: "pointer" }}
                        // onClick={() => navigation("/LoginOption")}
                        onClick={() => navigation("/account")}
                      >
                        {/* <a href="/account" className="smr_A_linkFixed"> */}
                        ACCOUNT
                        {/* </a> */}
                      </li>
                    }
                  </>
                ) : (
                  islogin && (
                    <li
                      className="nav_li_smining_Fixed nav_li_smining_Mobile"
                      style={{ cursor: "pointer" }}
                      // onClick={() => navigation("/LoginOption")}
                      onClick={() => navigation("/account")}
                    >
                      {/* <a href="/account" className="smr_A_linkFixed"> */}
                      ACCOUNT
                      {/* </a> */}
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
                      className="badgeColor smr_mobileHideIcone"
                    >
                      <Tooltip title="WishList">
                        <li
                          className="nav_li_smining_Fixed_Icone smr_mobileHideIcone"
                          onClick={() => navigation("/myWishList")}
                        >
                          <PiStarThin
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
                      className="nav_li_smining_Fixed_Icone smr_mobileHideIcone"
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
                          onClick={IsCartNo == 2 ? toggleCartDrawer : () => navigate("/cartPage")}
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
                        className="badgeColor smr_mobileHideIcone"
                      >
                        <Tooltip title="WishList">
                          <li
                            className="nav_li_smining_Fixed_Icone smr_mobileHideIcone"
                            onClick={() => navigation("/myWishList")}
                          >
                            <PiStarThin
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
                        className="nav_li_smining_Fixed_Icone smr_mobileHideIcone"
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
                            onClick={IsCartNo == 2 ? toggleCartDrawer : () => navigate("/cartPage")}
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
        </div>

        <div
          onMouseEnter={handleDropdownOpen}
          onMouseLeave={handleDropdownClose}
          className={`shop-dropdown ${isDropdownOpen ? "open" : ""} ${isHeaderFixed ? "fixed" : ""
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
              marginTop: isHeaderFixed && "20px",
            }}
            className="smr_showDropOptionMainDiv"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div style={{ display: "flex" }}>
              {menuItems.map((menuItem) => (
                <div
                  key={menuItem.menuid}
                  className="smr_headerOptionSingleDiv"
                  style={{
                    minWidth: "fitContent",
                    borderRight: "1px solid lightgray",
                    paddingLeft: "25px",
                  }}
                >
                  <ButtonBase
                    component="div"
                    onClick={(e) =>
                      handelMenu({
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
                      className="smr_menuSubTitle"
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
                        <button className="smr_underline_button" onClick={() => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname })}>view all</button>
                      </div>
                    </ButtonBase> */}
                    <div className="smr_listMain">
                      {menuItem.param1.map((subMenuItem) => (
                        <div key={subMenuItem.param1dataid}>
                          <ButtonBase
                            component="div"
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "start",
                              height: "25px",
                            }}
                            onClick={(e) => handelMenu({ "menuname": menuItem?.menuname, "key": menuItem?.param0name, "value": menuItem?.param0dataname }, { "key": subMenuItem.param1name, "value": subMenuItem.param1dataname }, {}, e)}
                          >
                            {/* <a href='#' className='smr_menuSubTitle'> */}
                            <a
                              href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname}/${subMenuItem.param1dataname
                                }/?M=${btoa(
                                  `${menuItem?.param0dataname},${subMenuItem.param1dataname}/${menuItem?.param0name},${subMenuItem.param1name}`
                                )}`}
                              className="smr_menuSubTitle"

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
                              {subMenuItem.param2.map((subSubMenuItem) => (
                                <div
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
                                    href={`/p/${menuItem?.menuname}/${menuItem?.param0dataname}/${subMenuItem.param1dataname
                                      }/${subSubMenuItem.param2dataname
                                      }/?M=${btoa(
                                        `${menuItem?.param0dataname},${subMenuItem.param1dataname},${subSubMenuItem.param2dataname}/${menuItem?.param0name},${subMenuItem.param1name},${subSubMenuItem.param2name}`
                                      )}`}
                                    className="smr_menuSubTitle"
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
                        className="smr_underline_button"
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
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {IsCartNo == 2 &&
        <CartDrawer open={isCartOpen} />
      }
    </div>
  );
};

export default Header;
