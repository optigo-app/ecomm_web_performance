import React from "react";
import "./TheDifference.modul.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const TheDifference = ({ data }) => {
  const VideoSrc = {
    video1: `${storImagePath()}/images/HomePage/a1.mp4`,
    video2: `${storImagePath()}/images/HomePage/a2.mp4`,
  };
  const ImgSrc = {
    img: `${storImagePath()}/images/HomePage/CRAFTMANSHIP.jpg`,
  };
  return (
    <div className="malkana-containerrr">
      <h1 className="malkana-heading">CRAFTMANSHIP</h1>

      <div className="malkana-videoContainer">
        <video autoPlay loop muted playsInline className="malkana-video" src={data?.video?.[0]}>
          {/* <source src={data?.video?.[0]} type="video/mp4" />
          <source
            src={data?.video[0].replace(".mp4", ".webm")}
            type="video/webm"
          />
          Your browser does not support the video tag. */}
        </video>
      </div>

      <p className="malkana-description">
        Crafting timeless pieces with unparalleled attention to detail
      </p>
    </div>
  );
};

export default TheDifference;

{
  /* <img className="simple_card_gif " src={`${storImagePath()}/images/HomePage/gif1.gif`} alt="" /> */
}
{
  /* <div className='mala_smilingPAgeMain_two'>
{/* <img className="simple_card_gif" src='https://malakan.com/wp-content/uploads/2024/04/Hompage-Ring-New-Large.gif' alt="" /> */
}
{
  /* <video src={VideoSrc?.video2} muted loop autoPlay /> */
}
// </div> */}
