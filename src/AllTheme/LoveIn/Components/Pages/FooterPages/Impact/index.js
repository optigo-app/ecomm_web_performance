import React, { useEffect, useState } from "react";
import "./index.css";
import Campaign from "./campaign/Campaign";
import Explore from "./Explore/Explore";
import Footer from "../../Home/Footer/Footer";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

const Index = ({ data, fdata }) => {
  console.log('data: ', data);

  return (
    <>
      <div style={{ background: '#efe5ff' }}>
        <div className="back-img-container">
          <div className="impact-container2"></div>
        </div>
        <img src={data?.image?.[0]} alt="..." style={{ width: '100%' }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: "-55px",
            flexDirection: "column",
            maxWidth: "1680px",
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: '50px'
          }}
          className="main-front-container"
        >

          <Campaign data={data} />

          {/* <Explore/> */}
        </div>
        <div className="my-5" style={{ background: '#efe5ff' }}>
          <img src={data?.image?.[25]} alt="..." style={{ width: '100%' }} />
        </div>
        <div style={{ marginTop: '-5%', background: 'white' }}>
          <Footer data={fdata} />
        </div>
        <div>
          <p style={{
            paddingBlock: '30px',
            margin: '0px',
            textAlign: 'center',
            color: 'rgb(95,73,122)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '1px'
          }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
        </div>
      </div>
    </>
  );
};

export default Index;
