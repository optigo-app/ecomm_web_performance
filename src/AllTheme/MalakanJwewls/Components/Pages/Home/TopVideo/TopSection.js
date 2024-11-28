import React from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const TopSection = () => {
  const style = {
    // backgroundImage: `url(${storImagePath()}/images/HomePage/TopSection/topBanner.jpg)`,
    backgroundImage: `url(${storImagePath()}/images/HomePage/TopSection/top.png)`,
  };
  return (
    <div className="mala_topVideoMain"
    style={style}>
       <div className="details_text"> 
    <h1>Made</h1>
    <h1>Without</h1>
    <h1>Rules</h1>
  </div>
    </div>
  );
};

export default TopSection;
