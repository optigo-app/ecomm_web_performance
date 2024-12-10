import { useState, useEffect } from 'react';
import { fetchWishlistDetails } from '../../API/WishlistAPI/WishlistAPI';
import { removeFromCartList } from '../../API/RemoveCartAPI/RemoveCartAPI';
import { handleWishlistToCartAPI } from '../../API/WishList_Cart/WishlistToCart';
import imageNotFound from "../../../AllTheme/SmilingRock/Components/Assets/image-not-found.jpg"
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartCount, WishCount, loginState } from "../../../AllTheme/SmilingRock/Components/Recoil/atom";
import { GetCountAPI } from '../../API/GetCount/GetCountAPI';
import pako from 'pako';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { DiamondListData } from '../../API/DiamondStore/DiamondList';
import { for_MatchDiamonds, for_filterDiamond } from '../../../AllTheme/Forevery/Components/Recoil/atom';

const Usewishlist = () => {
  const navigate = useNavigate();
  const [isWLLoading, setIsWlLoading] = useState(false);
  const [updateCount, setUpdateCount] = useState();
  const [itemInCart, setItemInCart] = useState();
  const [storeInit, setStoreInit] = useState();
  const [countData, setCountData] = useState();
  const [CurrencyData, setCurrencyData] = useState();
  const [wishlistData, setWishlistData] = useState([]);
  const [diamondWishData, setDiamondWishData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [countDataUpdted, setCountDataUpdated] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [metalColorCombo, setMetalColorCombo] = useState([]);
  const matchDataSet = useRecoilValue(for_MatchDiamonds)
  const filterDia = useRecoilValue(for_filterDiamond)

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const storedData = JSON.parse(sessionStorage.getItem("loginUserDetail"));
    setStoreInit(storeInit)
    if (storeInit?.IsB2BWebsite != 0) {
      setCurrencyData(storedData?.CurrencyCode)
    } else {
      setCurrencyData(storeInit?.CurrencyCode)
    }
  }, [])

  useEffect(() => {
    // const metalTypeData = JSON.parse(sessionStorage.getItem('metalTypeCombo'));
    const metalColorData = JSON.parse(sessionStorage.getItem('MetalColorCombo'));
    // const diamondQtyColorData = JSON.parse(sessionStorage.getItem('diamondQualityColorCombo'));
    // const CSQtyColorData = JSON.parse(sessionStorage.getItem('ColorStoneQualityColorCombo'));
    // setMetalTypeCombo(metalTypeData);
    setMetalColorCombo(metalColorData);
    // setDiamondQualityColorCombo(diamondQtyColorData);
    // setColorStoneCombo(CSQtyColorData);
  }, [])


  const getWishlistData = async () => {
    const visiterId = Cookies.get('visiterId');
    setIsWlLoading(true);
    try {
      const response = await fetchWishlistDetails(visiterId);
      if (response?.Data?.rd[0]?.stat != 0) {
        let diamondData = response?.Data?.rd1;
        setWishlistData(response?.Data?.rd);
        setIsWlLoading(false);

        if (diamondData?.length != 0) {
          const solStockNos = diamondData?.map(item => item?.Sol_StockNo);
          const commaSeparatedString = solStockNos?.join(',');
          if (commaSeparatedString != null || commaSeparatedString != undefined) {
            getDiamondData(commaSeparatedString)
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDiamondData = async (commaSeparatedString) => {
    setIsWlLoading(true);
    try {
      const response = await DiamondListData(1, "", commaSeparatedString);
      if (response && response.Data) {
        let resData = response.Data?.rd
        setDiamondWishData(resData)
        setIsWlLoading(false)
      } else {
        console.warn("No data found in the response");
        setIsWlLoading(false)
      }
    } catch (error) {
      console.error("Error fetching diamond data:", error);
      setIsWlLoading(false);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, []);


  // remove
  const handleRemoveItem = async (item, isdiamond) => {
    console.log('isdiamond: ', isdiamond);
    const visiterId = Cookies.get('visiterId');
    let param = "wish";
    setWishlistData(wishlistData.filter(cartItem => cartItem.id !== item.id));
    setDiamondWishData(diamondWishData?.filter(diaItem =>
      !matchDataSet.some((diamond) => diamond?.stockno === diaItem?.stockno)
    ))
    if (isdiamond !== "") {
      setDiamondWishData(diamondWishData?.filter(diaItem =>
        !filterDia.some((diamond) => diamond?.stockno === diaItem?.stockno)
      ))
    }
    try {
      const response = await removeFromCartList(item, param, visiterId, isdiamond);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg == "success") {
        return resStatus;
      } else {
        console.log('Failed to remove product or product not found');
      }
    } catch (error) {
      console.error("Error:", error);
      setUpdateCount(false);
    }
  };

  const handleRemoveAll = async () => {
    const visiterId = Cookies.get('visiterId');
    let param = "wish";
    try {
      const response = await removeFromCartList('IsDeleteAll', param, visiterId);
      let resStatus = response.Data.rd[0];
      if (resStatus?.msg == "success") {
        setWishlistData([]);
        setDiamondWishData([]);
        return resStatus;
      } else {
        console.log('Failed to remove all products or products not found');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // add to cart
  const handleWishlistToCart = async (item) => {
    const visiterId = Cookies.get('visiterId');
    let param = "";
    if (item?.IsInCart !== 1) {
      try {
        const response = await handleWishlistToCartAPI(param, item, visiterId);
        let resStatus = response?.Data?.rd[0];

        if (resStatus?.msg === "success") {
          const updatedWishlistData = wishlistData.map(wish =>
            wish.id === item.id ? { ...wish, IsInCart: 1 } : wish
          );
          setWishlistData(updatedWishlistData);
        }
        return resStatus;
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.info(<Toast />, {
        hideProgressBar: true,
        style: {
          borderRadius: "4px",
          padding: '-2px 45px',
          boxShadow: `rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px`,
          border: "2px solid white"
        },
      })
    }
  };
  // Already in cart


  // add to cart all
  const handleAddtoCartAll = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    const visiterId = Cookies.get('visiterId');
    let param = "isSelectAll";
    let resStatus;

    try {
      const allItemsInCart = wishlistData.every(item => item.IsInCart === 1);
      if (!allItemsInCart) {
        try {
          const response = await handleWishlistToCartAPI(param, {}, visiterId);
          resStatus = response?.Data?.rd[0];
          if (resStatus?.msg === "success") {
            getWishlistData();
          }
        } catch (error) {
          console.error("Error:", error);
          return { success: false };
        }
      } else {
        console.log('Already in cart');
      }

      return resStatus;
    } catch (error) {
      setUpdateCount(false);
      console.error("Error:", error);
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };



  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // const WishCardImageFunc = (pd) => {
  //   return new Promise((resolve) => {
  //     let finalprodListimg;
  //     const mtcCode = metalColorCombo?.find(option => option?.metalcolorname === pd?.metalcolorname);
  //     if (pd?.ImageCount > 0) {
  //       finalprodListimg = `${storeInit?.DesignImageFol}${pd?.designno}_1_${mtcCode?.colorcode}.${pd?.ImageExtension}`;
  //       const img = new Image();
  //       img.src = finalprodListimg;

  //       img.onload = () => {
  //         resolve(finalprodListimg);
  //       };
  //       img.onerror = () => {
  //         finalprodListimg = `${storeInit?.DesignImageFol}${pd?.designno}_1.${pd?.ImageExtension}`;
  //         resolve(finalprodListimg);
  //       };
  //     } else {
  //       finalprodListimg = imageNotFound;
  //       resolve(finalprodListimg);
  //     }
  //   });
  // };

  const WishCardImageFunc = (pd) => {
    return new Promise((resolve) => {
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
        });
      };

      const mtcCode = metalColorCombo?.find(option => option?.metalcolorname === pd?.metalcolorname);
      let primaryImage, secondaryImage;

      if (pd?.ImageCount > 0) {
        primaryImage = `${storeInit?.CDNDesignImageFol}${pd?.designno}~1~${mtcCode?.colorcode}.${pd?.ImageExtension}`;
        secondaryImage = `${storeInit?.CDNDesignImageFol}${pd?.designno}~1.${pd?.ImageExtension}`;
      } else {
        primaryImage = secondaryImage = imageNotFound;
      }
      // if (pd?.ImageCount > 0) {
      //   primaryImage = `${storeInit?.DesignImageFol}${pd?.designno}_1_${mtcCode?.colorcode}.${pd?.ImageExtension}`;
      //   secondaryImage = `${storeInit?.DesignImageFol}${pd?.designno}_1.${pd?.ImageExtension}`;
      // } else {
      //   primaryImage = secondaryImage = imageNotFound;
      // }

      loadImage(primaryImage)
        .then((imgSrc) => {
          resolve(imgSrc);
        })
        .catch(() => {
          loadImage(secondaryImage)
            .then((imgSrc) => {
              resolve(imgSrc);
            })
            .catch(() => {
              resolve(imageNotFound);
            });
        });
    });
  };


  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = pako.deflate(uint8Array, { to: 'string' });


      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
      return null;
    }
  };

  const handleMoveToDetail = (wishtData) => {
    let obj = {
      a: wishtData?.autocode,
      b: wishtData?.designno,
      m: wishtData?.metaltypeid,
      d: `${wishtData?.diamondqualityid}${","}${wishtData?.diamondcolorid}`,
      c: `${wishtData?.colorstonequalityid}${","}${wishtData?.colorstonecolorid}`,
      f: {},
      g: [["", ""], ["", "", ""]],
    }
    compressAndEncode(JSON.stringify(obj))
    let encodeObj = compressAndEncode(JSON.stringify(obj))
    navigate(`/d/${wishtData?.TitleLine?.replace(/\s+/g, `_`)}${wishtData?.TitleLine?.length > 0 ? "_" : ""}${wishtData?.designno}?p=${encodeObj}`)
  }

  //browse our collection

  const handelMenu = () => {
    let menudata = JSON.parse(sessionStorage.getItem('menuparams'));
    if (menudata) {
      const queryParameters1 = [
        menudata?.FilterKey && `${menudata?.FilterVal}`,
        menudata?.FilterKey1 && `${menudata?.FilterVal1}`,
        menudata?.FilterKey2 && `${menudata?.FilterVal2}`,
      ].filter(Boolean).join('/');

      const queryParameters = [
        menudata?.FilterKey && `${menudata?.FilterVal}`,
        menudata?.FilterKey1 && `${menudata?.FilterVal1}`,
        menudata?.FilterKey2 && `${menudata?.FilterVal2}`,
      ].filter(Boolean).join(',');

      const otherparamUrl = Object.entries({
        b: menudata?.FilterKey,
        g: menudata?.FilterKey1,
        c: menudata?.FilterKey2,
      })
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => value)
        .filter(Boolean)
        .join(',');

      // const paginationParam = [
      //   `page=${menudata.page ?? 1}`,
      //   `size=${menudata.size ?? 50}`
      // ].join('&');

      let menuEncoded = `${queryParameters}/${otherparamUrl}`;
      const url = `/p/${menudata?.menuname}/${queryParameters1}/?M=${btoa(
        menuEncoded
      )}`;
      navigate(url)
    } else {
      navigate("/")
    }
  }

  return {
    isWLLoading,
    wishlistData,
    diamondWishData,
    CurrencyData,
    updateCount,
    itemInCart,
    updateCount,
    countDataUpdted,
    decodeEntities,
    WishCardImageFunc,
    handleRemoveItem,
    handleRemoveAll,
    handleWishlistToCart,
    handleAddtoCartAll,
    handleMoveToDetail,
    handelMenu
  };
};

export default Usewishlist;
const Toast = () => (
  <div className="cust_hoq_toast">
    <div className="right">Already in Cart.</div>
  </div>
);