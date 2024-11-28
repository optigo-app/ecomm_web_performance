import React, { useEffect } from "react";
import "./SizeGuide.scss";
import { SizeGuideImage } from "../../../Constants/SizeGuide";
import { Link } from "react-router-dom";
const SizeGuide = () => {
  useEffect(()=>{
    window.scrollTo({
      behavior  :"smooth",
      top : 0
    })
  },[])
  return (
    <div className="hoq_size_guide">
      <div className="heading">
        <h1>Size Guide</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur officiis corporis reiciendis
          earum tempore. Architecto molestiae in, ullam autem quas aliquid
          eaque, amet rem officia. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, voluptas?
        </p>
      </div>
      <div className="ring_card_list">
        {SizeGuideImage?.map((val, i) => {
          return <Card data={val} key={i} />;
        })}
      </div>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
};

export default SizeGuide;

const Card = ({ data }) => {
  return (
    <div
      className="ring_card"
      style={{
        flexDirection: data?.id == 1 ? "row-reverse" : "",
      }}
    >
      <div className="left">
        <img src={data?.img} alt="" />
      </div>
      <div className="right">
        <h2>{data?.desc}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          ratione laborum iusto est, error odit at quae facere temporibus nemo.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi eius tenetur facilis.
        </p>
        <button>Download Guide</button>
      </div>
      
    </div>
  );
};
