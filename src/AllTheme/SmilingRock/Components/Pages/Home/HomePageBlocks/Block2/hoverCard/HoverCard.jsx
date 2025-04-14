import React, { useEffect, useState } from "react";
import './HoverCard.scss';
import { Diamond } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useMediaQuery } from "@mui/material";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Pako from "pako";
import imageNotFound from '../../../../../Assets/image-not-found.jpg';
import gradientColors from '../../../LookBook/color.json';

export default function HoverCard() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigation = useNavigate();
  const jewelryItems = [
    {
      id: 1,
      name: "Ruby Radiance Ring",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
      description: "A stunning red ruby surrounded by brilliant diamonds in a platinum setting.",
      price: "$4,250",
      color: "Red",
      thumb_image: [
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
        },
      ]
    },
    {
      id: 2,
      name: "Sapphire Hexagon Ring",
      image: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
      description: "Elegant blue sapphire in a unique hexagonal cut with diamond accents.",
      price: "$3,850",
      color: "Blue",
      thumb_image: [
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
        },
      ]
    },
    {
      id: 3,
      name: "Yellow Diamond Flower",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
      description: "Delicate flower design featuring a yellow diamond center with white diamond petals.",
      price: "$5,200",
      color: "Yellow",
      thumb_image: [
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
        },
      ]
    },
    {
      id: 4,
      name: "Green Emerald Halo",
      image: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
      description: "Vibrant green emerald surrounded by pink sapphires in a rose gold setting.",
      price: "$4,750",
      color: "Green",
      thumb_image: [
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
        },
      ]
    },
    {
      id: 5,
      name: "Diamond Butterfly Ring",
      image: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
      description: "Whimsical butterfly design crafted entirely from white diamonds.",
      price: "$3,950",
      color: "White",
      thumb_image: [
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0447-pink_colored_diamond_engagement_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/hexagon_cut_halo_diamond_three_stone_ring_1000x1000.webp?v=1734753475",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0546-flower_shaped_bezel_set_yellow_diamond_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/001-pink_and_green_diamond_halo_engagment_ring_1000x1000.webp?v=1719404705",
        },
        {
          src: "https://ourosjewels.com/cdn/shop/files/OJS0509-olive_diamond_4_clover_leaf_ring_1000x1000.webp?v=1719404705",
        },
      ]
    },
  ];

  const [designSetLstData, setDesignSetListData] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [dstCount, setDstCount] = useState(0);
  const [isProdLoading, setIsProdLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [islogin, setIsLogin] = useState(false); // Assuming recoil state is handled outside of this snippet
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrlDesignSet, setImageUrlDesignSet] = useState();
  const [imageLoadError, setImageLoadError] = useState({});
  const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
  const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
  const is600Width = useMediaQuery("(max-width: 600px)");
  const shadow = "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px";

  const handleImageError = (index) => {
    setImageLoadError((prev) => ({ ...prev, [index]: true }));
  };

  const [dataKey, seyDataKey] = useState(null);

  const handleHoverImages = (data) => {
    seyDataKey(data);
  };

  useEffect(() => {
    setIsLoading(true)
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));

    setImageUrl(storeInit?.DesignSetImageFol);
    setImageUrlDesignSet(storeInit?.CDNDesignImageFol);

    const { IsB2BWebsite } = storeInit || {};
    const visiterID = Cookies.get("visiterId");

    const finalID = IsB2BWebsite === 0
      ? (islogin === false ? visiterID : loginUserDetail?.id || "0")
      : loginUserDetail?.id || "0";

    Get_Tren_BestS_NewAr_DesigSet_Album("GETDesignSet_List", finalID, {}, currentPage, itemsPerPage)
      .then((response) => {
        if (response?.Data?.rd) {
          setDesignSetListData(response?.Data?.rd);
          setDstCount(response?.Data?.rd1[0]?.TotalCount);

          // Extract initial cart items
          const initialCartItems = response?.Data?.rd.flatMap((slide) =>
            parseDesignDetails(slide?.Designdetail)
              .filter((detail) => detail?.IsInCart === 1)
              .map((detail) => detail.autocode)
          );
          setCartItems((prevCartItems) => [
            ...new Set([...prevCartItems, ...initialCartItems]),
          ]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsProdLoading(false);
        setIsLoading(false);
      });
  }, [islogin]);

  const parseDesignDetails = (details) => {
    try {
      return JSON?.parse(details);
    } catch (error) {
      console.error("Error parsing design details:", error);
      return [];
    }
  };

  const [imageSources, setImageSources] = React.useState({});

  useEffect(() => {
    if (designSetLstData && Array.isArray(designSetLstData)) {
      const imagePromises = designSetLstData.flatMap((slide) =>
        parseDesignDetails(slide?.Designdetail).map(async (detail) => {
          const designImageUrl = `${imageUrlDesignSet}${detail?.designno}~1.${detail?.ImageExtension}`;
          return {
            designno: detail?.designno,
            src: designImageUrl,
          };
        })
      );

      Promise.all(imagePromises).then((results) => {
        const newImageSources = results.reduce((acc, { designno, src }) => {
          acc[designno] = src;
          return acc;
        }, {});

        setImageSources((prevSources) => {
          const isDifferent = Object.keys(newImageSources).some(
            (key) => newImageSources[key] !== prevSources[key]
          );
          return isDifferent ? newImageSources : prevSources;
        });
      });
    }
  }, [imageUrlDesignSet, designSetLstData]);

  const ProdCardImageFunc = (pd) => {
    let finalprodListimg;
    if (pd?.DefaultImageName) {
      finalprodListimg =
        imageUrl + pd?.designsetuniqueno + "/" + pd?.DefaultImageName;
    } else {
      finalprodListimg = 'a.jpg';
    }
    return finalprodListimg;
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

  const handleNavigation = (designNo, autoCode, titleLine) => {
    let obj = {
      a: autoCode,
      b: designNo,
      m: loginUserDetail?.MetalId ?? storeInit?.MetalId,
      d: loginUserDetail?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
      c: loginUserDetail?.cmboCSQCid ?? storeInit?.cmboCSQCid,
      f: {},
    };
    let encodeObj = compressAndEncode(JSON?.stringify(obj));
    navigate(
      `/d/${titleLine?.replace(/\s+/g, `_`)}${titleLine?.length > 0 ? "_" : ""
      }${designNo}?p=${encodeObj}`
    );
  };

  const getRandomBgColor = (index) => {
    const colorsLength = gradientColors.length;
    return gradientColors[index % colorsLength];
  };

  const [showImages, setShowImages] = useState(false);

  const handleInView = () => {
    setTimeout(() => {
      setShowImages(true);
    }, 1500);
  };


  return (
    <>
      <div className="jewelry-showcase">
        <div className="jewelry-showcase__content">
          <div className="jewelry-showcase__left">
            <div className="jewelry-showcase__icon">
              <Diamond className="icon" />
            </div>
            <h2 className="jewelry-showcase__title">
              Fancy Colored Rings & Jewelry
            </h2>
            <p className="jewelry-showcase__description">
              Discover the vibrant allure of our fancy colored diamonds rings and jewelry, where each piece is a testament
              to the beauty of color and the innovation of sustainability.
            </p>
            <button variant="contained" onClick={() => navigation(`/Lookbook`)} className="explore-button">View More</button>
          </div>

          <div className="jewelry-showcase__right">
            {designSetLstData?.slice(0, 5)?.map((designSet, index) => {
              return (
                <div
                  key={designSet.id}
                  className={`jewelry-showcase__item ${hoveredItem === designSet.id ? "hovered" : "not-hovered"}`}
                  style={{
                    width: hoveredItem === index + 1 ? '50%' : hoveredItem ? '10%' : '19.5%'
                  }}
                  onMouseEnter={() => setHoveredItem(index + 1)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="jewelry-showcase__image">
                    {(ProdCardImageFunc(designSet) && !imageLoadError[index]) ? (
                      <img
                        src={ProdCardImageFunc(designSet)}
                        alt={designSet.name}
                        onError={() => handleImageError(index)}
                        style={{
                          backgroundColor: ProdCardImageFunc(designSet) === null
                            ? "rgb(191, 200, 255)"
                            : getRandomBgColor(index),
                        }}
                        className="object-contain"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: '100%',
                          ...getRandomBgColor(index),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                      </div>
                    )}
                    <div
                      className={`jewelry-showcase__overlay ${hoveredItem === index + 1 ? "visible" : "hidden"}`}
                    >
                      <div className="overlay-content">
                        <h3 className="overlay-title">{designSet.designsetno}</h3>
                        <div className="overlay-color">
                          {(parseDesignDetails(designSet?.Designdetail))?.map((detail, subIndex) => {
                            const imageSrc = imageSources[detail?.designno] || imageNotFound;
                            return (
                              <img src={imageSrc}
                                className="thumb_image"
                                key={index}
                                alt={`Thumbnail ${index}`}
                                onClick={() =>
                                  handleNavigation(
                                    detail?.designno,
                                    detail?.autocode,
                                    detail?.TitleLine || ''
                                  )
                                } onError={(e) => {
                                  e.target.src = imageNotFound;
                                }} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "1rem", marginTop: "2rem" }}>
        <Link to={"/banner"}>Banner</Link>
        <Link to={"/diamond"}>Diamond</Link>
        <Link to={"/album"}>Album</Link>
        <Link to={"/hero"}>Hero</Link>
      </div> */}
    </>
  );
}
