import React, { useEffect, useRef, useState } from "react";
import "./Category.modul.scss";
import { diamondShapes } from "../../../Constants/CategoryList";
import { Hoq_loginState } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { noimage } from "../../../Constants/noimage";

const CategoryTab = () => {
  const [albumData, setAlbumData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(Hoq_loginState);
  const showShapeSection = false;
  const productRefs = useRef({});

  useEffect(() => {
    let data = JSON.parse(sessionStorage?.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);

    const loginUserDetail = JSON.parse(
      sessionStorage?.getItem("loginUserDetail")
    );
    const storeInit = JSON.parse(sessionStorage?.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    const sHOPBYCATEGORY = async () => {
      Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
        .then((response) => {
          if (response?.Data?.rd) {
            setAlbumData(response?.Data?.rd);
          }
        })
        .catch((err) => console.log(err));
    };
    sHOPBYCATEGORY();
  }, []);

  const handleNavigate = (name, index) => {
    sessionStorage.setItem('scrollToProduct3', `product-${index}`);
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  };

  useEffect(() => {
    const scrollDataStr = sessionStorage.getItem('scrollToProduct3');
    if (!scrollDataStr) return;

    const maxRetries = 10;
    let retries = 0;

    const tryScroll = () => {
      const el = productRefs.current[scrollDataStr];
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        sessionStorage.removeItem('scrollToProduct3');
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(tryScroll, 200); // retry until ref is ready
      }
    };

    tryScroll();

  }, [albumData]);

  if (albumData?.length === 0) {
    return <div style={{ marginTop: "-2rem" }}></div>;
  }

  return (
    <div className="hoq_main_CategoryTab"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="header">
        <h1>Shop By Category</h1>
      </div>
      <div className="category_row">
        {albumData?.slice(0, 4)?.map((data, i) => {
          return (
            <CategoryCard
              key={i}
              src={imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName}
              onClick={() => handleNavigate(data?.AlbumName)}
              name={data?.AlbumName}
              id={`product-${i}`}
              ref={(el) => (productRefs.current[`product-${i}`] = el)}
            />
          );
        })}
        {/* <CategoryCard
              src={'http://zen/R50B3/UFS/BYJQD1FKE0ON69L2IRW4/AlbumImages/QWxidW1fMjc=/Necklace_27072024171233537.png'}
              name={"Zero 11"}
            />  <CategoryCard
            src={'http://zen/R50B3/UFS/BYJQD1FKE0ON69L2IRW4/AlbumImages/QWxidW1fMjc=/Necklace_27072024171233537.png'}
            name={"Zero 11"}
          />  */}
      </div>
      {showShapeSection && <ShapeSection />}
    </div>
  );
};

export default CategoryTab;

const ShapeSection = () => {
  return (
    <>
      <div className="header">
        <h1> Shop By Shape</h1>
      </div>
      <div className="shape_category_row">
        {diamondShapes?.map(({ img, shape }, i) => {
          return <ShapeCard key={i} img={img} shape={shape} />;
        })}
      </div>
    </>
  );
};

const CategoryCard = ({ src, onClick, name }) => {
  return (
    <div className="c_card" onClick={onClick}>
      <div className="image">
        <img
          src={src}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noimage;
          }}
          draggable={true}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <div className="title">
        <h2 className="hoq_albumName">{name}</h2>
      </div>
    </div>
  );
};

const ShapeCard = ({ img, shape }) => {
  return (
    <div className="s_card">
      <div className="image">
        <img src={img} alt="" onError={(e) => e.target.src = noimage} />
      </div>
      <div className="title">
        <h2>{shape}</h2>
      </div>
    </div>
  );
};
