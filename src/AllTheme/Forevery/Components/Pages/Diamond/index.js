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
              alt=""
            />
          ) : (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Pendant/pendant.webp`}
              alt=""
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

const HandleDrp = forwardRef(({ index, open, handleOpen, data }, ref) => {
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
  const forTabletResp = useMediaQuery('(max-width:1000px)')
  const [getAllData, setAllData] = useState([]);

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
    const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const storedSteps2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
    const storedSteps3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));

    const shapename = storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape;
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

          // Insert modified storedData[1] at the 0 index of storedData2
          storedData2.unshift(storedData?.[1]);

          // Update sessionStorage with the modified storedData2
          sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));

          if (storedData2?.length > 0) {
            sessionStorage.removeItem("custStepData");
          }

        }
        if (storedSteps?.[1]?.Setting === "Pendant") {
          // Add your logic for "Pendant" here if needed
        }
        handleOpen(null)
        // sessionStorage.setItem('custStepData', JSON.stringify(storedData));
        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }

      if (Array.isArray(storedData2)) {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData2?.[1]?.step2Data) {
          storedData2[1].step1Data = storedData2[1].step2Data;
          delete storedData2[1].step2Data;
        }

        storedData.unshift(storedData2?.[1]);

        sessionStorage.setItem('custStepData', JSON.stringify(storedData));

        if (storedData?.length > 0) {
          sessionStorage.removeItem("custStepData2Ring");
        }

        handleOpen(null)
        Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);
      }
      if (Array.isArray(storedData3)) {
        let storedData = JSON.parse(sessionStorage.getItem('custStepData'));
        if (!Array.isArray(storedData)) {
          storedData = [];
        }

        if (storedData3?.[1]?.step2Data) {
          storedData3[1].step1Data = storedData3[1].step2Data;
          delete storedData3[1].step2Data;
        }

        storedData.unshift(storedData3?.[1]);

        sessionStorage.setItem('custStepData', JSON.stringify(storedData));

        if (storedData?.length > 0) {
          sessionStorage.removeItem("custStepData2Pendant");
        }

        handleOpen(null)
        Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);
      }
    }
    else {
      if (Array.isArray(storedData)) {

        if (storedData?.[1]?.step2Data?.id > 0) {
          storedData.pop();
          sessionStorage.setItem('custStepData', JSON.stringify(storedData));

          Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);
        } else {
          console.warn("storedData is not a valid array or doesn't meet the condition.");
        }

        handleOpen(null);
      }

      if (Array.isArray(storedData2)) {
        if (storedData2?.[1]?.step2Data?.[0]?.stockno) {
          storedData2.pop();
          sessionStorage.setItem('custStepData2Ring', JSON.stringify(storedData2));
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        } else {
          console.warn("storedData2 is not a valid array or doesn't meet the condition.");
        }
        handleOpen(null)
      }
      if (Array.isArray(storedData3)) {
        if (storedData3?.[1]?.step2Data?.[0]?.stockno) {
          storedData3.pop();
          sessionStorage.setItem('custStepData2Pendant', JSON.stringify(storedData3));
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
              step1 = { step1: true, Setting: "Ring", id: 1 };
              step2 = { step2: true, shape: shapename, id: 1 };
            }

            storedSteps2.unshift(step1, step2);
            // Update sessionStorage with the modified storedSteps2
            sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));

            // Optionally remove customizeSteps from sessionStorage
            if (storedSteps2?.length > 0) {
              sessionStorage.removeItem("customizeSteps");
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
              step1 = { step1: true, Setting: "Pendant", id: 2 };
              step2 = { step2: true, shape: shapename, id: 2 };
            }

            storedSteps2.unshift(step1, step2);
            // Update sessionStorage with the modified storedSteps2
            sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps2));

            // Optionally remove customizeSteps from sessionStorage
            if (storedSteps2?.length > 0) {
              sessionStorage.removeItem("customizeSteps");
            }
          }
          Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
        }
      }

      if (Array.isArray(storedSteps2)) {
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

        storedSteps.unshift(step1, step2);
        // Update sessionStorage with the modified storedSteps
        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

        // Optionally remove customizeSteps from sessionStorage
        if (storedSteps?.length > 0) {
          sessionStorage.removeItem("customizeSteps2Ring");
        }

      }
      if (Array.isArray(storedSteps3)) {
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

        storedSteps.unshift(step1, step2);
        // Update sessionStorage with the modified storedSteps
        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

        // Optionally remove customizeSteps from sessionStorage
        if (storedSteps?.length > 0) {
          sessionStorage.removeItem("customizeSteps2Pendant");
        }
      }
    }
    else {
      if (Array.isArray(storedSteps)) {
        storedSteps.pop();
        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));

        Navigation(`/certified-loose-lab-grown-diamonds/settings/${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "Ring" : "Pendant"}/diamond_shape=${(storedSteps?.[0]?.shape ?? storedSteps2?.[1]?.shape ?? storedSteps3?.[1]?.shape)}/M=${(data?.id === 1 || (storedSteps?.[1]?.Setting ?? storedSteps2?.[0]?.Setting ?? storedSteps3?.[0]?.Setting)) ? "UmluZy9jYXRlZ29yeQ==" : "UGVuZGFudC9jYXRlZ29yeQ=="}`);

        handleOpen(null);
      }

      if (Array.isArray(storedSteps2)) {
        storedSteps2.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(storedSteps2));
        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
      }
      if (Array.isArray(storedSteps3)) {
        storedSteps3.pop();
        handleOpen(null)
        sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(storedSteps3));
        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${shapename}`);
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
    if (data?.stockno) {
      const obj = {
        a: data?.stockno,
        b: data?.shapename,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      let navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
      handleOpen(null)
      Navigation(navigateUrl);
    }
    if ((data?.autocode ?? data?.step1Data?.autocode)) {
      let pValue = getShape1?.[1]?.Setting === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' } || (getShape2?.[0]?.Setting ?? getShape3?.[0]?.Setting) === 'Ring' ? { menuname: 'Engagement Ring' } : { menuname: 'Diamond Pendants' }
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
  }, [getAllData]);


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
          <div className="for_dia_data_image">
            <img
              src={data?.stockno ? data?.image_file_url : imageMap?.colorImage}
              alt=""
              style={{ cursor: 'default' }}
              onError={(e) => e.target.src = noImageFound}
            />
          </div>
          <div className="for_dia_price">
            <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price ?? (data?.UnitCostWithMarkUp ?? data?.step1Data?.UnitCostWithMarkUp))}</span>
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
  const [isSetting, setIsSetting] = useState([]);
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const Navigation = useNavigate();
  const location = useLocation();
  const getStepName = location?.pathname.split('/');
  const getCustStepData = JSON?.parse(sessionStorage?.getItem('customizeSteps'));
  const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCustStepData3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
  const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
  const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2Ring'));
  const getdiaData3 = JSON.parse(sessionStorage.getItem('custStepData2Pendant'));
  const setting = getStepName.includes('Ring') || getStepName.includes('Pendant');
  const [setshape, setSetShape] = useState();

  useEffect(() => {
    const handleCompset = () => {
      const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? JSON.parse(sessionStorage.getItem('customizeSteps2Ring')) ?? JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));
      setSetShape(getSetShape);
    }
    handleCompset();
  }, [])

  const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2Ring'));
  const getCompleteStep3 = JSON.parse(sessionStorage.getItem('customizeSteps2Pendant'));

  // useEffect(() => {
  //   setIsSetting(location?.pathname.split('/'));
  // }, [location?.pathname]);

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
              if (getCompleteStep2?.[0]?.step1 ?? getCompleteStep3?.[0]?.step1) {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
              } else {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
              }
              setswap("settings");
            }}
          >
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={
              ((getCustStepData2?.[0]?.Setting ?? getCustStepData3?.[0]?.Setting) === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
              StepImages[1]?.img
            } alt="" /> Settings
          </span>
          {(getdiaData2?.[0]?.step1Data ?? getdiaData3?.[0]?.step1Data) && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={(getdiaData2?.[0] ?? getdiaData3?.[0])}
              ref={(el) => { dropdownRefs.current[0] = el; }}
            />
          )}
          {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
              ref={(el) => { dropdownRefs.current[0] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
          <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
            if ((getCompleteStep2?.[1]?.step2 === true ?? getCompleteStep3?.[1]?.step2 === true) ?? getCompleteStep3?.[1]?.step2 === true) {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
            } else {
              if ((getCompleteStep2?.[0]?.step1 === true ?? getCompleteStep3?.[0]?.step1 === true) && ((getdiaData2 === null || getdiaData2 === undefined) ?? (getdiaData3 === null || getdiaData3 === undefined))) {
                sessionStorage.removeItem('customizeSteps2Ring');
                sessionStorage.removeItem('customizeSteps2Pendant');
                Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
              } else {
                Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                setswap("diamond");
              }
            }
          }}>
            <img className="for_shapes_img" src={StepImages[0]?.img} alt="" /> Diamond
          </span>
          {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) ?? (getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data)) && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) ?? (getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data)}
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

        <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
          <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep3?.[2]?.url)}`); setswap("finish"); }}>
            <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
              StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
          </span>
          {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true || getCompleteStep3?.[2]?.step3 == true) && (
            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price || getCompleteStep3?.[2]?.price))}</span>
          )}
        </div>
      </>
    );
  };


  return (
    <>
      {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? (getCustStepData2?.[1]?.step2 === true ?? getCustStepData3?.[1]?.step2 === true)) ? (
        <div className="diamond_Step_data">
          <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition} onClick={() => {
              console.log('Current Shape:', setshape);
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`);
              setswap("diamond");
            }}>
              <img className="for_shapes_img" src={StepImages[0]?.img} alt="" /> Diamond
            </span>
            {getdiaData?.[0]?.step1Data?.[0] && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
              />
            )}
            {((getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) ?? (getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data)) && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) ?? (getdiaData3?.[1]?.step2Data ?? getdiaData3?.[0]?.step2Data)}
                ref={(el) => { dropdownRefs.current[0] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${(setting === true && getdiaData?.[0]?.step1Data?.length !== 0) ? 'active' : ''} d-2`}>
            <span className={`for_title_span ${isLoading ? 'disabled' : ''}`} style={StyleCondition}
              onClick={() => {
                if (getCompleteStep1?.[1]?.step2 === true) {
                  Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                  setswap("settings");
                } else {
                  if (getCompleteStep1?.[0]?.step1 === true && (getdiaData === null || getdiaData === undefined)) {
                    sessionStorage.removeItem('customizeSteps');
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                  } else {
                    Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                  }
                }
              }}
            >
              <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={(getCustStepData?.[1]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                StepImages[2]?.img} alt="" /> Settings
            </span>
            {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
            {(getdiaData2?.[0]?.step1Data ?? getdiaData3?.[0]?.step1Data) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={(getdiaData2?.[0] ?? getdiaData3?.[0])}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData3?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
            <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det345/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
              <img className={(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'for_pendant_view' : 'for_shapes_img'} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData3?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
            </span>
            {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true || getCompleteStep3?.[2]?.step3 == true) && (
              <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price || getCompleteStep3?.[2]?.price))}</span>
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
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
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
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
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
