import React, { useEffect, useState } from 'react'
import './Lookbook.modul.scss'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';
import ProductListApi from '../../../../../../utils/API/ProductListAPI/ProductListApi';
import { FilterListAPI } from '../../../../../../utils/API/FilterAPI/FilterListAPI';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';
import Cookies from 'js-cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import imageNotFound from '../../../Assets/image-not-found.jpg';
import { LookBookAPI } from '../../../../../../utils/API/FilterAPI/LookBookAPI';
import { CartAndWishListAPI } from '../../../../../../utils/API/CartAndWishList/CartAndWishListAPI';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { RemoveCartAndWishAPI } from '../../../../../../utils/API/RemoveCartandWishAPI/RemoveCartAndWishAPI';
import { proCat_CartCount, proCat_loginState } from '../../../Recoil/atom';

const Lookbook = () => {

    let location = useLocation();
    const [imageUrl, setImageUrl] = useState();
    const [imageUrlDesignSet, setImageUrlDesignSet] = useState();

    const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    const [designSetLstData, setDesignSetListData] = useState();
    const [filterData, setFilterData] = useState([])
    const [filterChecked, setFilterChecked] = useState({})
    const [afterFilterCount, setAfterFilterCount] = useState();
    const [selectedMetalId, setSelectedMetalId] = useState(loginUserDetail?.MetalId ?? "");
    const [selectedDiaId, setSelectedDiaId] = useState(loginUserDetail?.cmboDiaQCid ?? "");
    const [selectedCsId, setSelectedCsId] = useState(loginUserDetail?.cmboCSQCid ?? "");
    const [productListData, setProductListData] = useState([]);
    const [locationKey, setLocationKey] = useState()
    const islogin = useRecoilValue(proCat_loginState);
    const setCartCountVal = useSetRecoilState(proCat_CartCount)
    const [storeInit, setStoreInit] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeinit)

        let data = JSON.parse(sessionStorage.getItem('storeInit'));
        setImageUrl(data?.DesignSetImageFol);
        setImageUrlDesignSet(data?.DesignImageFol);

        const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { IsB2BWebsite } = storeInit;
        const visiterID = Cookies.get('visiterId');
        let finalID;
        if (IsB2BWebsite == 0) {
            finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
        } else {
            finalID = loginUserDetail?.id || '0';
        }

        Get_Tren_BestS_NewAr_DesigSet_Album('GETDesignSet_List', finalID)
            .then((response) => {
                if (response?.Data?.rd) {
                    setDesignSetListData(response?.Data?.rd);

                    const initialCartItems = response?.Data?.rd.flatMap(slide =>
                        parseDesignDetails(slide?.Designdetail)
                            .filter(detail => detail?.IsInCart === 1)
                            .map(detail => detail.autocode)
                    );
                    setCartItems(prevCartItems => [...new Set([...prevCartItems, ...initialCartItems])]); // Use Set to avoid duplicates
                }
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            let productlisttype = {
                FilterKey: 'GETDesignSet_List',
                FilterVal: 'GETDesignSet_List'
            }

            await LookBookAPI(productlisttype).then((res) => {
                setFilterData(res)
            }).catch((err) => console.log("err", err))
        }
        fetchData();
    }, [])

    const handelFilterClearAll = () => {
        if (Object.values(filterChecked).filter(ele => ele.checked)?.length > 0) { setFilterChecked({}) }
    }

    const handleCheckboxChange = (e, listname, val) => {
        const { name, checked } = e.target;
        setFilterChecked((prev) => ({
            ...prev,
            [name]: { checked, type: listname, id: name?.replace(/[a-zA-Z]/g, ''), value: val }
        }))
    }

    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.DefaultImageName) {
            finalprodListimg = imageUrl + pd?.designsetuniqueno + '/' + pd?.DefaultImageName;
        } else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg;
    };

    const parseDesignDetails = (details) => {
        try {
            return JSON.parse(details);
        } catch (error) {
            console.error("Error parsing design details:", error);
            return [];
        }
    }

    const [selectedCategory, setSelectedCategory] = useState('Ring');
    let cookie = Cookies.get('visiterId')

    const handleAddToCart = (ele, type) => {
        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));

        let prodObj = {
            "autocode": ele?.autocode,
            "Metalid": loginInfo?.MetalId,
            "MetalColorId": ele?.MetalColorid,
            "DiaQCid": loginInfo?.cmboDiaQCid,
            "CsQCid": loginInfo?.cmboCSQCid,
            "Size": ele?.DefaultSize,
            "Unitcost": ele?.UnitCost,
            "markup": ele?.DesignMarkUp,
            "UnitCostWithmarkup": ele?.UnitCostWithMarkUp,
            "Remark": ""
        }

        setCartItems(prevCartItems => [...prevCartItems, ele?.autocode]);

        CartAndWishListAPI(type, prodObj, cookie).then((res) => {
            let cartC = res?.Data?.rd[0]?.Cartlistcount
            setCartCountVal(cartC);
        }).catch((err) => console.log("err", err))
    }

    const handleRemoveCart = async (ele) => {
        try {
            const res = await RemoveCartAndWishAPI("Cart", ele?.autocode, cookie);
            let cartC = res?.Data?.rd[0]?.Cartlistcount;
            setCartCountVal(cartC);
    
            // Use a callback to update the state
            setCartItems(prevCartItems => {
                const updatedCartItems = prevCartItems.filter(item => item !== ele?.autocode);
                return updatedCartItems;
            });
        } catch (err) {
            console.log("Error removing from cart", err);
        }
    };

    // const handleCategoryChange = (e) => {
    //     setSelectedCategory(e.target.value);
    // };

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const createProdObj = (ele, loginInfo) => {
        return {
            "autocode": ele?.autocode,
            "Metalid": loginInfo?.MetalId ?? '',
            "MetalColorId": ele?.MetalColorid,
            "DiaQCid": loginInfo?.cmboDiaQCid,
            "CsQCid": loginInfo?.cmboCSQCid,
            "Size": ele?.DefaultSize,
            "Unitcost": ele?.UnitCost,
            "markup": ele?.DesignMarkUp,
            "UnitCostWithmarkup": ele?.UnitCostWithMarkUp,
            "Remark": ""
        };
    }


    const handleByCombo = (data) => {
        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        let prodObjs = data.map(detail => createProdObj(detail, loginInfo));
        setCartItems(prevItems => [...prevItems, ...data.map(detail => detail.autocode)]);
        CartAndWishListAPI("Cart", prodObjs, cookie, "look").then((res) => {
            let cartC = res?.Data?.rd[0]?.Cartlistcount
            setCartCountVal(cartC);
        }).catch((err) => console.log("err", err))
    }

    return (
        <div className='ProCat_LookBookMain'>
            <div className='smr_LookBookSubMainDiv'>
                <div className="smr_lookbookFilterMain">
                    {filterData?.length > 0 && <div className="smr_LookBookFilterSub">
                        <span className="smr_filter_text">
                            <span>
                                {Object.values(filterChecked).filter(
                                    (ele) => ele.checked
                                )?.length === 0
                                    ? "Filters"
                                    : `Product Found: ${afterFilterCount}`}
                            </span>
                            <span onClick={() => handelFilterClearAll()}>
                                {Object.values(filterChecked).filter(
                                    (ele) => ele.checked
                                )?.length > 0
                                    ? "Clear All"
                                    : ""}
                            </span>
                        </span>
                        <div style={{ marginTop: "12px" }}>
                            {filterData?.map((ele) => (
                                <>
                                    {(!(ele?.id)?.includes("Range") && !(ele?.id)?.includes("Price")) && (
                                        <Accordion
                                            elevation={0}
                                            sx={{
                                                borderBottom: "1px solid #c7c8c9",
                                                borderRadius: 0,
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
                                                    <ExpandMoreIcon sx={{ width: "20px" }} />
                                                }
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                sx={{
                                                    color: "#7f7d85",
                                                    borderRadius: 0,

                                                    "&.MuiAccordionSummary-root": {
                                                        padding: 0,
                                                    },

                                                }}
                                                className="filtercategoryLable"
                                            >
                                                {ele.Name}
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "4px",
                                                    minHeight: "fit-content",
                                                    maxHeight: "300px",
                                                    overflow: "auto",
                                                }}
                                            >
                                                {(JSON.parse(ele?.options) ?? []).map((opt) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: "12px",
                                                        }}
                                                        key={opt?.id}
                                                    >
                                                       
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name={`${ele?.id}${opt?.id}`}
                                                                    checked={
                                                                        filterChecked[`${ele?.id}${opt?.id}`]?.checked ===
                                                                            undefined
                                                                            ? false
                                                                            : filterChecked[`${ele?.id}${opt?.id}`]?.checked
                                                                    }
                                                                    style={{
                                                                        color: "#7f7d85",
                                                                        padding: 0,
                                                                        width: "10px",
                                                                    }}
                                                                    onClick={(e) =>
                                                                        handleCheckboxChange(
                                                                            e,
                                                                            ele?.id,
                                                                            opt?.Name
                                                                        )
                                                                    }
                                                                    size="small"
                                                                />
                                                            }
                                                            className="smr_mui_checkbox_label"
                                                            label={opt.Name}
                                                        />

                                                    </div>
                                                ))}
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                </>
                            ))}
                        </div>
                    </div>}
                </div>

                <div className='smr_lookBookImgDiv'>
                    <div className='smr_lookBookImgDivMain'>
                        {designSetLstData?.map((slide, index) => (
                            <div className="smr_designSetDiv" key={index}>
                                <div style={{ display: 'flex' }}>
                                    <img
                                        className="smr_lookBookImg"
                                        loading="lazy"
                                        src={ProdCardImageFunc(slide)}
                                        alt={`Slide ${index}`}
                                    />
                                    <p className="smr_designList_title">{slide?.TitleLine}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px' }}>
                                    <p style={{ fontSize: '13px', margin: '2px' }}>DWT:{slide?.Dwt} | GWT:{slide?.Gwt}| NWT:{slide?.Nwt}</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p style={{ margin: '0px 10px 0px 0px', fontSize: '15px', fontWeight: 600 }}>  <span
                                            className="smr_currencyFont"
                                            dangerouslySetInnerHTML={{
                                                __html: decodeEntities(
                                                    storeInit?.Currencysymbol
                                                ),
                                            }}
                                        /> {slide?.UnitCostWithMarkUp}</p>
                                        <button className='smr_lookBookBuyBtn' onClick={() => handleByCombo(parseDesignDetails(slide?.Designdetail, "Cart"))}>
                                            Buy Combo
                                        </button>
                                    </div>
                                </div>
                                <div className='smr_lookBookSubImgMain'>
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        navigation={true}
                                        // pagination={{ clickable: true }}
                                        loop={true}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 0,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 0,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 0,
                                            },
                                            1240: {
                                                slidesPerView: 4,
                                                spaceBetween: 0,
                                            },
                                        }}
                                        modules={[Pagination, Navigation]}
                                        className="smr_LookBookmySwiper"
                                    >
                                        {parseDesignDetails(slide?.Designdetail)?.map((detail, subIndex) => (
                                            <div className='smr_lookBookSubImageDiv'>
                                                <SwiperSlide key={subIndex} className='smr_lookBookSliderSubDiv' style={{ marginRight: '0px' }}>
                                                    {detail?.IsInReadyStock == 1 && (
                                                        <span className="smr_LookBookinstock">
                                                            In Stock
                                                        </span>
                                                    )}
                                                    <img
                                                        key={subIndex}
                                                        className="smr_lookBookSubImage"
                                                        loading="lazy"
                                                        src={`${imageUrlDesignSet}${detail?.designno}_1.${detail?.ImageExtension}`}
                                                        alt={`Sub image ${subIndex} for slide ${index}`}
                                                    />
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                                                    {cartItems.includes(detail?.autocode) ? (
                                                    <button className='smr_lookBookINCartBtn' onClick={() => handleRemoveCart(detail)}>REMOVE CART</button>
                                                ) : (
                                                    <button className='smr_lookBookAddtoCartBtn' onClick={() => handleAddToCart(detail)}>ADD TO CART</button>
                                                )}
                                                    </div>
                                                </SwiperSlide>
                                            </div>

                                        )
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <p style={{
                    paddingBlock: '30px',
                    margin: '0px',
                    textAlign: 'center',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '1px'
                }} onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })}>BACK TO TOP</p>
            </div>
        </div>
    )
}

export default Lookbook