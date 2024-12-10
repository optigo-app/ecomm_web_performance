export function storImagePath() {
  let statiPath = `${window?.location?.protocol}//${(window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'elvee.web' : window.location.hostname}`
  return `${statiPath}/WebSiteStaticImage`
  // return `${statiPath}/Website_Store/WebSiteStaticImage`
  // return `${storeinit?.UploadLogicalPath}/${storeinit?.ukey}/${storeinit?.ufcc}`
}

export function storInitDataPath() {
  let hostName = (window.location.hostname === 'localhost' || window.location.hostname === 'zen')
    ? 'elvee.web'
    : window.location.hostname;
  if (hostName.startsWith('www.')) {
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
  let metalColorArr = JSON.parse(sessionStorage.getItem("MetalColorCombo"))
  let item = metalColorArr.filter(item => item?.id === paramId)
  return item
}

export function findMetalType(paramId) {
  let metalTypeArr = JSON.parse(sessionStorage.getItem("metalTypeCombo"))
  let item = metalTypeArr.filter(item => item?.Metalid == paramId)
  // console.log("findMetal pro",paramId,item);
  return item
}

export function findMetal(param) {
  let metalTypeArr = JSON.parse(sessionStorage.getItem("metalTypeCombo"))
  let item = metalTypeArr.filter(item => item?.metaltype === param)
  return item
}

export function findDiaQcId(param) {

  let diaQCArr = JSON.parse(sessionStorage.getItem("diamondQualityColorCombo"))
  let quality = param.split(",")[0]
  let color = param.split(",")[1]

  let item = diaQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)
  // console.log("diaa dia",item,param);

  return item
}

export function findCsQcId(param) {

  let CsQCArr = JSON.parse(sessionStorage.getItem("ColorStoneQualityColorCombo"))
  let quality = param.split(",")[0]
  let color = param.split(",")[1]

  let item = CsQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)
  // console.log("diaa cs",item,param);
  return item
}


export const formatter = new Intl.NumberFormat('en-IN')?.format;