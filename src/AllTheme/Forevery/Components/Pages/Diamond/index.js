import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DiamondPage.scss";
import { StepImages } from "../../data/NavbarMenu";
import { formatter, storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { forwardRef, useEffect, useRef, useState } from "react";
import noImageFound from '../../Assets/image-not-found.jpg';
import Pako from "pako";
import { useRecoilState, useRecoilValue } from "recoil";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { for_Loader, for_customizationSteps } from "../../Recoil/atom";
import { useMediaQuery } from "@mui/material";
import PairSvg from "../../Config/PairSvg";

const DiamondPage = () => {
  const Navigation = useNavigate();
  const { pathname } = useLocation();
  const breadCrumb = pathname?.split("/")[2];
  const [Swap, setswap] = useState("diamond");
  const [customizeStep, setCustomizeStep] = useRecoilState(for_customizationSteps);

  const StyleCondition = {
    fontSize: breadCrumb === "settings" && "14px",
    fontWeight: breadCrumb === "settings" && "700",
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  return (
    <>
      <div className="for_DiamondPage">
        <BannerForSettings breadCrumb={breadCrumb} />
        <div className="section_dia">
          <BreadCrumb breadCrumb={breadCrumb} />
          <DiamondNavigation
            StyleCondition={StyleCondition}
            Swap={Swap}
            setswap={setswap}
            customizeStep={customizeStep}
          />
        </div>
      </div>
    </>
  );
};

export default DiamondPage;
const BannerForSettings = ({ breadCrumb }) => {
  const location = useLocation();
  const getSettingName = location?.pathname.split('/')[3];

  return (
    <>
      {breadCrumb === "settings" && (
        <div className="setting_bg">
          {getSettingName.includes('Ring') ? (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Ring/ring.webp`}
              alt="Ring Setting"
            />
          ) : getSettingName.includes('Pendant') ? (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Pendant/pendant.webp`}
              alt="Pendant Setting"
            />
          ) : (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Earring/earring.webp`}
              alt="Earring Setting"
            />
          )}
        </div>
      )}
    </>
  );
};
const BreadCrumb = ({ breadCrumb }) => {
  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>{" "}
        </li>
        <li>/</li>
        <li>
          <Link to={breadCrumb}>{breadCrumb}</Link>
        </li>
        <li>/</li>
        <li> All</li>
      </ul>
    </div>
  );
};

const HandleDrp = forwardRef(({ index, open, handleOpen, data, getImagePath, totalPairPrice }, ref) => {
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const [metalColor, setMetalColor] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const Navigation = useNavigate();
  const location = useLocation();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [isRing, setIsRing] = useState(false);
  const getShape1 = JSON.parse(sessionStorage.getItem('customizeSteps'))
  const getShape2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'))
  const getShape3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'))
  const getShape4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'))
  const forTabletResp = useMediaQuery('(max-width:1000px)')
  const [getAllData, setAllData] = useState([]);

  const isEarring = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";

  useEffect(() => {
    setIsRing(location?.pathname.split('/')[3])
  }, [location?.pathname])

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeData);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData);

    const metalC = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    setMetalColor(metalC)
  }, []);


  const handleRemoveItem = (index) => {
    const storedData = JSON.parse(sessionStorage.getItem('custStepData'));
    const storedData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
    const storedData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
    const storedData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
    const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
    const storedSteps4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

    const shapename = storedSteps?.[0]?.shape ?? (storedSteps2?.[0]?.Setting === 'Ring' && storedSteps2?.[0]?.Status === 'active' ? storedSteps2?.[1]?.shape : storedSteps3?.[0]?.Setting === 'Pendant' && storedSteps3?.[0]?.Status === 'active' ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape);
    const ring = (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting) === 'Ring' ? true : false;
    const pendant = (storedSteps?.[0]?.Setting ?? storedSteps2?.[1]?.Setting ?? storedSteps3?.[1]?.Setting) === 'Pendant' ? true : false;;

    if (index === 0) {
      if (Array.isArray(storedData)) {
        if (storedSteps?.[1]?.Setting === "Ring") {
          let storedData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
          if (!Array.isArray(storedData2)) {
            storedData2 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 1;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData2.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));
            if (storedData2?.length > 0) {
              sessionStorage.removeItem("custStepData");
            }
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
          }
          else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Ring");
            sessionStorage.removeItem("setImage");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }
        if (storedSteps?.[1]?.Setting === "Pendant") {
          let storedData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
          if (!Array.isArray(storedData3)) {
            storedData3 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 2;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData3.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Pendant', JSON.stringify(storedData3));

            if (storedData3?.length > 0) {
              sessionStorage.removeItem("custStepData");
            }
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
          } else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Pendant");
            sessionStorage.removeItem("setPenImage");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }
        if (storedSteps?.[1]?.Setting === "Earring") {
          let storedData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
          if (!Array.isArray(storedData4)) {
            storedData4 = [];
          }

          if (storedData?.[1]) {
            storedData[1].id = 3;
          }

          if (storedData?.[1]?.step2Data) {
            storedData[1].step1Data = storedData[1].step2Data;
            delete storedData[1].step2Data;
          }

          if (storedData?.length > 0 && storedSteps?.[2]?.step3 === true) {
            // Insert modified storedData[1] at the 0 index of storedData2
            storedData4.unshift(storedData?.[1]);
            sessionStorage.setItem('custStepData2Earring', JSON.stringify(storedData4));

            if (storedData4?.length > 0) {
              sessionStorage.removeItem("custStepData");
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
            }
          } else {
            sessionStorage.removeItem("custStepData");
            sessionStorage.removeItem("custStepData2Earring");
            sessionStorage.removeItem("setEarImage");
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
          }
        }

        if (storedSteps?.[0]?.step1 === true) {
          sessionStorage.removeItem("custStepData");
          window.location.href = `/certified-loose-lab-grown-diamonds/diamond/`
        }
        handleOpen(null)
        // sessionStorage.setItem('custStepData', JSON.stringify(storedData));
      }

      if (Array.isArray(storedData2) && storedSteps2?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData2?.[1]?.step2Data) {
          storedData2[1].step1Data = storedData2[1].step2Data;
          delete storedData2[1].step2Data;
        }

        if (storedData2?.length > 0 && storedSteps2?.[2]?.step3 === true) {
          storedData.unshift(storedData2?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Ring");
            sessionStorage.removeItem("setImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Ring");
          sessionStorage.removeItem("setImage");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
          // Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }

        handleOpen(null)
      }
      if (Array.isArray(storedData3) && storedSteps3?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData3?.[1]?.step2Data) {
          storedData3[1].step1Data = storedData3[1].step2Data;
          delete storedData3[1].step2Data;
        }

        if (storedData3?.length > 0 && storedSteps3?.[2]?.step3 === true) {
          storedData.unshift(storedData3?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Pendant");
            sessionStorage.removeItem("setPenImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Pendant");
          sessionStorage.removeItem("setPenImage");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
          // Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : "Pendant")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ==")}`, { replace: true });
        }

        handleOpen(null)
      }
      if (Array.isArray(storedData4) && storedSteps4?.[0]?.Status === 'active') {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData4?.[1]?.step2Data) {
          storedData4[1].step1Data = storedData4[1].step2Data;
          delete storedData4[1].step2Data;
        }

        if (storedData4?.length > 0 && storedSteps4?.[2]?.step3 === true) {
          storedData.unshift(storedData4?.[1]);
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));
          if (storedData?.length > 0) {
            sessionStorage.removeItem("custStepData2Earring");
            sessionStorage.removeItem("setEarImage");
          }
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/diamond_shape=${storedSteps?.[0]?.shape ?? (storedSteps2?.[1]?.shape && storedSteps2?.[0]?.Status === "active" ? storedSteps2?.[1]?.shape : storedSteps3?.[1]?.shape && storedSteps3?.[0]?.Status === "active" ? storedSteps3?.[1]?.shape : storedSteps4?.[1]?.shape)}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
        }
        else {
          sessionStorage.removeItem("custStepData");
          sessionStorage.removeItem("custStepData2Earring");
          sessionStorage.removeItem("setEarImage");
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "Ring" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "Pendant" : "Earring")}/M=${storedSteps?.[1]?.Setting ?? (storedSteps2?.[0]?.Setting === "Ring" && storedSteps2?.[0]?.Status === "active" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps3?.[0]?.Setting === "Pendant" && storedSteps3?.[0]?.Status === "active" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")}`, { replace: true });
        }

        handleOpen(null)
      }
    }
    else {
      if (Array.isArray(storedData)) {
        if (storedData?.[1]?.step2Data?.id > 0) {
          storedData.pop();
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));

          sessionStorage.removeItem('setImage');
          Navigation(`/certified-loose-lab-grown-diamonds/settings/${storedSteps?.[1]?.Setting}/diamond_shape=${storedSteps?.[0]?.shape}/M=${(storedSteps?.[1]?.Setting === "Ring" ? "UmluZy9jYXRlZ29yeQ==" : storedSteps?.[1]?.Setting === "Pendant" ? "UGVuZGFudC9jYXRlZ29yeQ==" : "RWFycmluZy9jYXRlZ29yeQ==")} `, { replace: true });
        } else {
          console.warn("storedData is not a valid array or doesn't meet the condition.");
        }

        handleOpen(null);
      }

      if (Array.isArray(storedData2) && storedSteps2?.[0]?.Status === 'active') {
        if (storedData2?.[1]?.step2Data?.[0]?.stockno) {
          storedData2.pop();
          sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
      if (Array.isArray(storedData3) && storedSteps3?.[0]?.Status === 'active') {
        if (storedData3?.[1]?.step2Data?.[0]?.stockno) {
          storedData3.pop();
          sessionStorage.setItem('custStepData2Pendant', JSON.stringify(storedData3));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
      if (Array.isArray(storedData4) && storedSteps4?.[0]?.Status === 'active') {
        if (storedData4?.[1]?.step2Data?.[0]?.stockno) {
          storedData4.pop();
          sessionStorage.setItem('custStepData2Earring', JSON.stringify(storedData4));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
    }

    if (index === 0) {
      if (Array.isArray(storedSteps)) {
        if (storedData?.[0]?.step1Data?.[0]?.stockno) {
          handleOpen(null)
          if (storedSteps?.[1]?.Setting === "Ring") {
            let step1;
            let step2;
            let storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
            if (!Array.isArray(storedSteps2)) {
              storedSteps2 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Ring", id: 1, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 1 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps2.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
              if (storedSteps2?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Ring");
            }
          }

          if (storedSteps?.[1]?.Setting === "Pendant") {
            let step1;
            let step2;
            let storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
            if (!Array.isArray(storedSteps2)) {
              storedSteps2 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Pendant", id: 2, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 2 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps2.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps2));
              if (storedSteps2?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Pendant");
            }
          }

          if (storedSteps?.[1]?.Setting === "Earring") {
            let step1;
            let step2;
            let storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
            if (!Array.isArray(storedSteps3)) {
              storedSteps3 = [];
            }

            if (storedSteps?.[1]) {
              step1 = { step1: true, Setting: "Earring", id: 3, Status: "active" };
              step2 = { step2: true, shape: shapename, id: 3 };
            }

            if (storedSteps?.length > 0 && storedSteps?.[2]?.step3 === true) {
              storedSteps3.unshift(step1, step2);
              sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps3));
              if (storedSteps3?.length > 0) {
                sessionStorage.removeItem("customizeSteps");
              }
            }
            else {
              sessionStorage.removeItem("customizeSteps");
              sessionStorage.removeItem("customizeSteps2Earring");
            }
          }

          if (storedSteps?.[0]?.step1 === true) {
            sessionStorage.removeItem("customizeSteps");
          }
        }
      }

      if (Array.isArray(storedSteps2) && storedSteps2?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps2?.[1]) {
          step1 = { step1: true, shape: shapename, id: 1 };
          step2 = { step2: true, Setting: "Ring", id: 1 };
        }

        if (storedData2?.length > 0 && storedSteps2?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Ring");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Ring");
        }

      }
      if (Array.isArray(storedSteps3) && storedSteps3?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps3?.[1]) {
          step1 = { step1: true, shape: shapename, id: 2 };
          step2 = { step2: true, Setting: "Pendant", id: 2 };
        }

        // Optionally remove customizeSteps from sessionStorage

        if (storedData3?.length > 0 && storedSteps3?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Pendant");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Pendant");
        }
      }

      if (Array.isArray(storedSteps4) && storedSteps4?.[0]?.Status === 'active') {
        let step1;
        let step2;
        let storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
        if (!Array.isArray(storedSteps)) {
          storedSteps = [];
        }

        if (storedSteps4?.[1]) {
          step1 = { step1: true, shape: shapename, id: 3 };
          step2 = { step2: true, Setting: "Earring", id: 3 };
        }


        if (storedData4?.length > 0 && storedSteps4?.[2]?.step3 === true) {
          storedSteps.unshift(step1, step2);
          sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
          if (storedSteps?.length > 0) {
            sessionStorage.removeItem("customizeSteps2Earring");
          }
        }
        else {
          sessionStorage.removeItem("customizeSteps");
          sessionStorage.removeItem("customizeSteps2Earring");
        }
      }
    }
    else {
      if (Array.isArray(storedSteps)) {
        storedSteps.pop();
        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

        // Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);

        handleOpen(null);
      }

      if (Array.isArray(storedSteps2) && storedSteps2?.[0]?.Status === 'active') {
        storedSteps2.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
      if (Array.isArray(storedSteps3) && storedSteps3?.[0]?.Status === 'active') {
        storedSteps3.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps3));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
      if (Array.isArray(storedSteps4) && storedSteps4?.[0]?.Status === 'active') {
        storedSteps4.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(storedSteps4));
        // Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
    }
  };

  const handleInnerClick = (event) => {
    event.stopPropagation();
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

  const handleMoveToDet = (data) => {
    if ((data?.[0]?.stockno && data?.[1]?.stockno) || data?.stockno) {
      const obj = {
        a: isEarring ? [data?.[0]?.stockno, data?.[1]?.stockno] : data?.stockno,
        b: data?.shapename,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      let navigateUrl;
      if (isEarring) {
        navigateUrl = `/d/pair-diamonds/det345/?p=${encodeObj}`;
      } else {
        navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
      }
      handleOpen(null)
      if (isEarring) {
        Navigation(navigateUrl, { state: [{ isPair: true }, { stockno1: data?.[0]?.stockno }, { stockno2: data?.[1]?.stockno }] });
      } else {
        Navigation(navigateUrl);
      }
    }
    if ((data?.autocode ?? data?.step1Data?.autocode)) {
      let pValue = {
        menuname: (getShape1?.[1]?.Setting === 'Ring' || getShape2?.[0]?.Setting === 'Ring' || getShape3?.[0]?.Setting === 'Ring')
          ? 'Engagement Ring'
          : (getShape1?.[1]?.Setting === 'Pendant' || getShape2?.[0]?.Setting === 'Pendant' || getShape3?.[0]?.Setting === 'Pendant')
            ? 'Diamond Pendants'
            : 'Diamond Earrings'
      };
      let obj = {
        a: (data?.autocode ?? data?.step1Data?.autocode),
        b: (data?.designno ?? data?.step1Data?.designno),
        m: (data?.MetalPurityid ?? data?.selectedMetalId),
        d: (loginUserDetail?.cmboDiaQCid ?? data?.selectedDiaId),
        c: (loginUserDetail?.cmboCSQCid ?? data?.selectedCsId),
        mc: (data?.MetalColorid ?? data?.step1Data?.MetalColorid),
        p: pValue,
        f: {},
      };
      let encodeObj = compressAndEncode(JSON.stringify(obj));

      handleOpen(null)
      Navigation(
        `/d/${(data?.TitleLine ?? data?.step1Data?.TitleLine).replace(/\s+/g, `_`)}${(data?.TitleLine ?? data?.step1Data?.TitleLine)?.length > 0 ? "_" : ""
        }${(data?.designno ?? data?.step1Data?.designno)}/${pValue.menuname.split(' ').join('_')}/?p=${encodeObj}`
      );
    }
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
    });
  };

  let getDesignImageFol = storeInit?.CDNDesignImageFol;

  const getDynamicImages = async (imageData, designno, MetalColorid, extension) => {
    const matchMetalColorid = metalColor.find((color) => color?.id === MetalColorid);
    const baseImagePath = `${getDesignImageFol}${designno}~${1}`;
    const colorImage = imageData?.ImageCount > 0 ? `${baseImagePath}~${matchMetalColorid?.colorcode}.${extension}` : noImageFound;
    const defaultImage = imageData?.ImageCount > 0 ? `${baseImagePath}.${extension}` : noImageFound;

    try {
      await Promise.all([
        loadImage(colorImage),
        loadImage(defaultImage),
      ]);
      return colorImage; // return the color image if it loads successfully
    } catch {
      return defaultImage; // fallback to default if color fails
    }
  };

  useEffect(() => {
    const ringData = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
    const pendantData = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));

    const getAlldata = JSON?.parse(sessionStorage.getItem('custStepData')) ?? (ringData ?? pendantData);
    setAllData(getAlldata);
  }, [location?.key])



  useEffect(() => {
    const loadImages = async () => {
      let loadedImages;
      const currentData = data;

      const designno = currentData?.designno;
      const MetalColorid = currentData?.MetalColorid;
      const ImageExtension = currentData?.ImageExtension;

      const colorImage = await getDynamicImages(currentData, designno, MetalColorid, ImageExtension);

      loadedImages = { colorImage };
      setImageMap(loadedImages);
    };

    loadImages();
  }, [getAllData, location?.key]);

  return (
    <div
      className="for_dia_step_eye_div"
      onClick={() => handleOpen(null)}
      style={{ cursor: 'pointer' }}
      ref={ref}
    >
      <img
        className="for_dia_step_eye"
        src={forTabletResp ? StepImages[0]?.downIcon : StepImages[0]?.eyeIcon}
        alt=""
        style={{ cursor: 'pointer' }}
      />
      <div
        className="for_navigate_eye_div"
        style={{
          height: open ? "65px" : "0px",
          overflow: open ? "unset" : "hidden",
          cursor: 'default'
        }}
      >
        <div
          className="for_dia_data_div"
          onClick={handleInnerClick}
          style={{ cursor: 'default' }}
        >
          {isEarring ? (
            <>
              {data?.stockno && (
                <div>
                  <PairSvg />
                  <PairSvg />
                </div>
              )}
              {!data?.stockno && (
                <div className="for_dia_data_image">
                  <img
                    src={(getImagePath?.colorImage ?? imageMap?.colorImage)}
                    // src={data?.stockno ? data?.image_file_url : (!imageMap?.colorImage?.includes('/static') ? imageMap?.colorImage : getImagePath?.colorImage)}
                    alt=""
                    style={{ cursor: 'default' }}
                    onError={(e) => e.target.src = noImageFound}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="for_dia_data_image">
              <img
                src={data?.stockno ? data?.image_file_url : (getImagePath?.colorImage ?? imageMap?.colorImage)}
                // src={data?.stockno ? data?.image_file_url : (!imageMap?.colorImage?.includes('/static') ? imageMap?.colorImage : getImagePath?.colorImage)}
                alt=""
                style={{ cursor: 'default' }}
                onError={(e) => e.target.src = noImageFound}
              />
            </div>
          )}
          <div className="for_dia_price">
            {isEarring ? (
              <>
                {(getShape1?.[1]?.Setting === "Earring" && index === 0) ? (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(totalPairPrice)}</span>
                ) : (getShape4?.[0]?.Status === "active" && index === 1) ? (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(totalPairPrice)}</span>
                ) : (
                  <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUpIncTax ?? data?.step1Data?.UnitCostWithMarkUpIncTax))}</span>
                )}
              </>
            ) : (
              <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUpIncTax ?? data?.step1Data?.UnitCostWithMarkUpIncTax))}</span>
            )}

          </div>
          <div className="for_view_rem_div">
            <span onClick={(e) => { e.stopPropagation(); handleMoveToDet(data) }} className="for_view">View | </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(index)
              }}
              className="for_rem"
            >
              &nbsp;Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});


const DiamondNavigation = ({ Swap, StyleCondition, setswap, customizeStep }) => {
  const dropdownRefs = useRef({});
  const [open, setOpen] = useState(null);
  const isLoading = useRecoilValue(for_Loader);
  const [image, setImage] = useState();
  const [isSetting, setIsSetting] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const Navigation = useNavigate();
  const location = useLocation();
  const getStepName = location?.pathname.split('/');
  const getCustStepData = JSON?.parse(sessionStorage?.getItem('customizeSteps'));
  const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCustStepData3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const getCustStepData4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));
  const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
  const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
  const getdiaData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
  const getdiaData4 = JSON.parse(sessionStorage.getItem('custStepData2Earring'));
  const setting = getStepName.includes('Ring') || getStepName.includes('Pendant') || getStepName.includes('Earring');
  const [setshape, setSetShape] = useState();
  const [settingSteps, setSettingSteps] = useState();
  const getSettingName = location?.pathname?.split("/")[3];
  const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCompleteStep3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const getCompleteStep4 = JSON.parse(sessionStorage.getItem('customizeSteps2Earring'));

  const isRing = JSON?.parse(sessionStorage.getItem('isRing')) ?? "";
  const isPendant = JSON?.parse(sessionStorage.getItem('isPendant')) ?? "";
  const isEarring = JSON?.parse(sessionStorage.getItem('isPair')) ?? "";

  useEffect(() => {
    const getImagePath = settingSteps?.[0]?.Setting === "Ring" && settingSteps?.[0]?.Status === "active" ? JSON.parse(sessionStorage?.getItem("setImage")) : settingSteps?.[0]?.Setting === "Pendant" && settingSteps?.[0]?.Status === "active" ? JSON.parse(sessionStorage?.getItem("setPenImage")) : JSON.parse(sessionStorage?.getItem("setEarImage"));
    setImage(getImagePath);
  }, [settingSteps])

  useEffect(() => {
    const handleCompset = () => {
      const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? (getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2 :
        getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3 : getCompleteStep4);
      setSetShape(getSetShape);
    }
    handleCompset();
  }, [])


  useEffect(() => {
    if (getCompleteStep2?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep2)
    }
    if (getCompleteStep3?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep3);
    }
    if (getCompleteStep4?.[0]?.Status === 'active') {
      setSettingSteps(getCompleteStep4);
    }
  }, [location?.key])


  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeData);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of any dropdown
      if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
        setOpen(null); // Close all dropdowns
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const renderSteps = () => {
    return (
      <>
        <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
            onClick={() => {
              if (getCompleteStep2?.[2]?.step3 ?? getCompleteStep3?.[2]?.step3 ?? getCompleteStep4?.[2]?.step3) {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)

              } else if (getCompleteStep2?.[0]?.step1 ?? getCompleteStep3?.[0]?.step1 ?? getCompleteStep4?.[0]?.step1) {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
              }
              setswap("settings");
            }}
          >
            <img
              className={
                getCustStepData?.[1]?.Setting === 'Pendant' || (getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')
                  ? 'for_pendant_view'
                  : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active')
                    ? 'for_shapes_img'
                    : 'for_earring_shape'
              }
              src={
                getCustStepData?.[1]?.Setting === 'Pendant' || (getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')
                  ? StepImages[1]?.img1
                  : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active')
                    ? StepImages[1]?.img
                    : StepImages[1]?.img2
              }
              alt=""
            />  Settings

          </span>
          {(getdiaData2?.[0]?.step1Data && getCustStepData2?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData2?.[0]?.step1Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={image}
            />
          )}
          {(getdiaData3?.[0]?.step1Data && getCustStepData3?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData3?.[0]?.step1Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={image}
            />
          )}
          {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData4?.[0]?.step1Data}
              totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
              ref={(el) => { dropdownRefs.current[0] = el; }}
              getImagePath={image}
            />
          )}
        </div>

        <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
            if (getCompleteStep2?.[2]?.step3 === true ?? getCompleteStep3?.[2]?.step3 === true ?? getCompleteStep4?.[0]?.step1 === true) {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
            } else {
              if ((getCompleteStep2?.[0]?.step1 === true ?? getCompleteStep3?.[0]?.step1 === true ?? getCompleteStep4?.[0]?.step1 === true) && ((getdiaData2 === null || getdiaData2 === undefined) ?? (getdiaData3 === null || getdiaData3 === undefined) ?? (getdiaData4 === null || getdiaData4 === undefined))) {
                sessionStorage.removeItem('customizeSteps2Ring');
                sessionStorage.removeItem('customizeSteps2Pendant');
                sessionStorage.removeItem('customizeSteps2Earring');
                Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
              } else {
                Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                setswap("diamond");
              }
            }
          }}>
            <img className="for_shapes_img" src={getCompleteStep4?.[0]?.Status === 'active' ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
          </span>
          {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData4?.[1]?.step2Data?.[0] ?? getdiaData4?.[0]?.step2Data?.[0]}
              totalPairPrice={getdiaData4?.[1]?.totalPrice ?? getdiaData4?.[0]?.totalPrice}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
          {getdiaData?.[0]?.step1Data?.[0] && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData?.[0]?.step1Data?.[0]}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData?.[1]?.step2Data || getdiaData4?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
          <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url || getCompleteStep4?.[2]?.url)}`); setswap("finish"); }}>
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : (getCustStepData2?.[0]?.Setting === 'Ring' || getCustStepData3?.[0]?.Setting === 'Ring' || getCustStepData?.[1]?.Setting === 'Ring') ? 'for_shapes_img' : 'for_earring_shape'} src={
              ((((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img1 : (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active') ? StepImages[1]?.img : StepImages[1]?.img3)))
            } alt="" /> {((getCompleteStep2?.[0]?.Setting === 'Pendant' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Pendant' : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || getCompleteStep3?.[0]?.Setting === 'Ring' && getCompleteStep3?.[0]?.Status === 'active')) ? 'Ring' : 'Earring'}
          </span>
          {(getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : "")) && (
            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
              getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : ""))}</span>
          )}
        </div>
      </>
    );
  };


  return (
    <>
      {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? (getCustStepData2?.[1]?.step2 === true ?? getCustStepData3?.[1]?.step2 === true ?? getCustStepData4?.[1]?.step2 === true)) ? (
        <div className="diamond_Step_data">
          <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`);
              setswap("diamond");
            }}>
              <img className="for_shapes_img" src={(getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? StepImages[0]?.img1 : StepImages[0]?.img} alt="" /> Diamond
            </span>
            {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && getCustStepData2?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData2?.[1]?.step2Data?.[0] ?? getdiaData2?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {((getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data) && getCustStepData3?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData3?.[1]?.step2Data?.[0] ?? getdiaData3?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {((getdiaData4?.[1]?.step2Data ?? getdiaData4?.[0]?.step2Data) && getCustStepData4?.[0]?.Status === "active") && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData4?.[1]?.step2Data?.[0] ?? getdiaData4?.[0]?.step2Data?.[0]}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {getdiaData?.[0]?.step1Data?.[0] && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${(setting === true && getdiaData?.[0]?.step1Data?.length !== 0) ? 'active' : ''} d-2`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
              onClick={() => {
                if (getCompleteStep1?.[1]?.step2 === true) {
                  Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : (setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Pendant' ? 'M=UGVuZGFudC9jYXRlZ29yeQ==' : 'M=RWFycmluZy9jYXRlZ29yeQ==')}`)
                  setswap("settings");
                } else {
                  if (getCompleteStep1?.[0]?.step1 === true && (getdiaData === null || getdiaData === undefined)) {
                    sessionStorage.removeItem('customizeSteps');
                    // Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                  } else {
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                  }
                }
              }}
            >
              <img
                className={
                  getCustStepData?.[1]?.Setting === 'Pendant' || ((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') || isPendant === true)
                    ? 'for_pendant_view'
                    : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active') || isRing === true)
                      ? 'for_shapes_img'
                      : ((getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active') || isEarring === true)
                        ? 'for_earring_shape'
                        : 'for_shapes_img'
                }
                src={
                  getCustStepData?.[1]?.Setting === 'Pendant' || ((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active') || isPendant === true)
                    ? StepImages[1]?.img1
                    : ((getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active') || isRing === true)
                      ? StepImages[1]?.img
                      : ((getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active') || isEarring === true)
                        ? StepImages[1]?.img2
                        : StepImages[1]?.img
                }
                alt=""
              />  Settings
            </span>
            {((getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? (getdiaData2?.[0]?.step1Data && getCustStepData2?.[0]?.Status === "active")) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) ?? getdiaData2?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={image}
              />
            )}
            {(getdiaData3?.[0]?.step1Data && getCustStepData3?.[0]?.Status === "active") && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData3?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={image}
              />
            )}
            {(getdiaData4?.[0]?.step1Data && getCustStepData4?.[0]?.Status === "active") && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData4?.[0]}
                totalPairPrice={getdiaData?.[1]?.totalPrice ?? getdiaData?.[0]?.totalPrice}
                ref={(el) => { dropdownRefs.current[0] = el; }}
                getImagePath={image}
              />
            )}
          </div>

          <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData4?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
            <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url || getCompleteStep4?.[2]?.url)}`); setswap("finish"); }}>

              <img className={
                ((getCustStepData3?.[0]?.Setting === 'Pendant' || isPendant === true)) ? 'for_pendant_view' : ((getCustStepData2?.[0]?.Setting === 'Ring' || isRing === true)) ? 'for_shapes_img' : ((getCustStepData4?.[0]?.Setting === 'Earring' || isEarring === true)) ? 'for_earring_shape' : 'for_shapes_img'}
                src={
                  (((((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active' || isPendant === true)) ? StepImages[1]?.img1 :
                    (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || isRing === true) ? StepImages[1]?.img :
                      (getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? StepImages[1]?.img3 : StepImages[1]?.img)))
                } alt="" />
              {((getCompleteStep3?.[0]?.Setting === 'Pendant' && getCompleteStep3?.[0]?.Status === 'active' || isPendant === true)) ? 'Pendant' :
                (getCompleteStep2?.[0]?.Setting === 'Ring' && getCompleteStep2?.[0]?.Status === 'active' || isRing === true) ? 'Ring' :
                  (getCompleteStep4?.[0]?.Setting === 'Earring' && getCompleteStep4?.[0]?.Status === 'active' || isEarring === true) ? 'Earring' : 'Ring'}
            </span>

            {(getCompleteStep1?.[2]?.price || (getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active" ? getCompleteStep3?.[2]?.price : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active" ? getCompleteStep4?.[2]?.price : "")) && (
              <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(
                getCompleteStep1?.[2]?.price ||
                ((getCompleteStep2?.[2]?.price && getCompleteStep2?.[0]?.Status === "active" ? getCompleteStep2?.[2]?.price
                  : getCompleteStep3?.[2]?.price && getCompleteStep3?.[0]?.Status === "active"
                    ? getCompleteStep3?.[2]?.price
                    : getCompleteStep4?.[2]?.price && getCompleteStep4?.[0]?.Status === "active"
                      ? getCompleteStep4?.[2]?.price : "")))}</span>
            )}
          </div>
        </div>
      ) : (
        <>
          {!getStepName.includes('diamond_shape') ? (
            <div className="diamond_Step_data">
              {renderSteps()}
            </div>
          ) : (
            <>
              <div className="diamond_Step">
                {Swap === "diamond" ? (
                  <div
                    className="step d-1"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
                      setswap("diamond");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className="for_shapes_img" src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                  </div>
                ) : (
                  <div
                    className="step d-2"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                      setswap("settings");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className="for_shapes_img" src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                  </div>
                )}
                {Swap !== "diamond" ? (
                  <div
                    className="step d-1"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/`);
                      setswap("diamond");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className="for_shapes_img" src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                  </div>
                ) : (
                  <div
                    className="step d-2"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                      setswap("settings");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img className="for_shapes_img" src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                  </div>
                )}
                <div className="step finish_set d-3">
                  <span style={StyleCondition}>
                    <img className="for_shapes_img" src={StepImages[2]?.img} alt="" /> Rings
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
