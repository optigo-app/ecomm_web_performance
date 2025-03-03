import React, { useEffect, useRef, useState } from "react"
import "./SearchData.scss"
import SearchIcon from "../../../Assets/livesearchicon.webp"
import { useRecoilState } from "recoil";
import Cookies from 'js-cookie'
import noImageFound from '../../../Assets/image-not-found.jpg'
import { for_MetalColor_Image } from "../../../Recoil/atom";
import ProductListApi from "../../../../../../utils/API/ProductListAPI/ProductListApi";
import { useLocation, useNavigate } from "react-router-dom";
import Pako from "pako";
import { formatRedirectTitleLine, formatter } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { DiamondListData } from "../../../../../../utils/API/DiamondStore/DiamondList";

const SearchData = () => {

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [storeInit, setStoreInit] = useState({});
    let cookie = Cookies.get("visiterId");
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId ?? storeInit?.MetalId);
    const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid);
    const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid);
    const [locationKey, setLocationKey] = useState();
    const getEncodeData = atob(location?.search?.slice(3));
    const [productListData, setProductListData] = useState([]);
    const [diamondData, setDiamondData] = useState();
    const [prodListType, setprodListType] = useState();
    const [isProdLoading, setIsProdLoading] = useState(false);
    const [isOnlyProdLoading, setIsOnlyProdLoading] = useState(true);
    const [loginCurrency, setLoginCurrency] = useState();
    const [afterFilterCount, setAfterFilterCount] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    console.log('searchText: ', searchText);

    const setDefaultsearchText = location?.pathname?.split('/')?.[2];

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(data);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData)

        let mtid = loginUserDetail?.MetalId ?? data?.MetalId;
        setSelectedMetalId(mtid);

        let diaid = loginUserDetail?.cmboDiaQCid ?? data?.cmboDiaQCid;
        setSelectedDiaId(diaid);

        let csid = loginUserDetail?.cmboCSQCid ?? data?.cmboCSQCid;
        setSelectedCsId(csid);

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let obj = { mt: selectedMetalId, dia: selectedDiaId, cs: selectedCsId };
                let UrlVal = location?.search?.slice(1).split("/");

                let SearchVar = '';
                let productlisttype;

                UrlVal.forEach((ele) => {
                    let firstChar = ele.charAt(0);
                    switch (firstChar) {
                        case 'S':
                            SearchVar = ele;
                            break;
                        default:
                            return "";
                    }
                });

                if (SearchVar) {
                    productlisttype = SearchVar;
                }

                setprodListType(productlisttype);
                setIsProdLoading(true);
                setIsOnlyProdLoading(true);

                const res = await ProductListApi({}, 1, obj, productlisttype, cookie, "");
                const filterData = await DiamondListData(1, (setDefaultsearchText || searchText));
                // const filterData = await DiamondListData("", (shape || ""), (stockno || ""), "", "");

                if (res) {
                    setProductListData(res?.pdList);
                    setAfterFilterCount(res?.pdResp?.rd1[0]?.designcount);
                }

                if (filterData) {
                    setDiamondData(filterData?.Data?.rd);
                }

            } catch (error) {
                console.error("Error fetching product list:", error);
            } finally {
                setIsOnlyProdLoading(false);
                setIsProdLoading(false);
            }
        };

        fetchData();

        if (location?.key) {
            setLocationKey(location?.key);
        }
        setCurrPage(1);
    }, [location?.key]);

    let getDesignImageFol = storeInit?.CDNDesignImageFol;

    const getDynamicImages = (designno, extension) => {
        return `${getDesignImageFol}${designno}~${1}.${extension}`;
    };

    const handleBreadcums = (mparams) => {

        let key = Object?.keys(mparams)
        let val = Object?.values(mparams)

        let KeyObj = {};
        let ValObj = {};

        key.forEach((value, index) => {
            let keyName = `FilterKey${index === 0 ? '' : index}`;
            KeyObj[keyName] = value;
        });

        val.forEach((value, index) => {
            let keyName = `FilterVal${index === 0 ? '' : index}`;
            ValObj[keyName] = value;
        });

        let finalData = { ...KeyObj, ...ValObj }

        const queryParameters1 = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join('/');

        const queryParameters = [
            finalData?.FilterKey && `${finalData.FilterVal}`,
            finalData?.FilterKey1 && `${finalData.FilterVal1}`,
            finalData?.FilterKey2 && `${finalData.FilterVal2}`,
        ].filter(Boolean).join(',');

        const otherparamUrl = Object.entries({
            b: finalData?.FilterKey,
            g: finalData?.FilterKey1,
            c: finalData?.FilterKey2,
        })
            .filter(([key, value]) => value !== undefined)
            .map(([key, value]) => value)
            .filter(Boolean)
            .join(',');

        let menuEncoded = `${queryParameters}/${otherparamUrl}`;

        const url = `/p/${BreadCumsObj()?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
        // const url = `/p?V=${queryParameters}/K=${otherparamUrl}`;

        navigate(url);

        // console.log("mparams", KeyObj, ValObj)

    }

    const BreadCumsObj = () => {

        let BreadCum = decodeURI(atob(location?.search.slice(3)))?.split('/')

        const values = BreadCum[0]?.split(',');
        const labels = BreadCum[1]?.split(',');

        const updatedBreadCum = labels?.reduce((acc, label, index) => {
            acc[label] = values[index] || '';
            return acc;
        }, {});

        const result = Object?.entries(updatedBreadCum ?? {})?.reduce((acc, [key, value], index) => {
            acc[`FilterKey${index === 0 ? '' : index}`] = key.charAt(0).toUpperCase() + key.slice(1);
            acc[`FilterVal${index === 0 ? '' : index}`] = value;
            return acc;
        }, {});

        if (result) {
            result.menuname = decodeURI(location?.pathname)?.slice(3)?.slice(0, -1)?.split("/")[0]
        } else {
            result = {}
        }

        return result
    }

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

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

    const handleMoveToDetail = (productData, metalColor) => {
        let obj = {
            a: productData?.autocode,
            b: productData?.designno,
            m: selectedMetalId,
            d: selectedDiaId,
            c: selectedCsId,
            cmc: metalColor,
            p: BreadCumsObj(),
            s: location?.search.charAt(1) == "S",
            f: {},
        };

        let encodeObj = compressAndEncode(JSON.stringify(obj));

        // navigate(
        //     `/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""
        //     }${productData?.designno}/?p=${encodeObj}`
        // );
        navigate(`/d/${formatRedirectTitleLine(productData?.TitleLine)}${productData?.designno}?p=${encodeObj}`);
    };

    const HandleDiamondRoute = (val) => {
        const currentLocation = location.pathname + location.search + location.hash;

        //("hsahdjash", val);
        const obj = {
            a: val?.stockno,
            b: val?.shapename,
        };

        let encodeObj = compressAndEncode(JSON.stringify(obj));

        let navigateUrl = `/d/${val?.stockno?.replaceAll(" ", "")}/det345/?p=${encodeObj}`;
        window.history.pushState({ pathname: currentLocation }, '', currentLocation);
        navigate(navigateUrl);
    };

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        if (searchText === "") {
            setSearchText(setDefaultsearchText);
        }
    }, [location?.key]);

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
                navigate(`/search/${searchText}?S=${encodeObj}`);
                setSearchText("");
            }
        }
    };

    return (
        <div className="for_searchdata_container">
            <div className="for_searchdata_content">
                <h2 className="for_searchdata_title_1">Search here</h2>
                <div className="for_searchinput_wrapper">
                    <div className="for_searchicon_div">
                        <img src={SearchIcon} alt="Search" />
                    </div>
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={searchDataFucn} placeholder="Enter your search" />
                </div>
                <div className="for_searchdata_showresult_div">
                    <h2 className="for_searchdata_title_2">Search Results</h2>
                    <div className="for_searchdata_listing_div">
                        {isOnlyProdLoading ? <div className="for_global_spinner"></div> : (
                            <>
                                {productListData?.map((productData, index) => {
                                    const imageUrl = getDynamicImages(productData?.designno, productData?.ImageExtension);
                                    return (
                                        <div className="for_productCard_mainDiv" key={index}>
                                            <div className="for_productList_listing_card_div">
                                                <div className="for_product_listing_ratings_div">
                                                </div>
                                                <div className="forWeb_app_product_label_prd">
                                                    {productData?.IsInReadyStock == 1 && <span className="forWeb_app_instock">In Stock</span>}
                                                    {productData?.IsBestSeller == 1 && <span className="forWeb_app_bestSeller">Best Seller</span>}
                                                    {productData?.IsTrending == 1 && <span className="forWeb_app_intrending">Trending</span>}
                                                    {productData?.IsNewArrival == 1 && <span className="forWeb_app_newarrival">New</span>}
                                                </div>
                                                <div className="for_productList_listing_card_image_div"
                                                    onClick={() => handleMoveToDetail(productData)}
                                                >
                                                    <img
                                                        className="for_productList_listing_card_image"
                                                        src={imageUrl}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.stopPropagation();
                                                            e.target.src = noImageFound
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="for_productList_card_description">
                                                <div className="for_productList_desc_title">
                                                    <span className="for_listing_desc_span">{productData?.designno} {productData?.TitleLine?.length > 0 && " - " + productData?.TitleLine}</span>
                                                </div>
                                                <div className="for_productList_desc_div">
                                                    <div className="">
                                                        {storeInit?.IsGrossWeight == 1 && Number(productData?.Gwt) !== 0 && (
                                                            <span>GWT: {productData?.Gwt.toFixed(3)}</span>
                                                        )}
                                                        {storeInit?.IsMetalWeight == 1 && Number(productData?.Nwt) !== 0 && (
                                                            <span>&nbsp;| NWT: {productData?.Nwt.toFixed(3)}</span>
                                                        )}
                                                        {storeInit?.IsDiamondWeight == 1 && Number(productData?.Dwt) !== 0 && (
                                                            <span>&nbsp;| DWT: {productData?.Dwt.toFixed(3)}{storeInit?.IsDiamondPcs === 1
                                                                ? ` / ${productData?.Dpcs?.toFixed(0)}`
                                                                : null}</span>
                                                        )}
                                                        {storeInit?.IsStoneWeight == 1 &&
                                                            Number(productData?.CSwt) !== 0 && (
                                                                <span>&nbsp;| CWT: {productData?.CSwt.toFixed(3)}{storeInit?.IsStonePcs === 1
                                                                    ? ` / ${productData?.CSpcs?.toFixed(0)}`
                                                                    : null}</span>
                                                            )}

                                                    </div>
                                                </div>
                                                <div className="for_productList_price_div">
                                                    <span>
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: decodeEntities(loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode),
                                                            }}
                                                            style={{ paddingRight: '0.4rem' }}
                                                        />
                                                        {formatter(productData?.UnitCostWithMarkUpIncTax)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div >
                                    )
                                })}
                            </>
                        )}
                    </div>
                    {isOnlyProdLoading ? "" : (
                        <>
                            {diamondData?.length !== 0 && diamondData?.[0]?.stat !== 0 && (
                                <div className="for_searchdata_listing_div">
                                    {diamondData?.map((val, i) => {
                                        const diamondImageUrl = val?.image_file_url || noImageFound;
                                        return (
                                            <div className="for_productCard_mainDiv" key={i}>
                                                <div className="for_productList_listing_card_div">
                                                    <div
                                                        className="for_productList_listing_card_image_div"
                                                        onClick={() => HandleDiamondRoute(val)}
                                                    >
                                                        <img
                                                            className="for_productList_listing_card_image"
                                                            src={diamondImageUrl}
                                                            alt=""
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.stopPropagation();
                                                                e.target.src = noImageFound;
                                                            }}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="for_productList_card_description">
                                                    <div className="for_productList_desc_dia_title">
                                                        <span className="for_listing_desc_dia_span">
                                                            {val?.shapename} - {val?.carat?.toFixed(3)} CARAT {val?.colorname} {val?.clarityname} {val?.cutname}
                                                        </span>
                                                        <span className="for_listing_desc_dia_span">SKU: {val?.stockno}</span>
                                                        <div className="for_productList_price_dia_div">
                                                            <span>
                                                                Price:{" "}
                                                                <span className="smr_currencyFont">
                                                                    {loginUserDetail?.CurrencyCode ?? storeInit?.CurrencyCode}
                                                                </span>
                                                                <span> {val?.price}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

export default SearchData