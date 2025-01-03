import React from "react";
import "./BottomSection.modul.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

function BottomSection({data}) {
  return (
    <div className="mala_bottom_main_div">
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

<img src={data?.image?.[0]} className='mala_bottom_main_img' />
    </div>
  );
}

export default BottomSection;
