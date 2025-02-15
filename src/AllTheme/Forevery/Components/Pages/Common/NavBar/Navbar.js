import React, { useEffect, useRef, useState } from "react";
import "./Navbar.for.scss";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import btnstyle from "../../../scss/Button.module.scss";
import {
  CollectionData,
  NavbarMenu,
  SideItems,
  diamondShapes,
} from "../../../data/NavbarMenu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoDiamondOutline, IoDiamond } from "react-icons/io5";
import { GiDiamondRing, GiGemPendant, GiCrystalEarrings } from "react-icons/gi";
import { TbDiamond, TbSettingsHeart } from "react-icons/tb";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  for_CartCount,
  for_NavbarItems,
  for_WishCount,
  for_companyLogo,
  for_companyLogoM,
  for_customizationSteps,
  for_customizationSteps1,
  for_loginState,
} from "../../../Recoil/atom";
import Cookies from "js-cookie";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import {
  Badge,
  ButtonBase,
  Dialog,
  DialogContent,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import Pako from "pako";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import Preloader from "../../Preloader/Load";
import { RxCross1 } from "react-icons/rx";
import UseNavbar from "../../../hooks/UseNavbar";
import MobileNav from "./MobileNavbar";
import { RiMenu2Line } from "react-icons/ri";
import useHomeBannerImages from "../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner";
import { toast } from "react-toastify";

const styleHref = {
  textDecoration: "none",
  color: "inherit",
};

const commonImage = `${storImagePath()}/Forevery/navCommon-image.png`;
const LetterImage = `${storImagePath()}/Forevery/letter-diamond-menu-banner.png`;
const BespokeImage = `${storImagePath()}/Forevery/collections/bespoke-header.webp`;

const BespokeBannerImage = `${storImagePath()}/Forevery/bespoke.jpg`;


// \\evo\My_Share\4Nidhi\website\forevery\bespoke photo.jpg
const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ActiveMenu, setActiveMenu] = useState({ menu: "", index: "" });
  const Navigate = useNavigate();
  const [islogin, setislogin] = useRecoilState(for_loginState);
  const [LoggedUserDetails, setLoggedUserDetails] = useState();
  const [menuData, setMenuData] = useState([]);
  const [cartCountNum, setCartCountNum] = useRecoilState(for_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(for_WishCount);
  const [searchText, setSearchText] = useState("");
  const [showMenu, setshowMenu] = useState(true);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useRecoilState(for_NavbarItems);

  const ToggleNav = () => {
    setOpen(!open);
  };

  useEffect(() => {
    sessionStorage.setItem("isCart_hOQ", cartCountNum);
  }, [cartCountNum]);

  const handleLogout = () => {
    Navigate("/");
    setislogin(false);
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
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = () => {
      const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
      setislogin(value);
    };
    fetchData();
  }, []);

  const compnyLogo = useRecoilValue(for_companyLogo);
  const compnyLogoM = useRecoilValue(for_companyLogoM);

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

  const getMenuApi = async () => {
    const loginUserDetail = JSON.parse(
      sessionStorage?.getItem("loginUserDetail")
    );
    const storeInit = JSON.parse(sessionStorage?.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    setLoggedUserDetails(loginUserDetail);
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

  useEffect(() => {
    const visiterID = Cookies?.get("visiterId");
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
        Navigate(`/search/${searchText}?S=${encodeObj}`);
        setSearchText("");
        setShowSearchBar(!ShowSearchBar);
      }
    }
  };

  useEffect(() => {
    setshowMenu(false);
    setOpen(false);
  }, [location]);

  const { navRef, navbarHeight, handleLogoLoad } = UseNavbar();

  return (
    <div className="for_Navbar" ref={navRef}>
      <Preloader />
      <nav className="for_nav">
        <MobileNav isMobileMenu={true} open={open} onClose={ToggleNav} />
        <NavbarLeft
          Navigate={Navigate}
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
          height={navbarHeight}
          showMenu={showMenu}
          setshowMenu={setshowMenu}
          onOpen={ToggleNav}
          onLoad={handleLogoLoad}
        />
        <NavbarCenter
          Navigate={Navigate}
          onLoad={handleLogoLoad}
          compnyLogo={compnyLogo}
          compnyLogoM={compnyLogoM}
        />
        <NavbarRight
          Navigate={Navigate}
          ShowSearchBar={ShowSearchBar}
          setShowSearchBar={setShowSearchBar}
          user={LoggedUserDetails?.firstname}
          islogin={islogin}
          handleLogout={handleLogout}
          wishCountNum={wishCountNum}
          cartCountNum={cartCountNum}
          searchDataFucn={searchDataFucn}
          searchText={searchText}
          setSearchText={setSearchText}
          showMenu={showMenu}
          setshowMenu={setshowMenu}
        />
      </nav>
    </div>
  );
};
export default Navbar;

const NavbarRight = ({
  ShowSearchBar,
  setShowSearchBar,
  Navigate,
  user,
  islogin,
  handleLogout,
  wishCountNum,
  cartCountNum,
  searchText,
  setSearchText,
  searchDataFucn,
}) => {
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (ShowSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchText("");
    }
  }, [ShowSearchBar]);
  return (
    <>
      <div className="right">
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/appointment");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={`${storImagePath()}/Forevery/appointment.png`}
            alt=""
            width={18}
            height={18}
            style={{ objectFit: "contain", marginRight: "5px" }}
          />
          Appointment
        </span>
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/wishlist");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Badge
            style={{ size: "1px" }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "9.4px",
                borderRadius: "100%",
                marginRight: "6px",
                marginTop: "3px",
                bgcolor: "#DC637D",
                width: 6,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            badgeContent={wishCountNum}
            color="primary"
          >
            <FaRegHeart size={18} style={{ marginRight: "5px" }} />
          </Badge>
          Wishlist
        </span>
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/cart");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Badge
            style={{ size: "1px" }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "9.4px",
                borderRadius: "100%",
                marginRight: "6px",
                marginTop: "3px",
                bgcolor: "#DC637D",
                width: 6,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            badgeContent={cartCountNum}
            color="primary"
          >
            <HiOutlineShoppingBag size={18} style={{ marginRight: "5px" }} />
          </Badge>
          Cart
        </span>
        <span className="for_item_menu search_main">
          {ShowSearchBar && (
            <input
              type="text"
              placeholder="Search Forevery"
              className="for_search_bar"
              value={searchText}
              autoFocus
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={searchDataFucn}
            />
          )}
          <GrSearch
            size={19}
            onClick={() => setShowSearchBar(!ShowSearchBar)}
          />
        </span>
        {!islogin ? (
          <>
            {" "}
            <span
              className="for_item_menu"
              onClick={() => {
                Navigate("/LoginOption");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <FaRegCircleUser size={19} style={{ marginRight: "5px" }} />
              Login
            </span>
          </>
        ) : (
          <>
            <div className="for_login_user_dropdown">
              <span className="user_logged_in_for">{user}</span>
              <div className="for_dropdown">
                <div>
                  <div
                    className="item_a"
                    onClick={() => {
                      Navigate("/account");
                      window.scrollTo({ behavior: "smooth", top: 0 });
                    }}
                  >
                    <li>my account</li>
                  </div>
                  <div
                    className="item_a"
                    onClick={() => {
                      Navigate("/account", { state: { id: 1 } });
                      window.scrollTo({ behavior: "smooth", top: 0 });
                    }}
                  >
                    <li>my orders</li>
                  </div>
                  {/* <div
                    className="item_a"
                    onClick={() => {
                      Navigate("/account");
                      window.scrollTo({ behavior: "smooth", top: 0 });
                    }}
                  >
                    <li>my details</li>
                  </div> */}
                  <hr />
                  <div className="item_a" onClick={() => handleLogout()}>
                    <li>log out</li>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="for_max_1100_menu">
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/appointment");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={`${storImagePath()}/Forevery/appointment.png`}
            alt=""
            className="calemder-logo"
            style={{ objectFit: "contain", marginRight: "5px" }}
          />
        </span>
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/wishlist");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Badge
            style={{ size: "1px" }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "9.4px",
                borderRadius: "100%",
                marginRight: "6px",
                marginTop: "3px",
                bgcolor: "#DC637D",
                width: 6,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            badgeContent={wishCountNum}
            color="primary"
          >
            <FaRegHeart
              className="fa-for-heart"
              style={{ marginRight: "5px" }}
            />
          </Badge>
        </span>
        <span
          className="for_item_menu"
          onClick={() => {
            Navigate("/cart");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Badge
            style={{ size: "1px" }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "9.4px",
                borderRadius: "100%",
                marginRight: "6px",
                marginTop: "3px",
                bgcolor: "#DC637D",
                width: 6,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
            badgeContent={cartCountNum}
            color="primary"
          >
            <HiOutlineShoppingBag
              className="fa-for-shop"
              style={{ marginRight: "5px" }}
            />
          </Badge>
        </span>
      </div>
    </>
  );
};
const NavbarCenter = ({ Navigate, onLoad, compnyLogo, compnyLogoM }) => {
  const isMobile = useMediaQuery("max-width(425px)");
  return (
    <div className="center">
      <div
        className="logo_mask"
        onClick={() => {
          Navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src={isMobile ? compnyLogoM : compnyLogo}
          alt=""
          style={{ cursor: "pointer" }}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};
const MobileLogo = ({ Navigate, onLoad }) => {
  return (
    <div className="mobile-logo">
      <div
        className="logo_mask"
        onClick={() => {
          Navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src={`${storImagePath()}/Forevery/logo.webp`}
          alt=""
          style={{ cursor: "pointer" }}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};
const NavbarLeft = ({
  onOpen,
  setActiveMenu,
  ActiveMenu,
  setHoveredIndex,
  hoveredIndex,
  height,
  showMenu,
  setshowMenu,
  onLoad,
}) => {
  const Navigate = useNavigate();
  const NavItemsHeight = height - 25;
  const [storeinit, setstoreinit] = useState(null);
  useEffect(() => {
    let storeInt = JSON.parse(sessionStorage?.getItem("storeInit"));
    setstoreinit(storeInt);
  }, []);
  return (
    <>
      <div className="left">
        <div className="hamburger_menu">
          <RiMenu2Line size={40} onClick={onOpen} className="menu-ham" />
          <MobileLogo onLoad={onLoad} Navigate={Navigate} />
        </div>
        {NavbarMenu?.map((val, i) => {
          if (
            val?.category === "High End Jewelry" &&
            storeinit?.IsB2BWebsite !== 1
          ) {
            return null;
          }
          return (
            <div
              className="for_menu_items"
              key={i}
              style={{
                height: `${NavItemsHeight}px`,
                display:
                  val?.category === "High End Jewelry"
                    ? storeinit?.IsB2BWebsite === 1
                      ? ""
                      : "none"
                    : "",
              }}
              // onMouseOver={() => {
              //   setActiveMenu({ menu: val, index: i });
              //   setHoveredIndex(i);
              //   setTimeout(()=>{
              //     setshowMenu(true)
              //   },300)
              // }}
              // onClick={() => {
              //   Navigate(val?.link);
              //   setshowMenu(false);
              onMouseOver={() => {
                if (!val?.disabled) {
                  setActiveMenu({ menu: val, index: i });
                  setHoveredIndex(i);
                  setTimeout(() => {
                    setshowMenu(true);
                  }, 300);
                } else {
                  setshowMenu(false);
                }
              }}
              onClick={() => {
                if (!val?.disabled) {
                  Navigate(val?.link);
                  setshowMenu(false);
                }
              }}
            // }}
            >
              {val?.disabled ? (
                <div
                  style={{
                    cursor: val?.disabled ? "not-allowed" : "pointer",
                  }}
                  className="for_nav_menu"
                >
                  {val?.category}
                  {hoveredIndex === i ? (
                    <FaChevronUp
                      size={13}
                      className={`chevorn-icon hide-Fo-1 `}
                    />
                  ) : (
                    <FaChevronDown
                      size={13}
                      className={`chevorn-icon hide-Fo-2 `}
                    />
                  )}
                </div>
              ) : (
                <Link
                  style={{
                    cursor: val?.disabled ? "not-allowed" : "pointer",
                  }}
                  to={val?.link}
                  className="for_nav_menu"
                >
                  {val?.category}
                  {hoveredIndex === i ? (
                    <FaChevronUp
                      size={13}
                      className={`chevorn-icon hide-Fo-1 `}
                    />
                  ) : (
                    <FaChevronDown
                      size={13}
                      className={`chevorn-icon hide-Fo-2 `}
                    />
                  )}
                </Link>
              )}
            </div>
          );
        })}
        <>
          {showMenu && (
            <div className="wrapper_menu_">
              <NavitemsWrapper
                SelectedMenu={ActiveMenu}
                setActiveMenu={setActiveMenu}
                setHoveredIndex={setHoveredIndex}
                height={height}
                setshowMenu={setshowMenu}
              />
            </div>
          )}
        </>
      </div>
    </>
  );
};
const NavitemsWrapper = ({
  SelectedMenu,
  setActiveMenu,
  setHoveredIndex,
  height,
  setshowMenu,
}) => {
  const firstNavRef = useRef(null);
  const Navigate = useNavigate();
  const NavbarMenuRender = (Menu) => {
    if (SelectedMenu?.index === Menu?.length - 1) {
      return Menu;
    } else {
      return Menu?.slice(0, 4);
    }
  };

  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  const [customizeStep1, setCustomizeStep1] = useRecoilState(
    for_customizationSteps1
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
        } else {
          setHoveredIndex(null);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (firstNavRef.current) {
      observer.observe(firstNavRef.current);
    }

    return () => {
      if (firstNavRef.current) {
        observer.unobserve(firstNavRef.current);
      }
    };
  }, []);
  return (
    <>
      {/*before 118  after 133px */}
      <div
        className="first_nav"
        style={{
          top: `${height + 15}px`,
        }}
        ref={firstNavRef}
      >
        <div className="bg-for-hoverlay">
          <div className="nav_bottom_top_head">
            {NavbarMenuRender(NavbarMenu).map((val, i) => {
              return (
                <div
                  style={{
                    backgroundColor:
                      SelectedMenu?.menu === val ? "#FEEEEE" : "",
                    opacity: SelectedMenu?.menu === val ? "" : "0.3",
                  }}
                  className="active_menu_for"
                  key={i}
                  onClick={() => Navigate(val?.link)}
                >
                  {val?.category}
                </div>
              );
            })}
          </div>
          <div className="for_Selected_Menu_item_list">
            {SelectedMenu?.index == 0 && (
              <FirstNavMenu
                data={NavbarMenu[SelectedMenu?.index]}
                setCustomizeStep1={setCustomizeStep1}
                setCustomizeStep={setCustomizeStep}
                setshowMenu={setshowMenu}
              />
            )}
            {SelectedMenu?.index == 1 && (
              <SecondNavMenu
                data={NavbarMenu[SelectedMenu?.index]}
                setCustomizeStep={setCustomizeStep}
              />
            )}
            {SelectedMenu?.index == 2 && (
              <ThirdNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
            {SelectedMenu?.index == 3 && (
              <FourNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
            {SelectedMenu?.index == 4 && (
              <LatsNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const FirstNavMenu = ({
  data,
  setCustomizeStep1,
  setCustomizeStep,
  close,
  setshowMenu,
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [checkIndex, setCheckIndex] = useState();
  const banner = useHomeBannerImages();


  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1 ?? steps2)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleConfirm = () => {
    navigate(createUrl);
  }

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

  const checkStepsOf1 =
    (steps?.[1] !== undefined && steps?.[1] !== null) ||
    (steps1?.[1] !== undefined && steps1?.[1] !== null) ||
    (steps2?.[1] !== undefined && steps2?.[1] !== null) ||
    (steps3?.[1] !== undefined && steps3?.[1] !== null);

  const handleCheckSteps = (value, index, style, link) => {
    let isStepValid = false;

    if (value === "Ring") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps;
      } else {
        isStepValid = false;
        sessionStorage.setItem('isRing', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isPendant')
      }
    }

    if (value === "Pendant") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps;
      } else {
        isStepValid = false;
        sessionStorage.setItem('isPendant', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isRing')
      }
    }

    if (value === "Earring") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps;
      } else {
        isStepValid = false;
        sessionStorage.setItem('isPair', true)
        sessionStorage.removeItem('isPendant')
        sessionStorage.removeItem('isRing')
      }
    }

    if (value === "Diamond") {
      isStepValid = true;
    }

    if (isStepValid) {
      setShowModal(true);
      setCheckIndex(index);
    } else {
      // console.log("Alternative action");
      if (style !== "" && link !== "") {
        if (value === 'Ring') {
          navigate(link);
        } else if (value === 'Pendant') {
          navigate(link);
        } else if (value === 'Earring') {
          navigate(link);
        }
      } else if (style === "" && link !== "") {
        if (value === 'Ring') {
          navigate(link);
        } else if (value === 'Pendant') {
          navigate(link);
        } else if (value === 'Earring') {
          navigate(link);
        }
      } else {
        if (value === 'Ring') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
        } else if (value === 'Pendant') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UGVuZGFudC9jYXRlZ29yeQ==`);
        } else if (value === 'Earring') {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=RWFycmluZy9jYXRlZ29yeQ==`);
        }
      }
    }
  };

  const HandleSettingNavigation = (value) => {
    const addCategory = `Ring/category`;
    const filterKeyVal = btoa(addCategory);
    const addCategory1 = `Pendant/category`;
    const filterKeyVal1 = btoa(addCategory1);
    const addCategory2 = `Earring/category`;
    const filterKeyVal2 = btoa(addCategory2);

    if (value === "Ring") {
      if (value === "Ring" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
        );
        setCustomizeStep1({
          step1: true,
        });
        sessionStorage.removeItem('isPair')
        const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
      }
    }

    if (value === 'Pendant') {
      if (value === "Pendant" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=${filterKeyVal1}`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Pendant/M=${filterKeyVal1}`
        );
        sessionStorage.removeItem('isPair')
        const step1 = [{ step1: true, Setting: "Pendant", id: 2, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(step1));
      }
    }
    if (value === 'Earring') {
      if (value === "Earring" && checkSteps) {
        navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=${filterKeyVal2}`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
          }
        }
        navigate(
          `/certified-loose-lab-grown-diamonds/settings/Earring/M=${filterKeyVal2}`
        );
        sessionStorage.setItem('isPair', true)
        const step1 = [{ step1: true, Setting: "Earring", id: 3, Status: "active" }];
        sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(step1));
      }
    }
  };

  const HandleDiamondNavigation = (value) => {
    const isEarring = value === "earring";
    const isRing = value === "ring";
    const isPendant = value === "pendant";

    if (
      checkStepsOf0 &&
      steps1?.[1]?.step2 !== true &&
      steps2?.[1]?.step2 !== true &&
      steps3?.[1]?.step2 !== true
    ) {
      // Clearing session storage
      sessionStorage.removeItem("customizeSteps2Ring");
      sessionStorage.removeItem("custStepData2Ring");
      sessionStorage.removeItem("customizeSteps2Pendant");
      sessionStorage.removeItem("custStepData2Pendant");
      sessionStorage.removeItem("customizeSteps2Earring");
      sessionStorage.removeItem("custStepData2Earring");

      if (isEarring) {
        sessionStorage.setItem("isPair", true);
        sessionStorage.removeItem("isRing");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`, {
          state: { isPairFlow: true },
        });
      } if (isRing) {
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
      if (isPendant) {
        sessionStorage.setItem('isPendant', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isRing');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
    } else {
      if (isEarring) {
        sessionStorage.setItem("isPair", true);
        sessionStorage.removeItem("isRing");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`, {
          state: { isPairFlow: true },
        });
      } if (isRing) {
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
      if (isPendant) {
        sessionStorage.setItem('isPendant', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isRing');
        navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
      }
    }

    // Common logic executed after navigation
    setCustomizeStep({
      step1: true,
    });

    const step1 = [{ step1: true, shape: "All" }];
    sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = (index) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("customizeSteps2Pendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("customizeSteps2Earring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem('isPair');
    sessionStorage.removeItem('isPendant');
    sessionStorage.removeItem('isRing');
    if (index === 0) {
      navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
    } else if (index === 1) {
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    } else if (index === 2) {
      const addCategory = `Pendant/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Pendant/M=${filterKeyVal}`
      );
    } else if (index === 3) {
      const addCategory = `Earring/category`;
      const filterKeyVal = btoa(addCategory);
      navigate(
        `/certified-loose-lab-grown-diamonds/settings/Earring/M=${filterKeyVal}`
      );
    }
    handleToggle();
  };

  // General encoding function
  const encodeLink = (link) => btoa(link);

  const convertLink = (link1, link2) => {
    const [key1, val1] = link1.split("/");
    const [key2, val2] = link2.split("/");
    return btoa(`${key1},${key2}/${val1},${val2}`);
  };

  // Data for styles
  const styleLinks = {
    Solitaire: "Solitaire/style",
    Halo: "Halo/style",
    Vintage: "Vintage/style",
    Side_Stone: "Side Stone/style",
    Designer: "Designer/style",
  };

  // Generate encoded style array
  const styleArr = Object.entries(styleLinks).map(([title, link]) => ({
    title,
    link: `/certified-loose-lab-grown-diamonds/settings/Ring/${title.replace(
      / /g,
      "_"
    )}/M=${encodeLink(link)}`,
    link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/${title.replace(
      / /g,
      "_"
    )}/M=${encodeLink(link)}`,
  }));

  // Data for categories
  const categoryLinks = {
    Women: "Women/gender",
    Men: "Men/gender",
  };

  const womenCategories = {
    Classic_Rings: "Classic Rings/sub_category",
    Diamond_Rings: "Diamond Rings/sub_category",
    Eternity_Rings: "Eternity Rings/sub_category",
    Half_Eternity_Rings: "Half-Eternity Rings/sub_category",
    Stackable_Rings: "Stackable Rings/sub_category",
    High_End_Exclusive: "High End Exclusive/sub_category",
  };

  const menCategories = {
    Carved_Rings: "Carved Rings/sub_category",
    Diamond_Rings: "Diamond Rings/sub_category",
    Classic_Rings: "Classic Rings/sub_category",
  };

  // Generate encoded category arrays
  const generateCategoryArr = (baseLink, categories) =>
    Object.entries(categories).map(([key, subCategory]) => ({
      title: key.replace(/_/g, " "),
      link: `/certified-loose-lab-grown-diamonds/settings/Ring/${key}/M=${convertLink(
        baseLink,
        subCategory
      )}`,
      link1: `/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/${key}/M=${convertLink(
        baseLink,
        subCategory
      )}`,
    }));

  const womenArr = generateCategoryArr(categoryLinks.Women, womenCategories);
  const menArr = generateCategoryArr(categoryLinks.Men, menCategories);

  const handleCategorySettFlow = (link, link1) => {
    if (checkSteps) {
      navigate(link1);
    } else {
      if (checkStepsOf0) {
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
      }
      navigate(link);
      const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
    }
  }

  const handleStyleSettFlow = (link, link1) => {
    if (checkSteps) {
      navigate(link1);
    } else {
      if (checkStepsOf0) {
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
      }
      navigate(link);
      const step1 = [{ step1: true, Setting: "Ring", id: 1, Status: "active" }];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(step1));
    }
  }
  return (
    <>
      <div className="For_Nav_first_Menu">
        <div className="for_first_col">
          <h3>
            <a href="lab-created-engagement-rings" style={styleHref}>
              Engagement Ring
            </a>
          </h3>
          <div className="for_ring_section">
            <div className="for_start_flow_div">
              <div className="for_col_1">
                <h3>create your own diamond ring</h3>
                <div class="ring-types">
                  {checkSteps ? (
                    <span class="ring-type" onClick={() => handleCheckSteps("Ring", 1, "", "/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==")}>
                      <GiDiamondRing size={15} /> start with a setting
                    </span>
                  ) : (
                    <span
                      class="ring-type"
                      onClick={() => {
                        HandleSettingNavigation("Ring");
                      }}
                    >
                      <GiDiamondRing size={15} /> start with a setting
                    </span>
                  )}
                  {checkSteps ? (
                    <span class="ring-type" onClick={() => handleCheckSteps("Diamond", 0)}>
                      <IoDiamondOutline size={15} /> Start With a Diamond
                    </span>
                  ) : (
                    <span
                      class="ring-type"
                      onClick={() => HandleDiamondNavigation('ring')}
                    >
                      <IoDiamondOutline size={15} /> Start With a Diamond
                    </span>
                  )}
                </div>
              </div>
              <div className="for_col_1">
                <h3>create your own diamond pendant</h3>
                <div class="ring-types">
                  {checkSteps ? (
                    <span class="ring-type" onClick={() => handleCheckSteps("Pendant", 2, "", "/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==")}>
                      <GiDiamondRing size={15} /> start with a setting
                    </span>
                  ) : (
                    <span
                      class="ring-type"
                      onClick={() => {
                        HandleSettingNavigation("Pendant");
                      }}
                    >
                      <GiDiamondRing size={15} /> start with a setting
                    </span>
                  )}
                  {checkSteps ? (
                    <span class="ring-type" onClick={() => handleCheckSteps("Diamond", 0)}>
                      <IoDiamondOutline size={15} /> Start With a Diamond
                    </span>
                  ) : (
                    <span
                      class="ring-type"
                      onClick={() => HandleDiamondNavigation('pendant')}
                    >
                      <IoDiamondOutline size={15} /> Start With a Diamond
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="ear_for_col_1">
              <h3>create your own diamond earring</h3>
              <div class="ring-types">
                {checkSteps ? (
                  <span class="ring-type" onClick={() => handleCheckSteps("Earring", 3, "", "/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==")}>
                    <GiCrystalEarrings size={27} /> start with a setting
                  </span>
                ) : (
                  <span
                    class="ring-type"
                    onClick={() => {
                      HandleSettingNavigation("Earring");
                    }}
                  >
                    <GiCrystalEarrings size={27} /> start with a setting
                  </span>
                )}
                {checkSteps ? (
                  <span class="ring-type" onClick={() => handleCheckSteps("Diamond", 0)}>
                    <IoDiamondOutline size={15} /><IoDiamondOutline size={15} /> Start With a Diamond
                  </span>
                ) : (
                  <span
                    class="ring-type"
                    onClick={() => HandleDiamondNavigation("earring")}
                  >
                    <IoDiamondOutline size={15} /><IoDiamondOutline size={15} /> Start With a Diamond
                  </span>
                )}
              </div>
            </div>
            <div className="for_col_2">
              <h3>shop By style</h3>
              <div class="ring-types-col">
                {styleArr?.map((item, index) => (
                  <>
                    {checkSteps ? (
                      <span key={index} onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}>
                        {item?.title}
                      </span>
                    ) : (
                      <span key={index} onClick={() => handleStyleSettFlow(item?.link, item?.link1)}>
                        {item?.title}
                      </span>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="for_col_3">
              <h3 onClick={() => navigate('/bespoke-jewelry')}>
                <img
                  src={`${storImagePath()}/Forevery/writing.png`}
                  alt=""
                  width={20}
                  height={20}
                />
                Bespoke
              </h3>
            </div>
          </div>
        </div>
        <div className="for_second_col">
          <h3>
            {" "}
            <a href="lab-grown-wedding-rings" style={styleHref}>
              Wedding Ring
            </a>
          </h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3
                onClick={() =>
                  navigate(
                    `/certified-loose-lab-grown-diamonds/settings/Ring/Women/M=${encodeLink(
                      categoryLinks.Women
                    )}`
                  )
                }
              >
                <img src={`${storImagePath()}/Forevery/women.png`} alt="" />{" "}
                Women
              </h3>
              <div class="ring-types">
                {womenArr?.map((item, index) => (
                  <>
                    {checkSteps ? (
                      <span
                        key={index}
                        class="ring-type"
                        onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}
                      >
                        {item?.title}
                      </span>
                    ) : (
                      <span
                        key={index}
                        class="ring-type"
                        // onClick={() => navigate(item?.link)}
                        onClick={() => handleCategorySettFlow(item?.link, item?.link1)}
                      >
                        {item?.title}
                      </span >
                    )}
                  </>

                ))}
              </div>
            </div>
            <div className="for_col_2">
              <h3
                onClick={() =>
                  navigate(
                    `/certified-loose-lab-grown-diamonds/settings/Ring/Men/M=${encodeLink(
                      categoryLinks.Men
                    )}`
                  )
                }
              >
                <img src={`${storImagePath()}/Forevery/boy.png`} alt="" /> Men
              </h3>

              <div class="ring-types">
                {menArr?.map((item, index) => (
                  <>
                    {checkSteps ? (
                      <span
                        key={index}
                        class="ring-type"
                        onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}
                      >
                        {item?.title}
                      </span>
                    ) : (
                      <span
                        key={index}
                        class="ring-type"
                        onClick={() => handleCategorySettFlow(item?.link, item?.link1)}
                      >
                        {item?.title}
                      </span >
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          {/* <img src={commonImage} alt="" /> */}
          <img src={banner?.navbarMenu?.image?.[0]} alt="" />
        </div>
      </div >
      <Modal
        open={showModal}
        handleConfirm={handleConfirm}
        handleClose={handleToggle}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
      />
    </>
  );
};
const SecondNavMenu = ({ data, setCustomizeStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [shape, setShape] = useState();
  const Navigate = useNavigate();
  const banner = useHomeBannerImages();
  const location = useLocation();
  const [checkIndex, setCheckIndex] = useState();
  // const [urlData, setUrlData] = useState();
  // const [urlDiaData, setUrlDiaData] = useState();

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const getShapeFromStep0 = steps?.[0]?.shape;
  const getShapeFromStep1 = steps1?.[1]?.shape;
  const getShapeFromStep2 = steps2?.[1]?.shape;

  // useEffect(() => {
  //   const pathname = location.pathname;
  //   if (pathname) {
  //     const segments = pathname.split('/');
  //     const mSegment = segments.find(segment => segment.startsWith('M='));
  //     const diaSegment = segments.find(segment => segment.startsWith('diamond_shape='));
  //     const diaData = diaSegment?.split('=')[1];
  //     setUrlDiaData(
  //       diaData && diaData !== "undefined"
  //         ? diaData
  //         : getShapeFromStep0 || getShapeFromStep1 || getShapeFromStep2
  //     );
  //     if (mSegment) {
  //       const value = mSegment.split('=')[1];
  //       setUrlData(value);
  //     } else {
  //       console.log("M= not found in the URL.");
  //     }
  //   } else {
  //     console.log("Location pathname is not available.");
  //   }
  // }, [location?.key])

  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1 ?? steps2)?.[2]?.url}`;
  const createYesUrl = `/certified-loose-lab-grown-diamonds/diamond/`;

  const handleNoConfirm = () => {
    const getRingSteps = [...steps1];
    sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(getRingSteps));
    setShowModal(false);
    Navigate(`/certified-loose-lab-grown-diamonds/diamond/${getRingSteps?.[1]?.shape}`);
  };

  const handleToggle = () => {
    setShowModal(!showModal);
  }

  const handleToggle1 = () => {
    setShowModal1(!showModal1);
  }

  const handleConfirm = () => {
    Navigate(createUrl);
  }

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

  const checkStepsOf1 =
    (steps?.[1] !== undefined && steps?.[1] !== null) ||
    (steps1?.[1] !== undefined && steps1?.[1] !== null) ||
    (steps2?.[1] !== undefined && steps2?.[1] !== null) ||
    (steps3?.[1] !== undefined && steps3?.[1] !== null);

  const handleCheckSteps = (value, link, index) => {
    let isStepValid = false;
    let shapeVal;

    // if (value === "Diamond Rings" && steps1?.[2]?.step3 === true) {
    if (value === "Diamond Rings") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isRing', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isPendant')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ=="
      }
      // } else if (value === "Diamond Pendant" && steps2?.[2]?.step3 === true) {
    } else if (value === "Diamond Pendant") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isPendant', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isRing')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ=="
      }
    } else if (value === "Diamond Earrings") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isPair', true)
        sessionStorage.removeItem('isPendant')
        sessionStorage.removeItem('isRing')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ=="
      }
    }
    else if (value !== "Diamond Rings" && value !== "Diamond Pendant" && value !== "Diamond Earrings") {
      isStepValid = checkSteps
    }

    if (isStepValid) {
      setShowModal(true);
      setCheckIndex(index);
      setShape((value === "Diamond Rings" || value === "Diamond Pendant") ? shapeVal : value);
    }
    else {
      Navigate(link);
      if (value === "Diamond Rings" && steps1?.[2]?.step3 !== true) {
        if (!steps1) {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
        } else {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);

        }
      }
      if (value === "Diamond Pendant" && steps2?.[2]?.step3 !== true) {
        if (!steps2) {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`);
        } else {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/M=UGVuZGFudC9jYXRlZ29yeQ==`);
        }
      }
    };
  }

  const handleCheckStepsForSett = (link, val, id) => {
    const regex = /M=([^/]+)/;
    const match = link.match(regex);
    let mValue;
    if (match) {
      mValue = match[1];
    } else {
      // console.log('M value not found.');
    }

    const updatedSteps = [{ step1: true, Setting: val, id }];

    if (val === "Ring") {
      if (val === "Ring" && checkSteps) {
        Navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        sessionStorage.setItem('isRing', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isPendant')
        Navigate(link);
      }
    }
    else if (val === "Pendant") {
      if (val === "Pendant" && checkSteps) {
        Navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UGVuZGFudC9jYXRlZ29yeQ====`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Earring');
            sessionStorage.removeItem('custStepData2Earring')
          }
        }
        sessionStorage.setItem('isPendant', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isRing')
        Navigate(link);
      }
    }
    else if (val === "Earring") {
      if (val === "Earring" && checkSteps) {
        Navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UGVuZGFudC9jYXRlZ29yeQ====`);
      } else {
        if (checkStepsOf0) {
          if (steps?.[0] !== undefined && steps?.[0] !== null) {
            sessionStorage.removeItem('customizeSteps')
            sessionStorage.removeItem("custStepData");
          } else {
            sessionStorage.removeItem('customizeSteps2Ring');
            sessionStorage.removeItem('custStepData2Ring')
            sessionStorage.removeItem('customizeSteps2Pendant');
            sessionStorage.removeItem('custStepData2Pendant')
          }
        }
        sessionStorage.setItem('isPair', true)
        sessionStorage.removeItem('isPendant')
        sessionStorage.removeItem('isRing')
        Navigate(link);
      }
    }
  };

  const HandleDiamondNavigation = (shape) => {
    if (checkStepsOf0 && (steps1?.[1]?.step2 !== true && steps2?.[1]?.step2 !== true && steps3?.[1]?.step2 !== true)) {
      sessionStorage.removeItem('customizeSteps2Ring');
      sessionStorage.removeItem('custStepData2Ring')
      sessionStorage.removeItem('customizeSteps2Pendant');
      sessionStorage.removeItem('custStepData2Pendant')
      sessionStorage.removeItem('customizeSteps2Earring');
      sessionStorage.removeItem('custStepData2Earring')
      Navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
      setCustomizeStep({
        step1: true,
        step2: false,
        step3: false,
      });
      const step1 = [{ step1: true, shape: shape }];
      sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
    } else {
      if (steps1?.[1]?.step2 === true || steps2?.[1]?.step2 === true || steps3?.[1]?.step2 === true) {
        const getShape = steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape;
        if (getShape !== shape) {
          setShowModal1(true);
        } else {
          handleNoConfirm();
        }
      } else {
        Navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
        setCustomizeStep({
          step1: true,
          step2: false,
          step3: false,
        });
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        const step1 = [{ step1: true, shape: shape }];
        sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
      }
    }
  };

  const handleRemoveData = (index) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem("customizeSteps2Pendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("customizeSteps2Earring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem("isRing");
    sessionStorage.removeItem("isPendant");
    sessionStorage.removeItem("isPair");
    if (index === 0) {
      Navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
    } else if (index === 1) {
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    } else if (index === 2) {
      const addCategory = `Pendant/category`;
      const filterKeyVal = btoa(addCategory);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Pendant/M=${filterKeyVal}`
      );
    } else {
      const addCategory = `Earring/category`;
      const filterKeyVal = btoa(addCategory);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Earring/M=${filterKeyVal}`
      );
    }
    handleToggle();
  };

  const navigateToAllDiamond = () => {
    if (checkSteps) {
      setShowModal(true);
    } else {
      Navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
    }
  }

  return (
    <div className="Second_Nav_first_Menu">
      <div className="for_first_col">
        <h3>
          <a href="/diamond" style={styleHref}>
            Lab Grown Diamonds
          </a>{" "}
        </h3>
        <div className="for_ring_section">
          <div className="for_col_2">
            <h3>Shop By Style</h3>
            <div className="ring-types-col">
              {diamondShapes?.map((val, i) => {
                return (
                  <>
                    {checkSteps ? (
                      <span onClick={() => handleCheckSteps(val?.name, " ", 0)}>
                        <img src={val?.img} alt="" width={15} height={15} />
                        {val?.name}
                      </span>
                    ) : (
                      <span onClick={() => HandleDiamondNavigation(val?.name)}>
                        <img src={val?.img} alt="" width={15} height={15} />
                        {val?.name}
                      </span>
                    )}
                  </>
                );
              })}
              <span className="view-all-last" onClick={navigateToAllDiamond}>View All</span>
            </div>
          </div>
        </div>
      </div>
      <div className="for_second_col">
        <h3>Build Your Jewelry</h3>
        <div className="for_ring_section">
          {SideItems?.map((val, i) => {
            return (
              <>
                {checkSteps ? (
                  <span
                    className="ring-type"
                    key={i}
                    onClick={() => {
                      handleCheckSteps(val?.name, val?.link, val?.name === "Diamond Rings" ? 1 : val?.name === "Diamond Pendant" ? 2 : 3);
                    }}
                  >
                    <img src={val?.img} alt="" width={18} height={18} />
                    {val?.name}
                  </span>
                ) :
                  <>
                    <span
                      className="ring-type"
                      key={i}
                      onClick={() => {
                        handleCheckStepsForSett(val?.link, val?.name === "Diamond Rings" ? "Ring" : val?.name === "Diamond Pendant" ? "Pendant" : "Earring", val?.name === "Diamond Rings" ? 1 : val?.name === "Diamond Pendant" ? 2 : 3);  // Pass the correct value
                      }}
                    >
                      <img src={val?.img} alt="" width={18} height={18} />
                      {val?.name}
                    </span>
                  </>
                }
              </>
            )
          })}
        </div>
      </div>
      <div className="for_third_col">
        {/* <img src={commonImage} alt="" /> */}
        <img src={banner?.navbarMenu?.image?.[0]} alt="" />
      </div>
      <Modal
        open={showModal}
        handleConfirm={handleConfirm}
        handleClose={handleToggle}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
      />
      <CheckingDiaSetModal
        open={showModal1}
        link1={createYesUrl}
        handleNoConfirm={handleNoConfirm}
        handleClose={handleToggle1}
        handleRemoveData={handleRemoveData}
        index={checkIndex}
      />
    </div>
  );
};
const ThirdNavMenu = ({ data }) => {
  const Navigate = useNavigate();
  const [menuItems, setMenuItems] = useRecoilState(for_NavbarItems);
  const banner = useHomeBannerImages();

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

      // console.log("otherparamsUrl--", otherparamUrl);

      let menuEncoded = `${queryParameters}/${otherparamUrl}`;
      // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
      const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(
        menuEncoded
      )}`;

      // let d = new Date();
      // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
      Navigate(url);
    }
  };

  return (
    <>
      <div className="Third_Nav_first_Menu">
        <ul className="masonry-layout">
          {menuItems?.map((menuItem) => {
            const hasValidSubMenu =
              menuItem?.param1 && menuItem.param1.length > 0;
            return (
              hasValidSubMenu && (
                <div key={menuItem.menuid} className="main_menu_for">
                  <div
                    className="menu-title"
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
                    <Link
                      to={`/p/${menuItem?.menuname}/?M=${btoa(
                        `${menuItem?.param0dataname}/${menuItem?.param0name}`
                      )}`}
                    >
                      {menuItem.menuname}
                    </Link>
                  </div>
                  <ul className="sub-menu-for">
                    {menuItem?.param1[0]?.param1name !== "" &&
                      menuItem.param1.map((subMenuItem) => (
                        <li
                          key={subMenuItem.param1dataid}
                          className="sub-menu-item-for"
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
                          <Link
                            to={`/p/${menuItem?.param0dataname}/${subMenuItem.param1dataname
                              }/?M=${btoa(
                                `${menuItem?.param0dataname},${subMenuItem?.param1dataname}/${menuItem?.param0name},${subMenuItem?.param1name}`
                              )}`}
                          >
                            {subMenuItem.param1dataname}
                          </Link>
                          {/* <ul className="nested-menu">
                       {subMenuItem.param2.map((subSubMenuItem) => (
                           <li key={subSubMenuItem.param2dataid} className="nested-menu-item">
                               {subSubMenuItem.param2dataname}
                           </li>
                       ))}
                   </ul> */}
                        </li>
                      ))}
                  </ul>
                </div>
              )
            );
          })}
        </ul>
        <ul className="dummy_mas">
          <div className="second_section">
            <div
              className="images"
            // style={{ backgroundImage: `url(${BespokeBannerImage})` }}
            >
              <img
                // src={BespokeBannerImage}
                src={banner?.navbarMenu?.image?.[1]}
                alt=""
                onClick={() => {

                  Navigate(`/bespoke-jewelry`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              {/* <div className="for-s-card">
                <h3>Bespoke Jewlery</h3>
                <button
                  className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
                // onClick={() =>
                //   Navigate(
                //     `/p/Amber/Women/Mangalsutra/Mangalsutra/?M=V29tZW4sTWFuZ2Fsc3V0cmEsTWFuZ2Fsc3V0cmEvZ2VuZGVyLGNhdGVnb3J5LHN1Yl9jYXRlZ29yeQ==`
                //   )
                // }
                >
                  Show More
                </button>
              </div>
              <div className="for-s-card">
                <h3>Bespoke Diamonds</h3>
                <button
                  className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
                // onClick={() =>
                //   Navigate(
                //     `/p/Amber/Women/Mangalsutra/Mangalsutra/?M=V29tZW4sTWFuZ2Fsc3V0cmEsTWFuZ2Fsc3V0cmEvZ2VuZGVyLGNhdGVnb3J5LHN1Yl9jYXRlZ29yeQ==`
                //   )
                // }
                >
                  Show More
                </button>
              </div> */}
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};
const FourNavMenu = ({ data }) => {
  const banner = useHomeBannerImages();

  return (
    <>
      <div className="Fourth_Nav_first_Menu">
        <div className="for_first_col">
          <h3> Fine Jewelry</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>ready to ship jewelry</h3>
              <div class="ring-types">
                <span class="ring-type">Diamond Earrings</span>
                <span class="ring-type">Diamond Neklace</span>
                <span class="ring-type">Diamond Pendants</span>
                <span class="ring-type">Diamond Bracelets</span>
                <span class="ring-type">Diamond Rings</span>
                <span class="ring-type">Signet Rings</span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <h3> </h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>design your own earrings</h3>
              <div class="ring-types">
                <span class="ring-type">
                  <TbSettingsHeart size={15} /> Start With a Setting
                </span>
                <span class="ring-type">
                  <TbDiamond size={15} /> Start With Matching Diamonds
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <h3> </h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>design your own pendant</h3>
              <div class="ring-types">
                <span className="ring-type">
                  <GiGemPendant size={15} /> Start With a Setting
                </span>
                <span className="ring-type">
                  <IoDiamond size={15} /> Start With a Diamond
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          {/* <img src={commonImage} alt="" /> */}
          <img src={banner?.navbarMenu?.image?.[0]} alt="" />

        </div>
      </div>
    </>
  );
};
const LatsNavMenu = ({ data }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  return (
    <>
      <div className="Fifth_Nav_first_Menu">
        <div className="for_first_col">
          <h3>Letter Diamond</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>Choose your letter diamond jewelry</h3>
              <div class="ring-types">
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-ring.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Ring
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-earring.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Earring
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-bracelet.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Bracelets
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-necklace.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Necklace
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>Choose Letter Diamonds</h3>
              <div class="alphabet-types">
                {alphabet?.map((val, i) => {
                  return (
                    <div className="alphabet">
                      <span>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          <div className="second_section">
            <img src={LetterImage} alt="" />
            <div className="for-s-card">
              <h3>
                Letter <span>Diamond Jewlery</span>
              </h3>
              <button
                className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Modal = ({ open, handleConfirm, handleClose, handleRemoveData, index }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              You have already selected mount & diamond, would you like to view
              it?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button
                onClick={() => {
                  handleConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleRemoveData(index);
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};


const CheckingDiaSetModal = ({ open, link1, handleNoConfirm, handleClose, handleRemoveData, index }) => {
  const navigate = useNavigate();

  const handleYesConfirm = () => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("customizeStepsPendant");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem("custStepData2Pendant");
    handleClose();
    const step = [{ step1: true, shape: "All" }]
    sessionStorage.setItem('customizeSteps', JSON.stringify(step));
    window.location.href = link1;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              This Diamond Shape Is Not Compatible With Your Selected Setting.
              Do You Want To Remove Selected Setting And Continue?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button
                onClick={() => {
                  handleYesConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleNoConfirm();
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

