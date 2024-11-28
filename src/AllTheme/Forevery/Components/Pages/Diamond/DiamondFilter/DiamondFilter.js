import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
  useReducer,
} from "react";
import "./DiamondFilter.scss";
import { DiamondLists } from "../../../data/NavbarMenu";
import { FaChevronDown } from "react-icons/fa";
import { CgArrowDownO, CgArrowUpO } from "react-icons/cg";
import { GiDiamondRing } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import {
  formatter,
  storImagePath,
} from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ScrollTop from "../../ReusableComponent/ScrollTop/ScrollTop";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import Faq from "../../ReusableComponent/Faq/Faq";
import {
  AdvancesfiltersOption,
  sortingOptions,
  faqList,
} from "../../../data/dummydata";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Pagination,
  Slider,
  useMediaQuery,
  Drawer,
  Box,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { json, useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import btnstyle from "../../../scss/Button.module.scss";
import { DiamondListData } from "../../../../../../utils/API/DiamondStore/DiamondList";
import pako from "pako";
import WebLoder from "../../WebLoder/WebLoder";
import { DiamondFilterData } from "../../../../../../utils/API/DiamondStore/DiamondFilter";
import { SvgImg } from "../../../data/Dummy";
import DiamondPage from "..";
import debounce from "lodash.debounce";
import { UseLabelGap } from "../../../hooks/UseLabelGap";
import { for_Loader, for_customizationSteps } from "../../../Recoil/atom";
import { useRecoilState } from "recoil";

const ACTIONS = {
  SET_FILTER_DATA: "SET_FILTER_DATA",
  SET_DIAMOND_LIST: "SET_DIAMOND_LIST",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Reducer function to manage state
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FILTER_DATA:
      return { ...state, filterData: action.payload };
    case ACTIONS.SET_DIAMOND_LIST:
      return { ...state, diamondList: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  filterData: null,
  diamondList: null,
  loading: true,
  error: null,
};

const RoundImage = `${storImagePath()}/Forevery/advance_filter_icon.webp`;
const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;
const fallbackImg = `${storImagePath()}/Forevery/diamondFilter/fallback_diamond.png`;

const DiamondFilter = () => {
  const location = useLocation();
  const [isloding, setIsLoading] = useRecoilState(for_Loader);
  const [diamondData, setDiamondData] = useState();
  const [diamondFilterData, setDiamondFilterData] = useState();
  const [diaCount, setDiaCount] = useState(0);
  const dropdownRefs = useRef({});
  const Navigate = useNavigate();
  const [checkedItem, setCheckedItem] = useState(null);
  const [showMorefilter, setshowMorefilter] = useState(false);
  const [show, setshow] = useState(false);
  const [ShowMedia, setShowMedia] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const videoRefs = useRef([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(null);
  const [storeInitData, setStoreInitData] = useState();
  const [sortValue, setSortValue] = useState("");
  const [selectedsort, setselectedsort] = useState({
    title: "Price",
    sort: "Low to High",
  });
  const [sliderState, setSliderState] = useState({
    price: [],
    Carat: [],
    Color: [],
    Clarity: [],
    Cut: [],
  });

  const [sliderState1, setSliderState1] = useState({
    price: [],
    Carat: [],
    Color: [],
    Clarity: [],
    Cut: [],
  });
  const [sliderLabels1, setSliderLabels1] = useState([]);
  const [filtersData1, setFiltersData1] = useState({
    polish: [],
    symmetry: [],
    lab: [],
    depth: [],
    table: [],
    fluorescence: [],
    culet: [],
  });

  const [filters, setFilters] = useState({});
  const [filtersData, setFiltersData] = useState({
    polish: [],
    symmetry: [],
    lab: [],
    depth: [],
    table: [],
    fluorescence: [],
    culet: [],
  });
  const isTabletView = useMediaQuery("(max-width: 358px)");

  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));
  const stepsData = JSON.parse(sessionStorage.getItem("custStepData"));
  const stepsData2 = JSON.parse(sessionStorage.getItem("custStepData2"));

  const [ApiData, setApiData] = useState([]);
  const [FilterApiOptions, setFilterApiOptions] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFilterDataFetched, setIsFilterDataFetched] = useState(false);
  const [finalArray, setFinalArray] = useState({
    Price: "" || [],
    Color: [],
    Clarity: [],
    Cut: [],
    Carat: [],
    polish: [],
    symmetry: [],
    lab: [],
    depth: [],
    table: [],
    fluorescence: [],
    Culet: [],
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [AccordianChecked, setAccordianChecked] = useState(false);
  const [sliderLabels, setSliderLabels] = useState([]);
  const maxwidth464px = useMediaQuery("(max-width:464px)");
  const [currentPage, setCurrentPage] = useState(1);

  const loginInfo = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
  useEffect(() => {
    const storeinitData = JSON?.parse(sessionStorage.getItem("storeInit"));
    setStoreInitData(storeinitData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        Object.values(dropdownRefs.current).every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location?.pathname) {
      setCheckedItem(location?.pathname?.split("/")[3]);
      if (steps?.[0]?.step1 == true && steps?.[0]?.shape !== null) {
        updateSteps(checkedItem);
      }
    }
  }, [location?.pathname]);

  const getShapeFromURL = () => {
    const getShape = location?.pathname?.split("/")[3];
    const getPath = location?.pathname?.split("/")?.slice(1, 3);
    const mergePath = getPath.join("/");
    if (mergePath == "certified-loose-lab-grown-diamonds/diamond") {
      if (
        stepsData === null &&
        stepsData2 === null &&
        (steps?.[0]?.step1 == true || steps?.[0]?.step1 != true)
      ) {
        if (getShape) {
          setCustomizeStep({
            step1: true,
            step2: false,
            step3: false,
          });

          const step1 = [{ step1: true, shape: getShape ?? "" }];
          sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
        }
      } else if (
        stepsData != null &&
        (steps?.[0]?.step1 == true || steps?.[0]?.step1 != true)
      ) {
        if (getShape) {
          const updatedStep1 = steps?.map((step) => {
            if (step.step1 !== undefined) {
              return { step1: true, shape: getShape };
            }
            return step;
          });

          if (!updatedStep1?.some((step) => step.step1 !== undefined)) {
            updatedStep1?.push({ step1: true, shape: getShape });
          }
          sessionStorage.setItem(
            "customizeSteps",
            JSON.stringify(updatedStep1)
          );
        }
      }
    }
  };

  useEffect(() => {
    getShapeFromURL();
  }, [location?.pathname]);

  const updateSteps = (shape) => {
    const updatedStep1 = steps?.map((step) => {
      if (step.step1 !== undefined) {
        return { step1: true, shape: shape };
      }
      return step;
    });

    if (!updatedStep1?.some((step) => step.step1 !== undefined)) {
      updatedStep1?.push({ step1: true, shape: shape });
    }
    sessionStorage?.setItem("customizeSteps", JSON?.stringify(updatedStep1));
  };

  const handleOpen = (title) => {
    setOpen((prevOpen) => (prevOpen === title ? null : title));
  };

  const handleCheckboxChange = (name) => {
    const shape = location?.pathname?.split("/")[3];
    if (name) {
      const newPath = location?.pathname.replace(shape, name);
      Navigate(newPath);
    }

    setCheckedItem((prevCheckedItem) =>
      prevCheckedItem === name ? null : name
    );
  };

  const HandleMedia = (type, index) => {
    setShowMedia((prev) => ({ ...prev, [index]: type }));
  };

  const handleMouseMove = async (e, i) => {
    const videoElement = e.target;
    setHoveredCard(i);
    try {
      await videoElement.play();
      videoElement?.Muted();
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  const handleMouseLeave = async (e, i) => {
    const videoElement = e.target;
    setHoveredCard(null);
    try {
      videoElement.pause();
    } catch (error) {
      console.error("Error pausing video:", error);
    }
  };

  const handleSortChange = (value, label, categories) => {
    setSortValue(value);
    //("Selected Sort Value:", value);
    //(label, "eikedekdb", categories);
    setselectedsort({
      title: categories,
      sort: label,
    });
  };

  function toBase64(str) {
    return btoa(String?.fromCharCode(...new Uint8Array(str)));
  }

  function fromBase64(base64) {
    return new Uint8Array(
      atob(base64)
        ?.split("")
        ?.map((c) => c?.charCodeAt(0))
    );
  }

  function compressAndEncode(url) {
    const compressed = pako?.deflate(url, { to: "string" });
    return toBase64(compressed);
  }

  function decodeAndDecompress(encodedUrl) {
    const compressed = fromBase64(encodedUrl);
    const decompressed = pako?.inflate(compressed, { to: "string" });
    return decompressed;
  }

  const HandleDiamondRoute = (val) => {
    //("hsahdjash", val);
    const obj = {
      a: val?.stockno,
      b: val?.shapename,
    };

    let encodeObj = compressAndEncode(JSON.stringify(obj));

    let navigateUrl = `/d/${val?.stockno?.replaceAll(" ", "")}/det345/?p=${encodeObj}`;
    Navigate(navigateUrl);
  };

  const getBannerImage = (index) => {
    const bannerImage = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
    return index < 0 || (index >= 1 && (index - 1) % 15 === 0)
      ? bannerImage
      : null;
  };

  const transformApiResponse = async (apiResponse) => {
    try {
      const data = apiResponse?.Data?.rd;
      const transformed = {};
      const excludedKeys = new Set(["Gridle", "Shape"]);

      data.forEach((item) => {
        const options = JSON?.parse(item.options);
        //(options);

        // Create the base object
        const transformedItem = {
          label: item.Name,
          type: item?.inptype,
          options: options.map((option) => ({
            value: option.Name,
            label: option.Name,
          })),
        };

        // Add properties only if they exist
        if (item.min !== null && item.min !== undefined) {
          transformedItem.min = item.min;
        }
        if (item.max !== null && item.max !== undefined) {
          transformedItem.max = item.max;
        }
        if (item.default !== null && item.default !== undefined) {
          transformedItem.default = item.default;
        }

        // Add to the transformed object only if it's not in excludedKeys
        if (!excludedKeys.has(item.Name)) {
          transformed[item.id] = transformedItem;
        }
      });
      return transformed;
    } catch (error) {
      //(error);
    }
  };

  const processDiamondData = async (response) => {
    try {
      if (response && response.Data && response.Data.rd) {
        let resData = response?.Data?.rd;
        sessionStorage?.setItem("filterMinMax", JSON?.stringify(resData[0]));
        const data1 = resData[0];
        const transformedData = {
          price: {
            label: "Price",
            type: "range",
            min: data1?.minprice,
            max: data1?.maxprice,
            default: [data1?.minprice, data1?.maxprice],
          },
          carat: {
            label: "Carat",
            type: "range",
            min: data1?.mincarat,
            max: data1?.maxcarat,
            default: [data1?.mincarat, data1?.maxcarat],
          },
          depth: {
            label: "Depth",
            type: "range",
            min: data1?.mindepth,
            max: data1?.maxdepth,
            default: [data1?.mindepth, data1?.maxdepth],
          },
          table: {
            label: "Table",
            type: "range",
            min: data1?.mintable,
            max: data1?.maxtable,
            default: [data1?.mintable, data1?.maxtable],
          },
        };
        const transformedArray = Object?.values(transformedData);
        setApiData((prev) => {
          return [...prev, ...transformedArray];
        });
        const Newmap = resData?.map((val) => ({
          img: IMG,
          vid: Video,
          HaveCustomization: true,
          ...val,
        }));
        setDiamondData(Newmap);
        let count = resData[0]?.icount;
        setDiaCount(count);

        setIsLoading(false);
      } else {
        console.warn("No data found in the response");
        setIsLoading(false);
      }
    } catch (error) {
      //(error, "processDiamondError");
    }
  };

  const fetchData = async (shape, parsedData) => {
    setIsLoading(true);
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const filterData = await DiamondListData(1, shape, "", parsedData);
      const data1 = filterData?.Data?.rd[0];
      const resData = filterData?.Data?.rd;
      // const Newmap = resData?.map((val, index) => ({
      //   img: IMG,
      //   vid: val?.video_url,
      //   HaveCustomization: true,
      //   ...val,
      //   bannerImage: getBannerImage(index),
      // }));
      const dataWithBanners = resData?.flatMap((val, index) => {
        const bannerImage = getBannerImage(index);
        return [
          {
            img: IMG,
            vid: val?.video_url,
            HaveCustomization: true,
            ...val,
          },
          bannerImage ? { img: bannerImage, isBanner: true } : null,
        ].filter(Boolean);
      });
      setDiamondData(dataWithBanners);
      const count = data1?.icount;
      setDiaCount(count);
      const transformedData = {
        price: {
          label: "Price",
          type: "range",
          min: data1?.minprice,
          max: data1?.maxprice,
          default: [data1?.minprice, data1?.maxprice],
        },
        carat: {
          label: "Carat",
          type: "range",
          min: data1?.mincarat,
          max: data1?.maxcarat,
          default: [data1?.mincarat, data1?.maxcarat],
        },
        depth: {
          label: "Depth",
          type: "range",
          min: data1?.mindepth,
          max: data1?.maxdepth,
          default: [data1?.mindepth, data1?.maxdepth],
        },
        table: {
          label: "Table",
          type: "range",
          min: data1?.mintable,
          max: data1?.maxtable,
          default: [data1?.mintable, data1?.maxtable],
        },
      };
      dispatch({ type: ACTIONS.SET_FILTER_DATA, payload: transformedData });
      if (!isFilterDataFetched) {
        const diamondListData = await DiamondFilterData();
        const data = await transformApiResponse(diamondListData);
        dispatch({
          type: ACTIONS.SET_DIAMOND_LIST,
          payload: data,
        });
        setIsFilterDataFetched(true);
      }
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error });
      setIsLoading(false);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { filterData, diamondList } = state;
    const mergedData =
      filterData && diamondList ? { ...filterData, ...diamondList } : {};
    sessionStorage.setItem("filterMenu", JSON.stringify(mergedData));
  }, [state]);

  const handlePageChange = async (event, newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true);
    try {
      const response = await DiamondListData(
        newPage,
        checkedItem ?? "",
        "",
        "",
        "",
        ""
      );
      const resData = response?.Data?.rd;
      const Newmap = resData?.map((val) => ({
        img: IMG,
        vid: Video,
        HaveCustomization: true,
        ...val,
      }));
      setDiamondData(Newmap);
      window.scrollTo({ top: 320, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching diamond data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSliderChange = useCallback(
    debounce((sliderType, newValue, min, max) => {
      setSliderState((prevState) => ({
        ...prevState,
        [sliderType]: newValue,
      }));
      setSliderState1((prevState) => ({
        ...prevState,
        [sliderType]: newValue,
      }));
      setSliderLabels((prev) => {
        const existingTypeIndex = prev.findIndex(
          (item) => item.type === sliderType
        );

        if (existingTypeIndex !== -1) {
          const updatedLabels = [...prev];
          updatedLabels[existingTypeIndex] = {
            type: sliderType,
            labels: [min?.label, max?.label],
          };
          return updatedLabels;
        } else {
          return [
            ...prev,
            { type: sliderType, labels: [min?.label, max?.label] },
          ];
        }
      });
      setSliderLabels1((prev) => {
        const existingTypeIndex = prev.findIndex(
          (item) => item.type === sliderType
        );

        if (existingTypeIndex !== -1) {
          const updatedLabels = [...prev];
          updatedLabels[existingTypeIndex] = {
            type: sliderType,
            labels: [min?.label, max?.label],
          };
          return updatedLabels;
        } else {
          return [
            ...prev,
            { type: sliderType, labels: [min?.label, max?.label] },
          ];
        }
      });
    }, 300),
    []
  );

  const handleFilterChange = (filterType, value) => {
    setFiltersData((prevData) => {
      const newFiltersData = { ...prevData };
      if (
        filters[filterType].type === "checkbox" ||
        filters[filterType].type === ""
      ) {
        const currentValues = newFiltersData[filterType] || [];
        if (currentValues.includes(value)) {
          newFiltersData[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFiltersData[filterType] = [...currentValues, value];
        }
      } else if (filters[filterType].type === "range") {
        newFiltersData[filterType] = value;
      }
      return newFiltersData;
    });
    setFiltersData1((prevData) => {
      const newFiltersData = { ...prevData };
      if (
        filters[filterType].type === "checkbox" ||
        filters[filterType].type === ""
      ) {
        const currentValues = newFiltersData[filterType] || [];
        if (currentValues.includes(value)) {
          newFiltersData[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFiltersData[filterType] = [...currentValues, value];
        }
      } else if (filters[filterType].type === "range") {
        newFiltersData[filterType] = value;
      }
      return newFiltersData;
    });
  };

  const storedData = sessionStorage.getItem("filterMenu");
  const isDataHave = storedData ? JSON.parse(storedData) : null;
  const Condition =
    isDataHave &&
    typeof isDataHave === "object" &&
    Object.keys(isDataHave).length > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFilterdata = JSON.parse(sessionStorage.getItem("filterMenu"));
        if (getFilterdata !== null && getFilterdata !== undefined) {
          const gapSize = getFilterdata?.Color?.options?.length / 1;
          // const gapSize = numberOfLabels / 1;

          const value = (
            getFilterdata?.Color?.options?.length * gapSize
          ).toFixed(2);
          setFilterApiOptions(getFilterdata);
          const ColorMarks = UseLabelGap(getFilterdata?.Color?.options, 100);
          const ClarityMarks = UseLabelGap(
            getFilterdata?.Clarity?.options,
            100
          );
          const Cutmarks = UseLabelGap(getFilterdata?.Cut?.options, 100);
          setFilters(getFilterdata);
          setSliderState({
            price: [getFilterdata?.price?.min, getFilterdata?.price?.max],
            Carat: [getFilterdata?.carat?.min, getFilterdata?.carat?.max],
            Color: [0, ColorMarks[0]?.value],
            Clarity: [0, ClarityMarks[0]?.value],
            Cut: [0, Cutmarks[0]?.value],
          });
          setFiltersData({
            polish: [],
            symmetry: [],
            lab: [],
            depth: [getFilterdata?.depth?.min, getFilterdata?.depth?.max],
            table: [getFilterdata?.table?.min, getFilterdata?.table?.max],
            fluorescence: [],
            culet: [],
          });
          // await getDiamondFilterData();
        } else {
          console.log("Filter data already available.");
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, [Condition]);

  useEffect(() => {
    const updatedArray = {
      Price: sliderState1?.price || "",
      Carat: sliderState1?.Carat,
      Color:
        sliderLabels1?.find((label) => label.type === "Color")?.labels || [],
      Clarity:
        sliderLabels1?.find((label) => label.type === "Clarity")?.labels || [],
      Cut: sliderLabels1?.find((label) => label.type === "Cut")?.labels || [],
      Polish: filtersData1?.Polish,
      Symmetry: filtersData1?.Symmetry,
      Lab: filtersData1?.Lab,
      Depth: filtersData1?.depth,
      Table: filtersData1?.table,
      Fluorescence: filtersData1?.Fluorescence,
      Culet: filtersData1?.Culet,
    };

    setTimeout(() => {
      setFinalArray(updatedArray);
    }, 500);
  }, [sliderState1, sliderLabels1, filtersData1, location?.pathname]);

  useEffect(() => {
    setTimeout(() => {
      const extractedValue = location?.pathname.split("f=")[1] ?? "";
      const decodedUrlData = decodeAndDecompress(extractedValue);
      const parsedData = parseUrlSegment(decodedUrlData);
      const pathname = location?.pathname.split("/");

      // Determine which data to use
      const dataToUse = Object.keys(finalArray).some(
        (key) => Array.isArray(finalArray[key]) && finalArray[key].length > 0
      )
        ? finalArray
        : parsedData ?? {};

      const sliderParams = Object.entries(dataToUse)
        .filter(
          ([key, value]) =>
            value &&
            (Array.isArray(value)
              ? value.length > 0
              : typeof value === "string" && value.length > 0)
        )
        .filter(([key, value]) =>
          Array.isArray(value)
            ? value.every((v) => v !== null && v !== undefined && v !== "")
            : true
        )
        .map(([key, value]) =>
          Array.isArray(value) ? `${key}/${value.join(",")}` : `${key}/${value}`
        )
        .join("/");

      const shape = location?.pathname?.split("/")[3];
      const urlToEncode = `${shape ? `/${shape}/${shape}` : ""}${sliderParams ? `/${sliderParams}` : ""
        }`;
      const encodeUrl = compressAndEncode(urlToEncode);
      const decodedUrl = decodeAndDecompress(encodeUrl);
      const newPath = `${pathname.slice(0, 4).join("/")}${sliderParams ? `/f=${encodeUrl}` : ""
        }`;
      Navigate(newPath);
    }, 600);
  }, [finalArray]);

  function parseUrlSegment(segment) {
    const parts = segment?.split("/")?.slice(1);
    const result = {};

    for (let i = 0; i < parts?.length; i += 2) {
      const key = parts[i];
      const value = parts[i + 1];
      if (value) {
        if (value.includes(",")) {
          result[key] = value
            .split(",")
            .map((item) => (item === "null" ? "null" : item));
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  }

  useEffect(() => {
    const extractedValue = location?.pathname.split("f=")[1] ?? "";
    const shape = location?.pathname?.split("/")[3];
    if (extractedValue) {
      try {
        const decodedUrl = decodeAndDecompress(extractedValue);
        const parsedData = parseUrlSegment(decodedUrl);
        fetchData(shape, parsedData);
      } catch (error) {
        console.error("Error decoding and parsing URL:", error);
        fetchData(shape);
      }
    } else {
      fetchData(shape);
    }
  }, [location?.pathname]);

  return (
    <>
      <DiamondPage />
      <ScrollTop />
      <div className="for_DiamondFilter">
        <Drawer
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          className="forvery_filter_sidebar_mob"
          sx={{
            zIndex: 9999999,
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(4px)",
            },
          }}
        >
          <Box
            role="presentation"
            className="box_mui_wrapper"
            sx={{
              width: {
                xs: 315,
                sm: 600,
                md: 800,
                lg: 1000,
                xl: 1200,
              },
            }}
          >
            <div
              onClick={() => setIsDrawerOpen(false)}
              className="close_bar_forevery"
            >
              <button>
                <IoClose size={28} />
              </button>
            </div>
            <div className="heading">
              <h2>select the diamond shape</h2>
              <div className="shape_list">
                {DiamondLists?.slice(0, 10)?.map((val) => (
                  <label
                    htmlFor={val?.name}
                    key={val?.name}
                    onClick={() => setshow(false)}
                  >
                    <input
                      hidden
                      type="checkbox"
                      name="shape"
                      className="input-checked-box"
                      id={val?.name}
                      checked={checkedItem === val?.name}
                      onChange={() => {
                        if (
                          steps1?.[0]?.step1 == true &&
                          stepsData2?.[0]?.step1Data?.id > 0
                        ) {
                          return;
                        } else {
                          handleCheckboxChange(val?.name);
                        }
                      }}
                    />
                    <div
                      className={`shape_card ${checkedItem === val?.name
                        ? "active-checked"
                        : (steps1?.[0]?.step1 === true && stepsData2?.[0]?.step1Data?.id > 0) || (stepsData?.[1]?.step2Data?.id > 0 ?? stepsData2?.[1]?.step2Data?.[0]?.id > 0)
                          ? "blue-unchecked"
                          : ""
                        }`}
                      id={val?.name}
                    >
                      <img src={val?.img} alt={val?.name} />
                      <span
                        style={{
                          fontWeight: checkedItem === val?.name ? "800" : "500",
                        }}
                      >
                        {val?.name}
                      </span>
                    </div>
                  </label>
                ))}
                <div
                  className="extra_shape_menu"
                  style={{
                    height: show && "180px",
                    backgroundColor: "white",
                  }}
                >
                  {DiamondLists?.slice(10, 13)?.map((val) => (
                    <label
                      htmlFor={val?.name}
                      className="extra_shape"
                      key={val?.name}
                    >
                      <div id={val?.name} className="shape">
                        <img src={val?.img} alt={val?.name} />
                        <span
                          style={{
                            fontWeight:
                              checkedItem === val?.name ? "800" : "500",
                          }}
                        >
                          {val?.name}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        name="shape"
                        className="input-checked-box"
                        id={val?.name}
                        checked={checkedItem === val?.name}
                        onChange={() => {
                          if (
                            steps1?.[0]?.step1 == true &&
                            stepsData2?.[0]?.step1Data?.id > 0
                          ) {
                            return;
                          } else {
                            handleCheckboxChange(val?.name);
                          }
                        }}
                      />
                    </label>
                  ))}
                </div>
                <div className="more" onClick={() => setshow(!show)}>
                  <button>
                    More <FaChevronDown />
                  </button>
                </div>
              </div>
            </div>
            <div className="filter_Head">
              <div className="for_price">
                <span onClick={() => handleOpen("price")}>price</span>
                <CollectionPriceRange
                  data={sliderState.price}
                  ref={(el) => (dropdownRefs.current["price"] = el)}
                  handleSliderChange={(newValue) =>
                    handleSliderChange("price", newValue)
                  }
                  open={true}
                  priceVal={FilterApiOptions?.price}
                />
              </div>
              <div className="for_Color">
                <span onClick={() => handleOpen("Color")}>Color</span>
                <CollectionColor
                  handleSliderChange={(newValue, min, max) =>
                    handleSliderChange("Color", newValue, min, max)
                  }
                  data={sliderState?.Color}
                  ref={(el) => (dropdownRefs.current["Color"] = el)}
                  open={true}
                  ColorVal={FilterApiOptions?.Color}
                />
              </div>
              <div className="for_Carat">
                <span onClick={() => handleOpen("Carat")}>Carat</span>
                <CollectionCaratRange
                  open={true}
                  handleSliderChange={(newValue) =>
                    handleSliderChange("Carat", newValue)
                  }
                  data={sliderState?.Carat}
                  ref={(el) => (dropdownRefs.current["Carat"] = el)}
                  CaratVal={FilterApiOptions?.carat}
                />
              </div>
              <div className="for_Clarity">
                <span onClick={() => handleOpen("Clarity")}>Clarity</span>
                <CollectionClarity
                  open={true}
                  handleSliderChange={(newValue, min, max) =>
                    handleSliderChange("Clarity", newValue, min, max)
                  }
                  ref={(el) => (dropdownRefs.current["Clarity"] = el)}
                  data={sliderState?.Clarity}
                  ClarityVal={FilterApiOptions?.Clarity}
                />
              </div>
              <div className="for_Cut">
                <span onClick={() => handleOpen("Cut")}>Cut</span>
                <CollectionCut
                  open={true}
                  data={sliderState?.Cut}
                  handleSliderChange={(newValue, min, max) =>
                    handleSliderChange("Cut", newValue, min, max)
                  }
                  ref={(el) => (dropdownRefs.current["Cut"] = el)}
                  CutVal={FilterApiOptions?.Cut}
                />
              </div>
            </div>
          </Box>
        </Drawer>
        <div className="heading">
          <h2>select the diamond shape</h2>
          <div className="shape_list">
            {DiamondLists?.slice(0, 10)?.map((val) => (
              <label
                htmlFor={val?.name}
                key={val?.name}
                onClick={() => setshow(false)}
              >
                <input
                  hidden
                  type="checkbox"
                  name="shape"
                  className="input-checked-box"
                  id={val?.name}
                  checked={checkedItem === val?.name}
                  onChange={() => {
                    if (
                      steps1?.[0]?.step1 == true &&
                      stepsData2?.[0]?.step1Data?.id > 0
                    ) {
                      return;
                    } else {
                      handleCheckboxChange(val?.name);
                    }
                  }}
                />
                <div
                  className={`shape_card ${checkedItem === val?.name
                    ? "active-checked"
                    : (steps1?.[0]?.step1 === true && stepsData2?.[0]?.step1Data?.id > 0) || (stepsData?.[1]?.step2Data?.id > 0 ?? stepsData2?.[1]?.step2Data?.[0]?.id > 0)
                      ? "blue-unchecked"
                      : ""
                    }`}
                  id={val?.name}
                >
                  <img src={val?.img} alt={val?.name} />
                  <span
                    style={{
                      fontWeight: checkedItem === val?.name ? "800" : "500",
                    }}
                  >
                    {val?.name}
                  </span>
                </div>
              </label>
            ))}
            <div
              className="extra_shape_menu"
              style={{
                height: show && "180px",
                backgroundColor: "white",
              }}
            >
              {DiamondLists?.slice(10, 13)?.map((val) => (
                <label
                  htmlFor={val?.name}
                  className="extra_shape"
                  key={val?.name}
                >
                  <div id={val?.name} className="shape">
                    <img src={val?.img} alt={val?.name} />
                    <span
                      style={{
                        fontWeight: checkedItem === val?.name ? "800" : "500",
                      }}
                    >
                      {val?.name}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    name="shape"
                    className="input-checked-box"
                    id={val?.name}
                    checked={checkedItem === val?.name}
                    onChange={() => {
                      if (
                        steps1?.[0]?.step1 == true &&
                        stepsData2?.[0]?.step1Data?.id > 0
                      ) {
                        return;
                      } else {
                        handleCheckboxChange(val?.name);
                      }
                    }}
                  />
                </label>
              ))}
            </div>
            <div className="more" onClick={() => setshow(!show)}>
              <button>
                More <FaChevronDown />
              </button>
            </div>
          </div>
        </div>
        <div className="filter_Head">
          <div className="for_price">
            <span onClick={() => handleOpen("price")}>
              price <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionPriceRange
              data={sliderState.price}
              ref={(el) => (dropdownRefs.current["price"] = el)}
              handleSliderChange={(newValue) =>
                handleSliderChange("price", newValue)
              }
              open={open === "price"}
              priceVal={FilterApiOptions?.price}
            />
          </div>
          <div className="for_Color">
            <span onClick={() => handleOpen("Color")}>
              Color <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionColor
              handleSliderChange={(newValue, min, max) =>
                handleSliderChange("Color", newValue, min, max)
              }
              data={sliderState?.Color}
              ref={(el) => (dropdownRefs.current["Color"] = el)}
              open={open === "Color"}
              ColorVal={FilterApiOptions?.Color}
            />
          </div>
          <div className="for_Carat">
            <span onClick={() => handleOpen("Carat")}>
              Carat <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionCaratRange
              open={open === "Carat"}
              handleSliderChange={(newValue) =>
                handleSliderChange("Carat", newValue)
              }
              data={sliderState?.Carat}
              ref={(el) => (dropdownRefs.current["Carat"] = el)}
              CaratVal={FilterApiOptions?.carat}
            />
          </div>
          <div className="for_Clarity">
            <span onClick={() => handleOpen("Clarity")}>
              Clarity <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionClarity
              open={open === "Clarity"}
              handleSliderChange={(newValue, min, max) =>
                handleSliderChange("Clarity", newValue, min, max)
              }
              ref={(el) => (dropdownRefs.current["Clarity"] = el)}
              data={sliderState?.Clarity}
              ClarityVal={FilterApiOptions?.Clarity}
            />
          </div>
          <div className="for_Cut">
            <span onClick={() => handleOpen("Cut")}>
              Cut <FaChevronDown className="chveron_icon" />
            </span>
            <CollectionCut
              open={open === "Cut"}
              data={sliderState?.Cut}
              handleSliderChange={(newValue, min, max) =>
                handleSliderChange("Cut", newValue, min, max)
              }
              ref={(el) => (dropdownRefs.current["Cut"] = el)}
              CutVal={FilterApiOptions?.Cut}
            />
          </div>
        </div>
        <div
          className="for_filter_more"
          style={{
            height: showMorefilter ? "auto" : "50px",
            background: showMorefilter ? " #fcf4f4" : "#fff",
          }}
        >
          <div
            className="head_filter"
            onClick={() => {
              setshowMorefilter(!showMorefilter);
              setOpen(null);
            }}
          >
            <span>
              {showMorefilter ? "Less" : "More"} filters
              {showMorefilter ? <CgArrowUpO /> : <CgArrowDownO />}
            </span>
          </div>
          <div className="more_filter_data">
            {Object?.keys(filters) &&
              Object?.keys(filters)?.map((filterType) => {
                const filter = filters[filterType];
                const filterData = filtersData[filterType] || filter.default;
                if (
                  filterType === "price" ||
                  filterType === "Cut" ||
                  filterType === "Color" ||
                  filterType === "Clarity" ||
                  filterType === "carat"
                )
                  return null;

                const isCheckbox = !filter?.type || filter?.type === "checkbox";
                const isEmptyFilterType =
                  !filterData ||
                  (Array.isArray(filterData) && filterData.length === 0);

                if (isCheckbox || isEmptyFilterType) {
                  return (
                    <div key={filterType} className="filter_card">
                      <h4 className="advance_filter_title">
                        <img src={RoundImage} alt="" /> {filter?.label}
                      </h4>
                      <div className="advance_filter_checkboxes">
                        {filter?.options?.map((option) => (
                          <label key={option.value}>
                            <Checkbox
                              checked={filterData?.includes(option.value)}
                              onChange={() =>
                                handleFilterChange(filterType, option.value)
                              }
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (filter?.type === "range") {
                  return (
                    <div key={filterType} className="filter_card">
                      <h4 className="advance_filter_title">
                        <img src={RoundImage} alt="" /> {filter?.label}
                      </h4>
                      <Slider
                        value={filterData || filter?.default}
                        min={filter?.min}
                        defaultValue={filter?.default}
                        max={filter?.max}
                        step={0.1}
                        className="sliderRange_mui_range_filter"
                        sx={{
                          marginLeft: "25px",
                          "& .MuiSlider-thumb": {
                            width: 17,
                            height: 17,
                            backgroundColor: "black",
                            border: "1px solid #000",
                          },
                          "& .MuiSlider-rail": {
                            height: 5, // Adjust height of the rail
                            bgcolor: "black",
                            border: " none",
                          },
                          "& .MuiSlider-track": {
                            height: 5, // Adjust height of the track
                            padding: "0 5px",
                            bgcolor: "black",
                            border: " none",
                          },
                          "& .MuiSlider-markLabel": {
                            fontSize: "12px !important",
                          },
                        }}
                        onChange={(e, newValue) =>
                          handleFilterChange(filterType, newValue)
                        }
                        valueLabelDisplay="off"
                        aria-labelledby={`${filterType}-slider`}
                      />
                      <div className="advance_filter_input_box">
                        <input
                          type="number"
                          value={filterData ? filterData[0] : filter.min}
                          onChange={(e) =>
                            handleFilterChange(filterType, [
                              parseFloat(e.target.value) || filter.min,
                              filterData ? filterData[1] : filter.max,
                            ])
                          }
                        />
                        <input
                          type="number"
                          value={filterData ? filterData[1] : filter.max}
                          onChange={(e) =>
                            handleFilterChange(filterType, [
                              filterData ? filterData[0] : filter.min,
                              parseFloat(e.target.value) || filter.max,
                            ])
                          }
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
        <div className="filter_results">
          <hr />
          <h3>Showing {diaCount} lab grown diamonds</h3>
          <div className="col_details">
            <div className="desc">
              <p>
                Design your own personal Diamond Engagement Ring. Please select
                ring setting of your style and then choose diamond of your
                choice.We present every diamond in high definition so you can
                know exactly what you are getting.
              </p>
            </div>
            <div className="flex_for_mob">
              <div className="sorting_options">
                <span
                  onClick={() => handleOpen("Sort")}
                  className="title_for_sort"
                >
                  Sort By |
                  <div>
                    <span> {selectedsort?.title} </span> {selectedsort?.sort}
                  </div>
                </span>
                <SortingOption
                  ref={dropdownRefs.current}
                  open={open === "Sort"}
                  selectedValues={" Price: Low to High"}
                  onSortChange={handleSortChange}
                />
              </div>
              <div
                onClick={() => setIsDrawerOpen(true)}
                className="filter_bnt_forevery"
              >
                <button>
                  <GiDiamondRing size={22} color="white" /> Filters
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
        {isloding ? (
          <div className="for_global_spinnerDiv">
            <WebLoder />
          </div>
        ) : (
          <>
            {diamondData?.length != 0 && diamondData?.[0]?.stat !== 0 ? (
              <>
                <div className="diamond_listing">
                  {diamondData?.map((val, i) => {
                    const currentMediaType = ShowMedia[i] || "vid";
                    const bannerImage = getBannerImage(i);
                    return (
                      <div key={i} className="diamond_card">
                        <div className="media_frame">
                          {val?.isBanner == true ? (
                            <img
                              src={val?.img}
                              alt="bannerImage"
                              width={"100%"}
                              loading="lazy"
                            />
                          ) : (
                            <>
                              {currentMediaType === "vid" ? (
                                <>
                                  {val?.vid?.endsWith(".mp4") ? (
                                    <video
                                      src={val?.vid}
                                      width="100%"
                                      ref={(el) => (videoRefs.current[i] = el)}
                                      autoPlay={hoveredCard === i}
                                      controls={false}
                                      muted
                                      onMouseOver={(e) => handleMouseMove(e, i)}
                                      onMouseLeave={(e) =>
                                        handleMouseLeave(e, i)
                                      }
                                      loading="lazy"
                                      onClick={() => HandleDiamondRoute(val)}
                                    />
                                  ) : val?.image_file_url !== "" ? (
                                    <img
                                      className="dimond-info-img"
                                      src={val?.image_file_url}
                                      alt=""
                                      onClick={() => HandleDiamondRoute(val)}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <>
                                      <img
                                        // src={val?.img}
                                        src={fallbackImg}
                                        alt="bannerImage"
                                        width={"100%"}
                                        loading="lazy"
                                        onClick={() => HandleDiamondRoute(val)}
                                      />
                                    </>
                                  )}
                                </>
                              ) : (
                                <img
                                  className="dimond-info-img"
                                  loading="lazy"
                                  src={val?.img}
                                  alt=""
                                  onClick={() => HandleDiamondRoute(val)}
                                />
                              )}
                            </>
                          )}
                          {!val?.isBanner == true && (
                            <>
                              <div className="select_this_diamond_banner" onClick={() => HandleDiamondRoute(val)}>
                                <span>Select This Diamond</span>
                              </div>
                            </>
                          )}
                        </div>
                        {!val?.isBanner == true && (
                          <>
                            <div className="toggle_btn">
                              <span onClick={() => HandleMedia("img", i)}>
                                <img
                                  src={`${storImagePath()}/Forevery/diamondFilter/t-1.png`}
                                  alt=""
                                  loading="lazy"
                                />
                              </span>
                              <span onClick={() => HandleMedia("vid", i)}>
                                <SvgImg />
                              </span>
                            </div>
                            <div className="price_details">
                              <div className="title">
                                <span>
                                  {val?.shapename} <strong>{val?.carat}</strong>{" "}
                                  CARAT {val?.colorname} {val?.clarityname}{" "}
                                  {val?.cutname}
                                </span>
                              </div>
                              <div className="pric">
                                <span className="smr_currencyFont">
                                  {loginInfo?.CurrencyCode ??
                                    storeInitData?.CurrencyCode}
                                </span>
                                <span> {val?.price}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {storeInitData?.IsProductListPagination == 1 &&
                    Math.ceil(diaCount / storeInitData.PageSize) > 1 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBlock: "3%",
                          width: "100%",
                        }}
                      >
                        <div style={{ background: "red" }}></div>
                        <Pagination
                          count={Math.ceil(diaCount / storeInitData.PageSize)}
                          size={maxwidth464px ? "small" : "large"}
                          shape="circular"
                          onChange={handlePageChange}
                          page={currentPage}
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    )}
                </div>
              </>
            ) : (
              <div className="for_NoDataDiv">
                No diamond found in this filter!
              </div>
            )}
          </>
        )}
        <div className="filter_clear">
          <p>
            It appears that there are no diamonds matching your search criteria.
            Please adjust your search settings or <u>reset your filters</u> for
            better results.
          </p>
        </div>
        <div className="faq_accordian_Design">
          <Accordion>
            <AccordionSummary
              onClick={() => setAccordianChecked(!AccordianChecked)}
              expandIcon={
                AccordianChecked ? (
                  <RemoveCircleOutlineIcon />
                ) : (
                  <AddCircleOutlineIcon />
                )
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="m-faq">
                {isTabletView ? "FAQ" : "Frequently Asked Questions"}
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <Faq data={faqList} />
            </AccordionDetails>
          </Accordion>
          <div className="show_more_btn">
            <button
              onClick={() => Navigate(`/faq`)}
              className={`${btnstyle?.btn_for_new} btn-sm ${btnstyle?.btn_15}`}
            >
              SHOW MORE
              <FaChevronDown
                style={{
                  marginTop: "-3px",
                }}
              />
            </button>
          </div>
        </div>
        <NewsletterSignup />
      </div>
    </>
  );
};

export default DiamondFilter;

const CollectionPriceRange = forwardRef(
  ({ handleSliderChange, data, open, priceVal }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation();
    };
    return (
      <div
        className="for_ma_collection_filter_dropdown"
        ref={ref}
        style={{
          height: open ? "110px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            value={data}
            onChangeCommitted={(e, newValue) => handleSliderChange(newValue)}
            onMouseDown={handleSliderMouseDown}
            min={priceVal?.min}
            max={priceVal?.max}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            size="small"
            step={1}
            sx={{
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 8, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 8, // Adjust height of the track
              },
            }}
          />
          <div className="for_ma_collection_slider_input">
            <div className="for_right-menu">
              <input type="text" value={`INR ${formatter(data[0])}`} />
            </div>
            <div className="for_left-menu">
              <input type="text" value={`INR ${formatter(data[1])}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
const CollectionCaratRange = forwardRef(
  ({ open, handleSliderChange, data, CaratVal }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation();
    };

    return (
      <div
        className="for_ma_collection_filter_dropdown"
        ref={ref}
        style={{
          height: open ? "110px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            value={data}
            onChangeCommitted={(e, newValue) => handleSliderChange(newValue)}
            onMouseDown={handleSliderMouseDown}
            min={CaratVal?.min}
            max={CaratVal?.max}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            size="small"
            defaultValue={[0.96, 41.81]}
            step={0.1}
            sx={{
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "black",
                border: "1px solid #fff",
              },
              "& .MuiSlider-rail": {
                height: 8, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 8, // Adjust height of the track
              },
            }}
          />
          <div className="for_ma_collection_slider_input">
            <div className="for_right-menu">
              <input type="text" value={data[0]} />
            </div>
            <div className="for_left-menu">
              <input type="text" value={data[1]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
const CollectionColor = forwardRef(
  ({ handleSliderChange, data, open, ColorVal }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation();
    };
    const marks = UseLabelGap(ColorVal?.options, 100);
    // const marks = [
    //   { label: "M", value: 10, name: "M" },
    //   { label: "L", value: 20, name: "L" },
    //   { label: "K", value: 30, name: "K" },
    //   { label: "J", value: 40, name: "J" },
    //   { label: "I", value: 50, name: "I" },
    //   { label: "H", value: 60, name: "H" },
    //   { label: "G", value: 70, name: "G" },
    //   { label: "F", value: 80, name: "F" },
    //   { label: "E", value: 90, name: "E" },
    //   { label: "D", value: 100, name: "D" },
    // ];

    const calculateStepSize = () => {
      if (!marks || marks?.length < 2) return 10; // Default step size if not enough marks
      const gapSize = marks[1]?.value - marks[0]?.value;
      return gapSize;
    };
    const FindMaxLabel = (max) => {
      const data = marks?.find((val, i) => val?.value === max);
      return data;
    };

    const FindMinLabel = (min) => {
      const data = marks?.find((val, i) => val?.value === min);
      return data;
    };

    const handleChange = (e, newValue) => {
      const minLabel = FindMinLabel(newValue[0]);
      const maxLabel = FindMaxLabel(newValue[1]);
      handleSliderChange(newValue, minLabel, maxLabel);
      //("Slider values changed:", newValue);
      //("Min label:", minLabel, "Max label:", maxLabel);
    };
    return (
      <div
        className="for_ma_color"
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            // defaultValue={[20, 60]}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            name={marks}
            onChangeCommitted={handleChange}
            size="small"
            min={marks[marks?.length - 1]?.value}
            max={marks[0]?.value}
            value={data}
            step={calculateStepSize()}
            sx={{
              width: "580px",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 6, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 6, // Adjust height of the track
                padding: "0 5px",
              },
              "& .MuiSlider-markLabel": { fontSize: "12px !important" },
            }}
          />
        </div>
      </div>
    );
  }
);
const CollectionClarity = forwardRef(
  ({ handleSliderChange, data, open, ClarityVal }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation(); // Prevent click from propagating to parent div
    };
    const marks = UseLabelGap(ClarityVal?.options, 100);
    // const marks = [
    //   { label: "SI2", value: 12.5 },
    //   { label: "SI1", value: 25 },
    //   { label: "VS2", value: 37.5 },
    //   { label: "VS1", value: 50 },
    //   { label: "VVS2", value: 62.5 },
    //   { label: "VVS1", value: 75 },
    //   { label: "IF", value: 87.5 },
    //   { label: "FL", value: 100 },
    // ];

    const calculateStepSize = () => {
      if (!marks || marks?.length < 2) return 10; // Default step size if not enough marks
      const gapSize = marks[1]?.value - marks[0]?.value;
      return gapSize;
    };

    const FindMaxLabel = (max) => {
      const data = marks?.find((val) => val?.value === max);
      return data;
    };

    const FindMinLabel = (min) => {
      const data = marks?.find((val) => val?.value === min);
      return data;
    };

    const handleChange = (e, newValue) => {
      const minLabel = FindMinLabel(newValue[0]);
      const maxLabel = FindMaxLabel(newValue[1]);
      handleSliderChange(newValue, minLabel, maxLabel);
    };
    return (
      <div
        className="for_ma_color"
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            defaultValue={[25, 62.5]}
            aria-label="Restricted values"
            marks={marks}
            value={data}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChangeCommitted={handleChange}
            size="small"
            min={marks[marks?.length - 1]?.value}
            max={marks[0]?.value}
            step={calculateStepSize()}
            sx={{
              width: "400px",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 6, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 6, // Adjust height of the track
                padding: "0 5px",
              },
              "& .MuiSlider-markLabel": { fontSize: "12px !important" },
            }}
          />
        </div>
      </div>
    );
  }
);
const CollectionCut = forwardRef(
  ({ handleSliderChange, data, open, CutVal }, ref) => {
    const handleSliderMouseDown = (event) => {
      event.stopPropagation(); // Prevent click from propagating to parent div
    };

    const marks = UseLabelGap(CutVal?.options, 100);

    const calculateStepSize = () => {
      if (!marks || marks?.length < 2) return 10; // Default step size if not enough marks
      const gapSize = marks[1]?.value - marks[0]?.value;
      return gapSize;
    };

    // const marks = [
    //   { label: "None", value: 20 },
    //   { label: "Good", value: 40 },
    //   { label: "Very Good", value: 60 },
    //   { label: "Excellent", value: 80 },
    //   { label: "Heart And Arrow", value: 100 },
    // ];

    const FindMaxLabel = (max) => {
      const data = marks?.find((val) => val?.value === max);
      return data;
    };

    const FindMinLabel = (min) => {
      const data = marks?.find((val) => val?.value === min);
      return data;
    };

    const handleChange = (e, newValue) => {
      const minLabel = FindMinLabel(newValue[0]);
      const maxLabel = FindMaxLabel(newValue[1]);
      handleSliderChange(newValue, minLabel, maxLabel);
      //("Slider values changed:", newValue);
      //("Min label:", minLabel, "Max label:", maxLabel);
    };

    return (
      <div
        className="for_ma_color"
        style={{
          height: open ? "90px" : "0px",
        }}
      >
        <div className="for_ma_collection_slider_div">
          <Slider
            defaultValue={[20, 100]}
            value={data}
            aria-label="Restricted values"
            marks={marks}
            aria-labelledby="range-slider"
            style={{ color: "black" }}
            onChangeCommitted={handleChange}
            size="small"
            min={marks[marks?.length - 1]?.value}
            max={marks[0]?.value}
            step={calculateStepSize()}
            sx={{
              width: "450px",
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "black",
                border: "1px solid #000",
              },
              "& .MuiSlider-rail": {
                height: 6, // Adjust height of the rail
              },
              "& .MuiSlider-track": {
                height: 6, // Adjust height of the track
                padding: "0 15px",
              },
              "& .MuiSlider-markLabel": { fontSize: "12px !important" },
            }}
          />
        </div>
      </div>
    );
  }
);
const SortingOption = forwardRef(({ onSortChange, open }, ref) => {
  return (
    <div
      ref={ref}
      className="drop-list--1CjuW"
      style={{
        height: open ? "300px" : "0px",
        overflow: "hidden",
      }}
    >
      {sortingOptions.map((item, index) => (
        <li key={index} className="main_sort_li">
          <div className="drop-category--35Pnq">{item.category}</div>
          <div className="drop-sort-options">
            {item.options ? (
              item.options.map((option, idx) => (
                <div
                  key={idx}
                  data-sort={option.value}
                  className="drop-item-container-grouped--3uDXx"
                  onClick={() =>
                    onSortChange(option?.value, option?.label, item?.category)
                  }
                >
                  <div className="drop-item-grouped--2w1qo">{option.label}</div>
                </div>
              ))
            ) : (
              <div
                data-sort={item.value}
                className="drop-item-container-grouped--3uDXx"
                onClick={() =>
                  onSortChange(item?.value, item?.options, item?.category)
                }
                hidden
              >
                <div className="drop-item-grouped--2w1qo">{item.category}</div>
              </div>
            )}
          </div>
        </li>
      ))}
    </div>
  );
});
