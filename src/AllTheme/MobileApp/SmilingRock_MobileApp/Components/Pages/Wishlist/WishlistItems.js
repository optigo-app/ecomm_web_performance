import React, { useEffect, useState } from "react";
import "./smrMo_wishlist.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useSetRecoilState } from "recoil";
import noImageFound from "../../Assets/image-not-found.jpg";
import { smrMA_CartCount, smrMA_WishCount } from "../../Recoil/atom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import { Skeleton } from "@mui/material";

const WishlistItems = ({
  item,
  itemInCart,
  updateCount,
  countDataUpdted,
  itemsLength,
  currency,
  decodeEntities,
  WishCardImageFunc,
  handleRemoveItem,
  handleWishlistToCart,
  handleMoveToDetail,
}) => {
  const [imageSrc, setImageSrc] = useState();
  const setWishCountVal = useSetRecoilState(smrMA_WishCount);
  const setCartCountVal = useSetRecoilState(smrMA_CartCount);
  const visiterId = "";

  const handleWishlistToCartFun = async (item) => {
    const returnValue = await handleWishlistToCart(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setCartCountVal(res?.cartcount);
      });
    }
  };

  const handleRemoveItemFun = async (item) => {
    const returnValue = await handleRemoveItem(item);
    if (returnValue?.msg == "success") {
      GetCountAPI(visiterId).then((res) => {
        setWishCountVal(res?.wishcount);
      });
    }
  };

  useEffect(() => {
    if (item?.ImageCount > 0) {
      WishCardImageFunc(item).then((src) => {
        setImageSrc(src);
      });
    } else {
      setImageSrc(noImageFound);
    }
  }, [item]);

  return (
    <Grid
      sx={{ paddingLeft: "12px !important", paddingTop: "10px !important" }}
      item
      xs={itemsLength !== 1 ? 6 : 12}
      sm={itemsLength !== 1 ? 6 : 12}
      md={itemsLength <= 2 ? 6 : 4}
      lg={itemsLength <= 2 ? 6 : 3}
    >
      <Card className="smrMo_WlListCard">
        <div className="cardContent">
          {imageSrc === undefined ? (
            <CardMedia style={{ width: "100%" }} className="roop_WlListImage">
              <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={280}
                sx={{
                  backgroundColor: "#e8e8e86e",
                  "@media (max-width: 600px)": {
                    height: 200,
                  },
                  "@media (max-width: 960px)": {
                    height: 240,
                  },
                }}
              />
            </CardMedia>
          ) : (
            <CardMedia
              component="img"
              image={imageSrc}
              alt={item?.TitleLine}
              className="smrMo_WlListImage"
              onClick={() => handleMoveToDetail(item)}
            />
          )}
   
     <Informationtab item={item} decodeEntities={decodeEntities} currency={currency}/>
     {/* <OldInformationtab item={item} decodeEntities={decodeEntities} currency={currency}/> */}
          <div className="smrMo_Wl-CartbtnDiv">
            <button
              className="smrMo_Wl-Cartbtn"
              onClick={() => handleWishlistToCartFun(item)}
            >
              {item?.IsInCart !== 1 ? "Add to cart +" : "in cart"}
            </button>
          </div>
        </div>
        <div
          className="closeWlIconDiv"
          onClick={(e) => handleRemoveItemFun(item)}
        >
          <CloseIcon className="closeWlIcon" />
        </div>
      </Card>
    </Grid>
  );
};

export default WishlistItems;



const Informationtab = ({item,decodeEntities,  currency})=>{
  return <>
       <div className="card_content_mapp">
          <div className="price_mapp_sec">
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypeName !== "" && (
                                    <span>{item?.metaltypename}</span>
                                )}
                                {' / '}
                                <span className="smrMo_currencyFont" dangerouslySetInnerHTML={{
                                    __html: decodeEntities(currency),
                                }} />
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.UnitCost).toFixed(3)}</span>
                                )}
                            </div>
            <div className="title_mapp_sec">
              {item?.designno != "" && item?.designno}
              {item?.TitleLine != "" && " - " + item?.TitleLine}
            </div>
            <div className="two_col_grid_mapp">
                <div className="col">NWT : {(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</div>
                <div className="col">GWT : {(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</div>
                <div className="col">DWT : {(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</div>
                <div className="col">CWT : {(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</div>
            </div>
        

          </div>
  </>
}


const OldInformationtab = ({item ,decodeEntities ,currency})=>{
  return <>
         <CardContent className='smrMo_cardContent'>
                        <div className='cardText'>
                            <Typography variant="body2" className='smrMo_card-ContentData smrMo_WlTitleline'>
                                {item?.designno != "" && item?.designno}{item?.TitleLine != "" && " - " + item?.TitleLine}
                            </Typography>
                            <Typography variant="body2" className='smrMo_card-ContentData'>
                                <span className='smrMo_wishDT'>NWT : </span>
                                <span className='smrMo_wishDT'>{(item?.Nwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                                <span className='smrMo_pipe'> | </span>
                                <span className='smrMo_wishDT'>GWT: </span>
                                <span className='smrMo_wishDT'>{(item?.Gwt || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='smrMo_pipe'>  </span> <br/>
                                <span className='smrMo_wishDT'>DWT: </span>
                                <span>{(item?.Dwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.Dpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}</span>
                                <span className='smrMo_pipe'> | </span>
                                <span className='smrMo_wishDT'>CWT: </span>
                                <span>{(item?.CSwt || 0).toFixed(3)?.replace(/\.?0+$/, '')} / {(item?.CSpcs || 0).toFixed(3)?.replace(/\.?0+$/, '')}{' '}</span>
                            </Typography>
                            <Typography variant="body2" className='smrMo_card-ContentData'>
                                {item?.metalcolorname !== "" && (
                                    <span>{item.metalcolorname}</span>
                                )}
                                {item?.metalcolorname !== "" && item?.metaltypename !== "" && (
                                    <span> - </span>
                                )}
                                {item?.metaltypeName !== "" && (
                                    <span>{item?.metaltypename}</span>
                                )}
                                {' / '}
                                <span className="smrMo_currencyFont" dangerouslySetInnerHTML={{
                                    __html: decodeEntities(currency),
                                }} />
                                {' '}
                                {item?.UnitCost !== "" && (
                                    <span>{(item?.UnitCost).toFixed(3)}</span>
                                )}
                            </Typography>

                        </div>
                        <div className='designNoWlList'>
                            <p className='smrMo_DesignNoTExt'>{item?.designno}</p>
                        </div> 
          </CardContent>
  </>
}