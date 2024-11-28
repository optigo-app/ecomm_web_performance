import React from "react";
import "./FineJewelry.scss";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../../scss/Button.module.scss";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";

const fineJewelArr = [
  {
    index: 1,
    title1: "Lab Grown Fine",
    title2: "Jewelry",
    desc: "Forevery offers an extensive collection of stunning Fine Jewelry crafted with love to add a touch of luxury to your everyday life. From bracelets to necklaces, each piece is designed to make your special days even more memorable and your everyday special. Explore our collection today and find the perfect piece to enhance your style.",
    buttonText: "Shop Fine Jewelry",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/1.jpg`,
    mobileimg: `${storImagePath()}/Forevery/mainbanner-m.jpg`,
  },
  {
    index: 2,
    title1: "Diamond",
    title2: "Rings",
    desc: "Forevery Diamond Rings, the epitome of eternal love, are expertly crafted with strong metals to endure the test of time. Their shimmering beauty signifies the bond of forever and makes for a timeless symbol of love.",
    buttonText: "Shop Rings",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/2.png`,
    mobileimg: `${storImagePath()}/Forevery/rings-m.jpg`,
  },
  {
    index: 3,
    title1: "Diamond",
    title2: "Necklace",
    desc: "Diamond Necklace are the epitome of mesmerizing beauty, adding a touch of glamour to every outfit. Elevate the overall look with their sparkling shine.",
    buttonText: "Shop Necklace",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/3.jpg`,
  },
  {
    index: 4,
    title1: "Diamond",
    title2: "Pendant",
    desc: "Diamond Pendants are the epitome of mesmerizing beauty, adding a touch of glamour to every outfit. Elevate the overall look with their sparkling shine.",
    buttonText: "Shop Pendant",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/4.png`,
    mobileimg: `${storImagePath()}/Forevery/Diamond-pendant-m.jpg`,
  },
  {
    index: 5,
    title1: "Diamond",
    title2: "Bracelets",
    desc: "Diamond bracelets from Forevery are the epitome of elegance and sophistication, embodying timeless glamour. They match your love perfectly, offering dazzling brilliance. With their unmatched beauty, these bracelets are a must-have for anyone who wants to make a striking statement.",
    buttonText: "Shop Bracelets",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/5.png`,
    mobileimg: `${storImagePath()}/Forevery/diamond-braclets-m.jpg`,
  },
  {
    index: 6,
    title1: "trendy",
    title2: "signet rings",
    desc: "These trendsetting signet rings are taking the fashion world by storm! Signet rings have a rich history, dating back to ancient Greece where victorious leaders wore them with pride. Today, this classic design gets a modern makeover, making it a must-have accessory for both men and women.",
    buttonText: "Shop signet rings",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/7.png`,
  },
  {
    index: 7,
    title1: "Diamond",
    title2: "Earrings",
    desc: "Get Ready to Turn heads and radiate your self-worth with our diamond stud earrings. Each pair is handcrafted to ensure the highest level of luxury. Trust us; you won't regret splurging on these timeless beauties.",
    buttonText: "Shop Earrings",
    banner: `${storImagePath()}/images/HomePage/FineJewelry/Banner/6.png`,
    mobileimg: `${storImagePath()}/Forevery/diamond-Earrings-m.jpg`,
  },
];

const FineJewelry = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="for_fineJewel_mainDiv">
        <div className="for_fineJewel_container_div">
          <div className="for_fineJewel_breadcrumbs_div">
            <div className="for_fineJewel_breadcrumbs">
              <span
                className="for_fineJewel_breadcrumbs_label"
                onClick={() => navigate("/")}
              >
                Home /
              </span>
              <span className="for_fineJewel_breadcrumbs_label">
                &nbsp;Fine Jewelry
              </span>
            </div>
          </div>
          <div className="for_fineJewel_banners_div">
            {fineJewelArr?.map((item) => {
              const isEven = item?.index % 2 === 0;
              const textAlign = isEven ? "right" : "left";
              return (
                <div
                  className="bg-img-cover-1"
                  style={{
                    backgroundImage: `url(${item?.banner})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                    // height: '500px'
                  }}
                  key={item?.index}
                >
                  <div
                    className="for_fineJewel_banner_text_div"
                    style={{ textAlign: isEven ? "right" : "left" }}
                  >
                    <h1
                      style={{
                        fontSize: item?.index === 1 ? "36px" : "14px",
                        fontWeight: item?.index === 1 ? 600 : 700,
                        lineHeight: item?.index === 1 ? "50px" : "30px",
                        textTransform: item?.index !== 1 ? "uppercase" : "none",
                      }}
                    >
                      {item?.title1}
                      <span>{item?.title2}</span>
                    </h1>
                    <div
                      className="for_fineJewel_para"
                      style={{
                        display: "flex",
                        alignItems: isEven ? "flex-end" : "flex-start",
                        justifyContent: isEven ? "flex-end" : "flex-start",
                      }}
                    >
                      <p className="for_fineJewel_para_p">{item?.desc}</p>
                    </div>
                    <div className="for_fineJewel_btn_div">
                      <button
                        className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                      >
                        {item?.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="for_fineJewel_newletter">
            <NewsletterSignup />
          </div>
        </div>
      </div>
      <MobileContainer />
    </>
  );
};

export default FineJewelry; 

const MobileContainer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mobile_container_resposnive">
        <div className="m-breadcrumb-com">
          <div className="for_fineJewel_breadcrumbs">
            <span
              className="for_fineJewel_breadcrumbs_label"
              onClick={() => navigate("/")}
            >
              Home /
            </span>
            <span className="for_fineJewel_breadcrumbs_label">
              &nbsp;Fine Jewelry
            </span>
          </div>
        </div>
        <div className="m-card-container">
          {fineJewelArr?.map((val, i) => {
            return (
              <div className="m-card-1">
                <img src={val?.mobileimg || val?.banner} alt="" />
                <div className="details">
                  <h1>{val?.title1}</h1>
                  <h2>{val?.title2}</h2>
                  <p>{val?.desc}</p>
                  <button
                    className={`${btnstyle?.btn_for_new} for_finrJewel_btn ${btnstyle?.btn_15}`}
                  >
                    {val?.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <NewsletterSignup />
    </>
  );
};
