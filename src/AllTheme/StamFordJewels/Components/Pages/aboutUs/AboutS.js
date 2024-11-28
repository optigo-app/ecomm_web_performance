import React from "react";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";

const data = [
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: `${storImagePath()}/about/2.png`,
  },
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: `${storImagePath()}/about/4.png`,
  },
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    img: `${storImagePath()}/about/4.png`,
  },
];
const AboutBanner =    `${storImagePath()}/about/1.png`;
const AboutLastBanner =    `${storImagePath()}/about/22.jpg`;

const AboutS = () => {
    console.log(AboutLastBanner)
  return (
    <div className="stam_about_l">
      <div className="bgimage_banner_stam">
        <img src={AboutBanner} alt="" />
      </div>
      <div className="desc_stam_ford_p">
        <p>
          Lorem, ipsum dolor sit amet dolorum iure id veniam asperiores
          dignissimos quas. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Praesentium, debitis? Lorem ipsum dolor amet consectetur.{" "}
        </p>
      </div>
      <div className="grid_layout_stam_about">
        {data?.map(({ desc, img, title, left }, idx) => {
          return <div className="stam_grid_card">
            <div className="left_stam_banner">
                <img src={img} alt="" />
            </div>
            <div className="right_det_stam">
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
          </div>;
        })}
      </div>
      <div className="card_list_stamford">
        {Array.from({length:4}).map((val,i)=>{
            return  <div class="stam_card">
          <div className="details_Stame">
          <h2>Lorem ipsum dolor.</h2>
              <ul>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                </ul> 
          </div>
        </div>
        })}
      </div>
      <div className="bgimage_banner_stam_last" >
        <img src={AboutLastBanner} alt="" style={{
            objectFit:"cover"
        }}/>
      </div>
    </div>
  );
};

export default AboutS;
