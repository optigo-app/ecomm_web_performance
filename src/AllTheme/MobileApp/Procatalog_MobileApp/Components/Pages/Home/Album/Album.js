import React, { useEffect, useState } from "react";
import "./Album.modul.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import imageNotFound from "../../../Assets/image-not-found.jpg";
import { Box, Modal } from "@mui/material";
import AlbumSkeleton from "./AlbumSkeleton/AlbumSkeleton";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PC_ApploginState } from "../../../Recoil/atom";
import { Get_Procatalog } from "../../../../../../../utils/API/Home/Get_Procatalog/Get_Procatalog";

const Album = () => {
  const [albumData, setAlbumData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageStatus, setImageStatus] = useState({});
  const [imageStatusModel, setImageStatusModel] = useState({});
  const [fallbackImages, setFallbackImages] = useState({});
  const [designSubData, setDesignSubData] = useState([]);
  const [openAlbumName, setOpenAlbumName] = useState("");
  const [isLoding, setIsLoding] = useState(true);
  const [imagesReady, setImagesReady] = useState(false);
  const navigate = useNavigate();
  const [islogin, setISLoginSet] = useRecoilState(PC_ApploginState);
  const [open, setOpen] = useState(false);
  const storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [selectedImage, setSelectedImage] = useState("");


  useEffect(() => {
    setImageUrl(storeinit?.AlbumImageFol || "");
  }, []);

  useEffect(() => {
    const checkImages = async () => {
      const status = {};
      for (const data of designSubData) {
        const imageUrlI = `${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`;
        const available = await checkImageAvailability(imageUrlI);
        status[imageUrlI] = available;
      }
      setImageStatusModel(status);
    };

    checkImages();
  }, [designSubData, imageUrl]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
      const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
      const visiterID = Cookies.get("visiterId");
      const queryParams = new URLSearchParams(window.location.search);
      const ALCVAL = queryParams.get('ALC');
      const finalID = storeInit?.IsB2BWebsite === 0 ? (islogin ? loginUserDetail?.id || "0" : visiterID) : loginUserDetail?.id || "0";

      if (ALCVAL) {
        sessionStorage.setItem('ALCVALUE', ALCVAL);
        await fetchAndSetAlbumData(ALCVAL, finalID);
      } else {
        const storedALCValue = JSON.parse(sessionStorage.getItem('ALCVALUE')) ?? "";
        await fetchAndSetAlbumData(storedALCValue, finalID);
      }
    };

    fetchAlbumData();
  }, [islogin]);


  const fetchAndSetAlbumData = async (value, finalID) => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    
    if (!storeInit) {
      setTimeout(() => fetchAndSetAlbumData(value, finalID), 500);
      return;
    }
    try {
      const response = await Get_Procatalog("GETProcatalog", finalID, value);
      if (response?.Data?.rd) {
        const albums = response.Data.rd;
        setAlbumData(albums);
        setImagesReady(true);
        const status = {};
        const fallbackImages = {};
        for (const data of albums) {
          const fullImageUrl = `${storeInit?.AlbumImageFol}${data?.AlbumImageFol}/${data?.AlbumImageName}`;
          let imageAvailable;
          if(data?.AlbumImageName !== ""){
            imageAvailable = await checkImageAvailability(fullImageUrl);
          }else{
            imageAvailable = false;
          }
          if (!imageAvailable && data?.AlbumDetail) {
            const albumDetails = JSON.parse(data.AlbumDetail);
            albumDetails.forEach((detail) => {
              if (detail?.Designdetail) {
                const designDetails = JSON.parse(detail.Designdetail);
                designDetails.forEach((design) => {
                  if (design.ImageCount > 1) {
                    // const fallbackImage = `${storeInit?.DesignImageFol}${design.designno}_1.${design.ImageExtension}`;
                    const fallbackImage = `${storeInit?.CDNDesignImageFol}${design.designno}~1.${design.ImageExtension}`;
                    fallbackImages[fullImageUrl] = fallbackImage;
                  }
                });

              }
            });
          }
          status[fullImageUrl] = imageAvailable;
        }
        setImageStatus(status);
        setFallbackImages(fallbackImages);
        setIsLoding(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleNavigate = (data) => {
    const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;

    if (data?.IsDual === 1) {
      const Newdata = JSON.parse(data?.AlbumDetail || '[]');
      let finalNewData = Newdata?.map((data) => {
        if (data?.AlbumImageName) {
          let imgLink = storeinit?.AlbumImageFol + data?.AlbumImageFol + '/' + data?.AlbumImageName;
          return { ...data, imageKey: imgLink }
        } else {
          let data1 = JSON.parse(data?.Designdetail);

          let finalImg = data1?.map((data) => {
            if (data?.ImageCount > 0 && data?.ImageExtension !== '') {
              let imgLink = storeinit?.CDNDesignImageFol + data?.designno + "~" + '1' + "." + data?.ImageExtension;
              if (checkImageAvailability(imgLink)) {
                return imgLink ;
              }
            }
          })?.find(item => item !== undefined);
          let finalImgData = finalImg ?? imageNotFound;
          return { ...data, imageKey: finalImgData }
        }
      })
      handleOpen();
      setDesignSubData(finalNewData);
      setOpenAlbumName(data?.AlbumName);
    } else {
      if(islogin || data?.AlbumSecurityId === 0){
        navigate(url);
      }else{
        localStorage.setItem('redirectURLLocal', url)
        navigate('/signin');
      }
    }
  };

  const handleNavigateSub = (data) => {
    const url = `/p/${encodeURIComponent(data?.AlbumName)}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;
    sessionStorage.setItem('redirectURL', url)
    if(islogin || data?.AlbumSecurityId === 0){
      navigate(url);
    }else{
      localStorage.setItem('redirectURLLocal', url)
      navigate('/signin');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!imagesReady) {
    return <AlbumSkeleton />;
  }


  return (
    <div className="proCatApp_alubmMainDiv">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            height: "650px",
            display: "flex",
            border: 'none',
            outline: 'none',
            flexDirection: 'column',
            p: 4,
          }}
          className="proCatApp_album_box_main"
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          <p
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              zIndex: 1,
              margin: '0px',
              fontWeight: 500
            }}
            className="pro_pressESCClose"
          >
            Press ESC To Close
          </p>
          <div>
            <p style={{ fontWeight: 500, textDecoration: 'underline', textAlign: 'center' }}>{openAlbumName}</p>
          </div>
          <div className="proCatApp_model_overFlow" style={{ display: "flex", flexWrap: 'wrap', overflow: 'scroll' }}>
            {designSubData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="proCatApp_AlbumImageMainPopup"
                  onClick={() => handleNavigateSub(data)}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={data?.imageKey}
                      className="proCatApp_AlbumImageMainPopup_img"
                      alt={openAlbumName}
                    />
                    {islogin || data?.AlbumSecurityId === 0 ? (
                      ""
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        className="proCatApp_AlbumLockIcone_popup lock_icon"
                      >
                        <path
                          d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"
                          fill="#000000"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <p className="proCatApp_albumName">{data?.AlbumName}</p>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
      <p className="proCatApp_albumTitle">ALBUMS</p>
      <div className="proCatApp_albumALL_div" style={{ minHeight: !albumData.length && '600px' }}>
        {albumData.map((data, index) => {
          let imgSrc = imageNotFound; 
          let isImageFound = false;
      
          if (data.AlbumImageName && data.AlbumImageFol) {
              imgSrc = `${storeinit?.AlbumImageFol}${data?.AlbumImageFol}/${data?.AlbumImageName}`;
              isImageFound = true; 
          }
      
          if (!isImageFound && data.AlbumDetail) {
              const albumDetails = JSON.parse(data.AlbumDetail);
              albumDetails.forEach((detail) => {
                  if (detail?.Designdetail) {
                      const designDetails = JSON.parse(detail.Designdetail);
                      designDetails.some((design) => {
                          if (design.ImageCount > 0) {
                              imgSrc = `${storeinit?.CDNDesignImageFol}${design.designno}~1.${design.ImageExtension}`;
                              isImageFound = true;  // Break the loop after finding the first valid image
                              return true;
                          }
                          return false;
                      });
                  }
              });
          }
           
           if (!isImageFound) {
             imgSrc = imageNotFound;
           }

          return (
            <div
              key={index}
              className="smr_AlbumImageMain"
              onClick={() => handleNavigate(data)}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={imgSrc}
                  className="smr_AlbumImageMain_img"
                  alt={data?.AlbumName}
                  onError={(e)=>{
                    e.target.src = imageNotFound ;
                  }}
                />
                {islogin || data?.AlbumSecurityId === 0 ? (
                  ""
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000000"
                    className="proCatApp_AlbumLockIcone lock_icon"
                  >
                    <path
                      d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"
                      fill="#000000"
                    ></path>
                  </svg>
                )}
              </div>
              <div style={{ marginTop: "3px" }}>
                <p className="proCatApp_albumName">{data?.AlbumName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Album;