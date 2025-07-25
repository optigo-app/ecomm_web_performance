import React from "react";
import "./BottomSection.modul.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

function BottomSection({ data }) {

  const backgroundImageUrl = data?.image?.[0];

  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',       // cover whole div
    backgroundPosition: 'center',  // center the image
    width: '100%',                 // adjust as needed
    height: '400px',               // or any height you want
  };


  return (
    <div className="mala_bottom_main_div" style={style}>
      {/* <div className="mala_bottom_main_div_sub">
        <p className="mala_bottom_title">Crafted Without Boundaries.</p>
        <div className="mala_bottom_main_div_sub1">
          <p className="mala_bottom_title_sub">
            Let us be your personalized jewelry studio, creating lasting pieces
            for your clients.
          </p> */}
      {/* <button className='mala_bottom_btn'>GET IN TOUCH</button> */}
      {/* </div>
      </div> */}

      {/* <img src={data?.image?.[1]} className='mala_bottom_main_img' alt="GET IN TOUCH" /> */}
      {/* <img src={data?.image?.[0]} className='mala_bottom_main_img' alt="GET IN TOUCH" /> */}
    </div>
  );
}

export default BottomSection;
