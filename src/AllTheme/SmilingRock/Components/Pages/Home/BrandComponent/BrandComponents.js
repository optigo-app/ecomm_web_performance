import React from "react";
import Marquee from "react-fast-marquee";
import "./brandComponents.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const BrandsComponent = () => {
  const kayralogo = [
    "logo1.png",
    "logo2.png",
    "logo3.png",
    "logo4.png",
    "logo5.png",
    "logo6.png",
    "logo1.png",
    "logo2.png",
    "logo3.png",
    "logo4.png",
    "logo5.png",
    "logo6.png",
  ];
  const mayrologo = [
    "logo1.png",
    "logo2.jpg",
    "logo3.png",
    "logo4.png",
    "logo1.png",
    "logo2.jpg",
    "logo3.png",
    "logo4.png",
    "logo1.png",
    "logo2.jpg",
    "logo3.png",
    "logo4.png",
  ];
  const KayralogoElements = kayralogo.map((logo, index) => (
    <img
      key={index}
      className="smr_affilitionImg"
      loading="lazy"
      src={`${storImagePath()}/images/HomePage/BrandLogo/kayra/${logo}`}
      style={{ width: "130px", objectFit: "cover", marginRight: "90px" }}
    />
  ));
  const MayoralogoElements = mayrologo.map((logo, index) => (
    <img
      key={index}
      className="smr_affilitionImg"
      loading="lazy"
      src={`${storImagePath()}/images/HomePage/BrandLogo/mayora/${logo}`}
      style={{ width: "130px", objectFit: "cover", marginRight: "90px" }}
    />
  ));
  return (
    <div id="brandsComponentID" className="smr_brandsComponentsDiv">
      {/* For kayra */}
      <p className="smr_brandsCompoents">Participation In Exhibitions</p>
      {/* For miora */}
      {/* <p className="smr_brandsCompoents">In Affiliation With</p> */}
      <Marquee
        className="smr_brandsComponentClass"
        gradient={false}
        speed={40}
        pauseOnHover={true}
      // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {KayralogoElements}
      </Marquee>
    </div>
  );
};

export default BrandsComponent;

{
  /* <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo1.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo2.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo3.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo4.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo6.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo1.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo2.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo4.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                />
                 <img className='smr_affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo6.png`}
                    style={{ width: '130px', objectFit: 'cover', marginRight: '90px' }}
                /> */
}
