import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import {
  for_CartCount,
  for_NavbarItems,
  for_WishCount,
  for_customizationSteps,
  for_customizationSteps1,
  for_loginState,
} from "../../../Recoil/atom";
import LoginIcon from "@mui/icons-material/Login";
import "./MobileCss.scss";
import { IoClose, IoDiamondOutline } from "react-icons/io5";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { IoIosSearch } from "react-icons/io";
import { SideItems, diamondShapes } from "../../../data/NavbarMenu";
import { GiCrystalEarrings, GiDiamondRing } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function MobileNav({ open, onClose }) {
  const [cartCountNum, setCartCountNum] = useRecoilState(for_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(for_WishCount);
  const [islogin, setislogin] = useRecoilState(for_loginState);
  const [menuItems, setMenuItems] = useRecoilState(for_NavbarItems);
  const [LoginUserDetails, setLoginUserDetails] = React.useState(null);
  const navigate = useNavigate();
  const fetchData = () => {
    const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
    setislogin(value);
  };
  const [storeinit, setstoreinit] = React.useState(null);
  React.useEffect(() => {
    let storeInt = JSON.parse(sessionStorage?.getItem("storeInit"));
    setstoreinit(storeInt);
  }, []);
  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  const [customizeStep1, setCustomizeStep1] = useRecoilState(
    for_customizationSteps1
  );
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(`loginUserDetail`));
    setLoginUserDetails(data);
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

  const handleMenu = (param, param1, param2) => {
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
    navigate(url);
  };

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

  const NavbarMenu = [
    {
      title: "Engagement & Wedding Diamonds",
      link: `/lab-created-engagement-rings`,
      submenu: [
        {
          title: "Engagement & Wedding Diamonds",
        },
      ],
    },
    {
      title: "Diamond",
      link: `/diamond`,
      submenu: [{}],
    },
    {
      title: "High End Jewelry",
      link: `/p/Ikigai/?M=SWtpZ2FpL2NvbGxlY3Rpb24=`,
      submenu: [{}],
    },
  ];

  const Navigate = useNavigate();

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
        Navigate(`/p/${searchText}?S=${encodeObj}`);
        setSearchText("");
      }
    }
  };



  // Diamond All Function or Steps Starts heere


  const [showModal, setShowModal] = React.useState(false);
  const [shape, setShape] = React.useState();
  const [checkIndex, setCheckIndex] = React.useState();
  const [showModal1, setShowModal1] = React.useState(false);
  const [typeFlow, setTypeFlow] = React.useState();

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const handleNoConfirm = () => {
    if (steps1?.[0]?.Status === 'active') {
      const getRingSteps = [...steps1];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(getRingSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getRingSteps?.[1]?.shape}`);
    }
    if (steps2?.[0]?.Status === 'active') {
      const getPendantSteps = [...steps2];
      sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(getPendantSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getPendantSteps?.[1]?.shape}`);
    }
    if (steps3?.[0]?.Status === 'active') {
      const getEarringSteps = [...steps3];
      sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(getEarringSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getEarringSteps?.[1]?.shape}`);
    }
  };

  const createYesUrl = `/certified-loose-lab-grown-diamonds/diamond/`;

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

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

  const handleCheckSteps = (value, index, style, link, type) => {
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
      setTypeFlow(type)
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

  const handleCheckStepssSecondMenu = (value, link, index) => {
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
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
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
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
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
        sessionStorage.removeItem('customizeSteps')
        sessionStorage.removeItem("custStepData");
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
      if (value === "Diamond Earring" && steps3?.[2]?.step3 !== true) {
        if (!steps3) {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`);
        } else {
          Navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/M=RWFycmluZy9jYXRlZ29yeQ==`);
        }
      }
    };
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
          setShape(shape);
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
    sessionStorage.removeItem('ringFlowUrl');
    sessionStorage.removeItem('PendantFlowUrl');
    sessionStorage.removeItem('EarringFlowUrl');
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')

    if (index === 0) {
      Navigate(`/certified-loose-lab-grown-diamonds/diamond/`);
    } else if (index === 1) {
      const addCategory = `Ring/category`;
      const filterKeyVal = btoa(addCategory);
      sessionStorage.setItem('isRing', true);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Ring/M=${filterKeyVal}`
      );
    } else if (index === 2) {
      const addCategory = `Pendant/category`;
      const filterKeyVal = btoa(addCategory);
      sessionStorage.setItem('isPendant', true);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Pendant/M=${filterKeyVal}`
      );
    } else if (index === 3) {
      const addCategory = `Earring/category`;
      const filterKeyVal = btoa(addCategory);
      sessionStorage.setItem('isPair', true);
      Navigate(
        `/certified-loose-lab-grown-diamonds/settings/Earring/M=${filterKeyVal}`
      );
    }
    handleToggle();
  };

  //  fIRST engagement ring making process function and hooks

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
            sessionStorage.removeItem('custStepData2Earring');
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

  const HandleDiamondNavigationFirstLevel = (value) => {
    const isEarring = value === "earring";
    const isRing = value === "ring";
    const isPendant = value === "pendant";

    if (
      checkStepsOf0 &&
      (steps1?.[1]?.step2 !== true &&
        steps2?.[1]?.step2 !== true &&
        steps3?.[1]?.step2 !== true)
    ) {
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
    } else if (steps1?.[1]?.step2 === true || steps2?.[1]?.step2 === true || steps3?.[1]?.step2 === true) {
      const getShape = steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape;
      if (getShape) {
        setShowModal1(true);
        setTypeFlow(value);
      } else {
        handleNoConfirm();
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

    // const step1 = [{ step1: true, shape: "All" }];
    // sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveDataFirstLevel = (index) => {
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
    sessionStorage.removeItem('ringFlowUrl');
    sessionStorage.removeItem('PendantFlowUrl');
    sessionStorage.removeItem('EarringFlowUrl');
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')

    if (index === 0) {
      if (typeFlow === "Ring") {
        sessionStorage.setItem('isRing', true)
      } else if (typeFlow === "Pendant") {
        sessionStorage.setItem('isPendant', true)
      } else if (typeFlow === "Earring") {
        sessionStorage.setItem('isPair', true)
      }
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

  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1 ?? steps2)?.[2]?.url}`;
  const handleConfirm = () => {
    Navigate(createUrl);
  }

  const handleToggle1 = () => {
    setShowModal1(!showModal1);
  }

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

  const DrawerList = (
    <Box
      className="navbar_mobile_drawer"
      role="presentation"
      sx={{
        width: 700,
        "@media (max-width: 768px)": {
          width: 540,
        },
        "@media (max-width: 540px)": {
          width: 500,
        },
        "@media (max-width: 430px)": {
          width: 350,
        },
        "@media (max-width: 340px)": {
          width: 300,
        },
      }}
    >
      <div className="for_mobile_DrawerList">
        <div className="close_btn_Section">
          <span>
            <IoClose size={22} onClick={onClose} />
          </span>
        </div>
        <div className="profile_btn_Section">
          <img src={`${storImagePath()}/forevery/profile.svg`} alt="" />
          {LoginUserDetails !== null ? (
            <Link to={"/account"}>Hey , {LoginUserDetails?.firstname}</Link>
          ) : (
            <Link to={"/LoginOption"}>LOGIN</Link>
          )}
        </div>
        <div className="searchbar-m-r">
          <div className="search_mob">
            <input
              type="text"
              placeholder="Search Forevery"
              value={searchText}
              autoFocus
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={searchDataFucn}
            />
            <IoIosSearch size={27} onClick={searchDataFucn} />
          </div>
        </div>
        <div className="mobile_nav_manu">
          <div className="Menu_m_a">
            {/* Level 1 */}
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 25px",
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
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ width: "40px", fontSize: "2rem", color: "#000" }}
                  />
                }
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
                <span className="title_for_accordian">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={`/lab-created-engagement-rings`}
                  >
                    {`Engagement & Wedding Diamonds `}
                  </Link>
                </span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {/* Level 1 */}
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
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
                      <span className="title_for_accordian">
                        Create your own diamond ring
                      </span>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      padding: "0"
                    }}>
                      {/* Data here Subrata */}
                      <div class="diamond_list_for_list">
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Ring", 1, "", "/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==")}>
                            <GiDiamondRing size={15} /> start with a setting
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => {
                              HandleSettingNavigation("Ring");
                            }}
                          >
                            <GiDiamondRing size={15} /> start with a setting
                          </span>
                        )}
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Diamond", 0, "", "", "Ring")}>
                            <IoDiamondOutline size={15} /> Start With a Diamond
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => HandleDiamondNavigationFirstLevel('ring')}
                          >
                            <IoDiamondOutline size={15} /> Start With a Diamond
                          </span>
                        )}
                      </div>
                      <Modal
                        open={showModal}
                        handleConfirm={handleConfirm}
                        handleClose={handleToggle}
                        handleRemoveData={handleRemoveDataFirstLevel}
                        index={checkIndex}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
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
                      <span className="title_for_accordian">
                        Create your own diamond Pendant
                      </span>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      padding: "0"
                    }}>
                      {/* Data here Subrata */}
                      <div class="diamond_list_for_list">
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Pendant", 2, "", "/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==")}>
                            <GiDiamondRing size={15} /> start with a setting
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => {
                              HandleSettingNavigation("Pendant");
                            }}
                          >
                            <GiDiamondRing size={15} /> start with a setting
                          </span>
                        )}
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Diamond", 0, "", "", "Pendant")}>
                            <IoDiamondOutline size={15} /> Start With a Diamond
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => HandleDiamondNavigationFirstLevel('pendant')}
                          >
                            <IoDiamondOutline size={15} /> Start With a Diamond
                          </span>
                        )}
                      </div>
                      <Modal
                        open={showModal}
                        handleConfirm={handleConfirm}
                        handleClose={handleToggle}
                        handleRemoveData={handleRemoveDataFirstLevel}
                        index={checkIndex}
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
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
                      <span className="title_for_accordian">
                        Create your own diamond Earring
                      </span>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      padding: "0"
                    }}>
                      {/* Data here Subrata */}
                      <div class="diamond_list_for_list">
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Earring", 3, "", "/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==")}>
                            <GiCrystalEarrings size={15} /> start with a setting
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => {
                              HandleSettingNavigation("Earring");
                            }}
                          >
                            <GiCrystalEarrings size={15} /> start with a setting
                          </span>
                        )}
                        {checkSteps ? (
                          <span class="diamond_shape_step_li" onClick={() => handleCheckSteps("Diamond", 0, "", "", "Earring")}>
                            <span>
                              <IoDiamondOutline size={15} /><IoDiamondOutline size={15} /> Start With a Diamond
                            </span>
                          </span>
                        ) : (
                          <span
                            class="diamond_shape_step_li"
                            onClick={() => HandleDiamondNavigationFirstLevel('earring')}
                          >
                            <span>
                              <IoDiamondOutline size={15} /><IoDiamondOutline size={15} /> Start With a Diamond
                            </span>
                          </span>
                        )}
                      </div>
                      <Modal
                        open={showModal}
                        handleConfirm={handleConfirm}
                        handleClose={handleToggle}
                        handleRemoveData={handleRemoveDataFirstLevel}
                        index={checkIndex}
                      />
                    </AccordionDetails>
                  </Accordion>
                  {/* Level 1 */}
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
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
                      <span className="title_for_accordian">Shop by style</span>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      padding: "0"
                    }}>
                      <div className="diamond_list_for_list">
                        {styleArr?.map((item, index) => (
                          <>
                            {checkSteps ? (
                              <span className="diamond_shape_step_li" key={index} onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}>
                                {item?.title}
                              </span>
                            ) : (
                              <span className="diamond_shape_step_li" key={index} onClick={() => handleStyleSettFlow(item?.link, item?.link1)}>
                                {item?.title}
                              </span>
                            )}
                          </>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  {/* Level 1 */}
                  <div
                    style={{
                      borderRadius: "0",
                      margin: "0",
                    }}
                  >
                    <div
                      style={{
                        color: "black",
                        fontWeight: "500",
                        padding: "8px 0",
                        cursor: "default",
                      }}
                    >
                      <span className="title_for_accordian" onClick={() => navigate('/bespoke-jewelry')}>Bespoke</span>
                    </div>
                  </div>

                  {/* Level 1 */}
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
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
                      <span className="title_for_accordian">Wedding Ring</span>
                    </AccordionSummary>
                    <AccordionDetails
                      className="diamond_list_for_list"
                      sx={{
                        padding: "0", margin: "0"
                      }}>
                      {/* level 1 */}
                      <Accordion
                        elevation={0}
                        sx={{
                          borderRadius: 0,
                          margin: 0,
                          "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:before": {
                            background: "none",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:before": {
                            background: "none",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              sx={{
                                width: "40px",
                                fontSize: "1.6rem",
                                color: "#000",
                              }}
                            />
                          }
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
                          <span className="diamond_shape_step_li" onClick={() =>
                            navigate(
                              `/certified-loose-lab-grown-diamonds/settings/Ring/Women/M=${encodeLink(
                                categoryLinks.Women
                              )}`
                            )
                          }>
                            <img src={`${storImagePath()}/Forevery/women.png`} alt="" />
                            Womens</span>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                          padding: 0
                        }}>
                          <div class="diamond_list_for_list">
                            {womenArr?.map((item, index) => (
                              <>
                                {checkSteps ? (
                                  <span
                                    key={index}
                                    class="diamond_shape_step_li"
                                    onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}
                                  >
                                    {item?.title}
                                  </span>
                                ) : (
                                  <span
                                    key={index}
                                    class="diamond_shape_step_li"
                                    onClick={() => handleCategorySettFlow(item?.link, item?.link1)}
                                  >
                                    {item?.title}
                                  </span>
                                )}
                              </>
                            ))}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      {/* level 2 */}
                      <Accordion
                        elevation={0}
                        sx={{
                          borderRadius: 0,
                          margin: 0,
                          "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                            borderBottomLeftRadius: "0px",
                            borderBottomRightRadius: "0px",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:before": {
                            background: "none",
                          },
                          "&.MuiPaper-root.MuiAccordion-root:before": {
                            background: "none",
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              sx={{
                                width: "40px",
                                fontSize: "1.6rem",
                                color: "#000",
                              }}
                            />
                          }
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
                          <span className="diamond_shape_step_li" onClick={() =>
                            navigate(
                              `/certified-loose-lab-grown-diamonds/settings/Ring/Men/M=${encodeLink(
                                categoryLinks.Men
                              )}`
                            )
                          }>
                            <img src={`${storImagePath()}/Forevery/boy.png`} alt="" /> Men
                          </span>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                          padding: 0
                        }}>
                          <div class="diamond_list_for_list">
                            {menArr?.map((item, index) => (
                              <>
                                {checkSteps ? (
                                  <span
                                    key={index}
                                    class="diamond_shape_step_li"
                                    onClick={() => handleCheckSteps("Ring", 1, item?.title, item?.link1)}
                                  >
                                    {item?.title}
                                  </span>
                                ) : (
                                  <span
                                    key={index}
                                    class="diamond_shape_step_li"
                                    onClick={() => handleCategorySettFlow(item?.link, item?.link1)}
                                  >
                                    {item?.title}
                                  </span>
                                )}
                              </>
                            ))}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  </Accordion>
                </span>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="Menu_m_a">
            {/* Level 1 */}
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 25px",
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
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      width: "40px",
                      fontSize: "2rem",
                      color: "#000",
                      marginRight: "4px",
                    }}
                  />
                }
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
                <span className="title_for_accordian">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={`/diamond`}
                  >
                    {`Diamond`}
                  </Link>
                </span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                {/* Level 1 */}
                <Accordion
                  elevation={0}
                  sx={{
                    borderRadius: 0,
                    margin: 0,
                    "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                      borderBottomLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                    },
                    "&.MuiPaper-root.MuiAccordion-root:before": {
                      background: "none",
                    },
                    "&.MuiPaper-root.MuiAccordion-root:before": {
                      background: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          width: "40px",
                          fontSize: "1.6rem",
                          color: "#000",
                        }}
                      />
                    }
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
                    <span className="diamond_shape_step_li">Shop By Style</span>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    <div className="diamond_list_for_list">
                      {diamondShapes?.map((val, i) => {
                        return (
                          <>
                            {checkSteps ? (
                              <span
                                className="diamond_shape_step_li"
                                onClick={() => handleCheckStepssSecondMenu(val?.name, " ", 0)}
                              >
                                <img
                                  src={val?.img}
                                  alt=""
                                  width={15}
                                  height={15}
                                />
                                {val?.name}
                              </span>
                            ) : (
                              <span
                                className="diamond_shape_step_li"
                                onClick={() => HandleDiamondNavigation(val?.name)}
                              >
                                <img
                                  src={val?.img}
                                  alt=""
                                  width={15}
                                  height={15}
                                />
                                {val?.name}
                              </span>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
                {/* Level 2 */}
                <Accordion
                  elevation={0}
                  sx={{
                    borderRadius: 0,
                    margin: 0,
                    "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                      borderBottomLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                    },
                    "&.MuiPaper-root.MuiAccordion-root:before": {
                      background: "none",
                    },
                    "&.MuiPaper-root.MuiAccordion-root:before": {
                      background: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          width: "40px",
                          fontSize: "1.6rem",
                          color: "#000",
                        }}
                      />
                    }
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
                    <span className="diamond_shape_step_li">
                      Build Your Jewelry
                    </span>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: "0",
                    }}
                  >
                    <div className="diamond_list_for_list">
                      {SideItems?.slice(0, 1)?.map((val, i) => (
                        <>
                          {checkSteps ? (
                            <span
                              className="diamond_shape_step_li"
                              key={i}
                              onClick={() => {
                                handleCheckSteps(val?.name, val?.link, val?.name === "Diamond Rings" ? 1 : val?.name === "Diamond Pendant" ? 2 : 3);
                              }}
                            >
                              <img src={val?.img} alt="" width={18} height={18} />
                              {val?.name}
                            </span>
                          ) : (
                            <span
                              className="diamond_shape_step_li"
                              key={i}
                              onClick={() => {
                                handleCheckStepsForSett(val?.link, val?.name === "Diamond Rings" ? "Ring" : val?.name === "Diamond Pendant" ? "Pendant" : "Earring", val?.name === "Diamond Rings" ? 1 : val?.name === "Diamond Pendant" ? 2 : 3);  // Pass the correct value
                              }}
                            >
                              <img src={val?.img} alt="" width={18} height={18} />
                              {val?.name}
                            </span>
                          )}
                        </>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
            <CheckingDiaSetModal
              open={showModal1}
              link1={createYesUrl}
              handleNoConfirm={handleNoConfirm}
              handleClose={handleToggle1}
              handleRemoveData={handleRemoveData}
              index={checkIndex}
            />
          </div>
          {storeinit?.IsB2BWebsite === 1 && <div className="Menu_m_a">
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 28px",
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
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ width: "40px", fontSize: "2rem", color: "#000" }}
                  />
                }
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
                <span className="title_for_accordian">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    to={`/p/Ikigai/?M=SWtpZ2FpL2NvbGxlY3Rpb24=`}
                  >
                    {`High End Jewelry`}
                  </Link>
                </span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                {/* Level 2 */}
                {menuItems &&
                  menuItems?.map((menuItem, i) => {
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
                              borderRadius: 0,
                              padding: 0,
                              margin: 0,
                              "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                              {
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                              },
                              "&.MuiPaper-root.MuiAccordion-root:before": {
                                background: "none",
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    width: "40px",
                                    fontSize: "1.6rem",
                                    color: "#000",
                                  }}
                                />
                              }
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
                                className="firstlevel_menu_title"
                              >
                                {menuname}
                              </span>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                padding: "8px 16px 0",
                                marginBottom: "1rem",
                              }}
                            >
                              <li
                                style={{
                                  marginLeft: "-16px",
                                  marginBottom: "1px",
                                }}
                              >
                                {/* <span
                                  onClick={() =>
                                    handleMenu({
                                      menuname: menuname,
                                      key: menuItem?.param0name,
                                      value: menuItem?.param0dataname,
                                    })
                                  }
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                  }}
                                >
                                  View All
                                </span> */}
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
                                      gap: "0.1rem",
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
                                            className="Secondlevel_menu_title"
                                            onClick={() =>
                                              handleMenu(
                                                {
                                                  menuname: menuname,
                                                  key: menuItem?.param0name,
                                                  value:
                                                    menuItem?.param0dataname,
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
              </AccordionDetails>
            </Accordion>
          </div>}
          {LoginUserDetails !== null && (
            <div className="Menu_m_a_logout">
              <div className="btn" onClick={() => handleLogout()}>
                Logout{" "}
                <LoginIcon
                  sx={{
                    marginRight: "10px",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div >
    </Box >
  );

  return (
    <Drawer
      sx={{
        zIndex: 55555,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {DrawerList}
    </Drawer>
  );
}


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

const CheckingDiaSetModal = ({ open, link1, handleNoConfirm, handleClose, shape, handleRemoveData, index, flowType }) => {

  const handleYesConfirm = () => {
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem('isRing');
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem('ringFlowUrl')
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem("customizeStepsPendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("isPendant");
    sessionStorage.removeItem('PendantFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem("customizeStepsEarring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem("isPair");
    sessionStorage.removeItem('EarringFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    handleClose();
    const step = [{ step1: true, shape: "All" }]
    sessionStorage.setItem('customizeSteps', JSON.stringify(step));
    if (flowType !== "") {
      if (flowType === "ring") {
        sessionStorage.setItem('isRing', 'true')
      } else if (flowType === "pendant") {
        sessionStorage.setItem('isPendant', 'true')
      } else if (flowType === "earring") {
        sessionStorage.setItem('isPair', 'true')
      }
    }
    window.location.href = `${link1}${shape ? shape : ""}`;
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