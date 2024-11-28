import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdClose } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { CiHeart, CiUser } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import {
  Hoq_CartCount,
  Hoq_WishCount,
  Hoq_loginState,
} from "../../../Recoil/atom";
import { useRecoilState } from "recoil";
import { PiBagSimpleThin } from "react-icons/pi";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import specific icons

export default function TemporaryDrawer({
  menuItems,
  handleMenu,
  setisMobileMenu,
  isMobileMenu,
}) {
  const [open, setOpen] = React.useState(false);
  const [cartCountNum, setCartCountNum] = useRecoilState(Hoq_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(Hoq_WishCount);
  const [islogin, setislogin] = useRecoilState(Hoq_loginState);
  const navigate = useNavigate();
  const fetchData = () => {
    const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
    setislogin(value);
  };

  React.useEffect(() => {
    fetchData();
  }, [islogin]);

  React.useEffect(() => {
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


  const handleLogout = () => {
    setislogin(false);
    Cookies?.remove("userLoginCookie");
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
    navigate("/");
    window.location.reload();
  };

  const toggleDrawer = () => () => {
    setisMobileMenu(!isMobileMenu);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 310,
        margin: "0",
        padding: "0",
        fontFamily: "DM Sans , Arial",
        // position  :"relative" ,
      }}
      role="presentation"
    >
      <div
        className="upper_Section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
          padding: "40px 10px",
        }}
      >
        <div className="left">
          <MdClose size={32} cursor={"pointer"} onClick={toggleDrawer()} />
        </div>
        <div
          className="right"
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row-reverse",
          }}
        >
          {islogin && (
            <>
              <Link to={"/wishlist"}>
                <Tooltip title="Wishlist">
                  <Badge
                    badgeContent={wishCountNum}
                    style={{ size: "2px" }}
                    sx={{
                      color: "black",
                      "& .MuiBadge-badge": {
                        fontSize: "10px",
                        padding: "7px",
                        borderRadius: "4px",
                        bgcolor: "#C20000",
                        width: 0,
                        height: 0,
                      },
                    }}
                    color="primary"
                  >
                    <CiHeart size={30} color="black" />
                  </Badge>
                </Tooltip>
              </Link>

              <Tooltip title="Cart">
                <Link to={"/account"}>
                  <HiOutlineUserCircle size={30} color="black" />
                </Link>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      {islogin ? (
        <>
          <ul
            className="ul_hoq"
            style={{
              padding: "5px 10px",
              margin: "0",
            }}
          >
            {menuItems?.map((menuItem, i) => {
              const { menuname, param1 } = menuItem;

              return (
                <React.Fragment key={i}>
                  <li
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "0",
                    }}
                  >
                    <Accordion
                      elevation={0}
                      sx={{
                        // borderBottom: "0.2px solid #c7c8c9",
                        borderRadius: 0,
                        padding: 0,
                        margin: 0,
                        "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                          borderBottomLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                        },
                        "&.MuiPaper-root.MuiAccordion-root:before": {
                          background: "none",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                          color: "black",
                          borderRadius: 0,
                          fontWeight: "500",

                          "&.MuiAccordionSummary-root": {
                            padding: 0,
                          },
                        }}
                      >
                        <span
                          onClick={() =>
                            handleMenu({
                              menuname: menuname,
                              key: menuItem?.param0name,
                              value: menuItem?.param0dataname,
                            })
                          }
                        >
                          {menuname}
                        </span>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        <li
                          style={{
                            marginLeft: "-16px",
                            marginBottom: "1px",
                          }}
                        >
                          <span
                            onClick={() =>
                              handleMenu({
                                menuname: menuname,
                                key: menuItem?.param0name,
                                value: menuItem?.param0dataname,
                              })
                            }
                            style={{ cursor: "pointer", fontSize: "16px"  ,fontWeight  :"700"}}
                          >
                            View All
                          </span>
                        </li>
                        {param1 &&
                          param1?.length > 0 &&
                          param1[0].param1name !== "" && (
                            <ul
                              style={{
                                display: "flex",
                                margin: "0",
                                listStyle: "none",
                                flexDirection: "column",
                                gap: "0.5rem",
                                padding: "0",
                              }}
                            >
                              {param1?.map(
                                ({ param1dataname, param1name }, j) => (
                                  <li
                                    style={{
                                      marginLeft: "-16px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleMenu(
                                          {
                                            menuname: menuname,
                                            key: menuItem?.param0name,
                                            value: menuItem?.param0dataname,
                                          },
                                          {
                                            key: param1name,
                                            value: param1dataname,
                                          }
                                        )
                                      }
                                    >
                                      {param1dataname}
                                    </span>
                                    {/* level not needed its present below */}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </AccordionDetails>
                    </Accordion>
                    <Divider />
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
          <div
            className="upper_Section"
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              padding: "5px 10px",
            }}
          >
            {islogin && (
              <Tooltip title="Logout">
                <span
                  onClick={() => handleLogout()}
                  style={{
                    color: "black",
                    borderRadius: 0,
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "10px 0",
                    // marginTop: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    // width: " 100%",
                    cursor: "pointer",
                    marginTop: "25px",
                    bottom: "0",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  Logout <FiLogOut size={18} />
                </span>
              </Tooltip>
            )}
          </div>
        </>
      ) : (
        <ul
          className="ul_hoq"
          style={{
            padding: "5px 10px",
            margin: "0",
          }}
        >
          <li
            style={{
              padding: "15px 12px",
              fontSize: "1.2rem",
            }}
          >
            <Link
              to={"/LoginWithEmail"}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaSignInAlt size={24} /> Login
            </Link>
          </li>
          <Divider />
          <li
            style={{
              padding: "15px 12px",
              fontSize: "1.2rem",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              to={"/Register"}
            >
              <FaUserPlus size={24} /> Register
            </Link>
          </li>
          <Divider />
        </ul>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        sx={{
          zIndex: 9999999,
        }}
        open={isMobileMenu}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

{
  /* {param2 && (
                                 <ul className="sub_submenu">
                                   {param2?.map(
                                     ({ param2dataname, param2name }, j) => (
                                       <li>
                                         <span
                                           onClick={() =>
                                             handleMenu(
                                               {
                                                 menuname: menuname,
                                                 key: menuItem?.param0name,
                                                 value: menuItem?.param0dataname,
                                               },
                                               {
                                                 key: param1name,
                                                 value: param1dataname,
                                               },
                                               {
                                                 key: param2name,
                                                 value: param2dataname,
                                               }
                                             )
                                           }
                                         >
                                           {param2dataname}
                                         </span>
                                       </li>
                                     )
                                   )}
                                 </ul>
                               )} */
}
