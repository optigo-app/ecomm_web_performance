import { REACT_APP_WEB } from "../../env";

export function storImagePath() {
  let statiPath = `${window?.location?.protocol}//${window.location.hostname === "localhost" ||
      window.location.hostname === "zen"
      ? REACT_APP_WEB
      : window.location.hostname
    }`;
  return `${statiPath}/WebSiteStaticImage`;
  // return `${statiPath}/Website_Store/WebSiteStaticImage`
  // return `${storeinit?.UploadLogicalPath}/${storeinit?.ukey}/${storeinit?.ufcc}`
}

export const getDomainName = async () => {
  try {
    const { hostname } = window.location;
    if (!hostname) {
      throw new Error("Hostname is not available.");
    }
    const domainMap = {
      "almacarino.procatalog.in": "almacarino",
      "shreediamond.optigoapps.com": "sdj",
      'apptstore.orail.co.in': 'sdj',
      'fgstore.mapp': 'sdj',
      'varajewels.com': "vaara",
      'www.varajewels.com': "vaara",
      'sonasons.optigoapps.com': "demo",
      'uscreation.procatalog.in': "uscreation",
      'localhost': "default",
    };
    return domainMap[hostname] || "default";
  } catch (error) {
    console.error("Error in getDomainName:", error);
    return "default";
  }
};

export function storInitDataPath() {
  let hostName =
    window.location.hostname === "localhost" ||
      window.location.hostname === "zen"
      ? REACT_APP_WEB
      : window.location.hostname;
  if (hostName?.startsWith("www.")) {
    hostName = hostName.substring(4);
  }
  let statiPath = `${window?.location?.protocol}//${hostName}`;
  return `${statiPath}/Website_Store/WebSiteStaticImage/${hostName}`;
}

// export function storInitDataPath() {
//   let statiPath = `${window?.location?.protocol}//${(window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'fgstore.web' : window.location.hostname}`
//   let hostName = `${window?.location?.protocol}//${(window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'fgstore.web' : window.location.hostname}`
//   return `${statiPath}/Website_Store/WebSiteStaticImage/${hostName}`
// }

export function findMetalColor(paramId) {
  let metalColorArr = JSON.parse(sessionStorage.getItem("MetalColorCombo"));
  let item = metalColorArr.filter((item) => item?.id === paramId);
  return item;
}

export function findMetalType(paramId) {
  let metalTypeArr = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
  let item = metalTypeArr.filter((item) => item?.Metalid == paramId);
  // console.log("findMetal pro",paramId,item);
  return item;
}

export function findMetal(param) {
  let metalTypeArr = JSON.parse(sessionStorage.getItem("metalTypeCombo"));
  let item = metalTypeArr.filter((item) => item?.metaltype === param);
  return item;
}

export function findDiaQcId(param) {
  let diaQCArr = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"));
  let quality = param.split(",")[0];
  let color = param.split(",")[1];

  let item = diaQCArr?.filter(
    (ele) => ele?.Quality == quality && ele?.color == color
  );
  // console.log("diaa dia",item,param);

  return item;
}

export function findCsQcId(param) {
  let CsQCArr = JSON.parse(
    sessionStorage.getItem("ColorStoneQualityColorCombo")
  );
  let quality = param.split(",")[0];
  let color = param.split(",")[1];

  let item = CsQCArr?.filter(
    (ele) => ele?.Quality == quality && ele?.color == color
  );
  // console.log("diaa cs",item,param);
  return item;
}

export const formatter = new Intl.NumberFormat("en-IN")?.format;


export const formatRedirectTitleLine = (titleLine) => {
  // Check for null, undefined, "null", or empty string
  if (!titleLine || titleLine.toLowerCase() == "null" || titleLine === "") {
    return "";
  }
  return titleLine.replace(/\s+/g, "_") + "_";
};

export const formatTitleLine = (titleLine) => {
  if (!titleLine || titleLine.toLowerCase() == "null" || titleLine === "") {
    return "";
  }
  return titleLine;
};

export const downloadExcelLedgerData = () => {
  setTimeout(() => {
    const button = document.getElementById('test-table-xls-button');
    button.click();
  }, 500);
}

export const handleScrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

export const fetchAPIUrlFromStoreInit = () => {
  let retries = 3;
  let getStoreInitData = null;

  const checkData = () => {
    getStoreInitData = JSON?.parse(sessionStorage?.getItem("storeInit"));

    if (getStoreInitData?.ApiUrl || retries <= 0) {
      return getStoreInitData;
    } else {
      retries -= 1;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(checkData()); 
        }, 100); 
      });
    }
  };

  return checkData();
};


export const wesbiteDomainName = window.location.host;