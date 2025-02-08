import React from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { motion } from 'framer-motion';

const TheDifference = () => {
  const motionEnabled = false;
  const WrapperDiv = motionEnabled ? motion.div : "div";
  const WrapperP = motionEnabled ? motion.p : "p";
  return (
    <div className="lovPAgeMain" style={{ paddingBlock: '8%' }}>
      <WrapperP
        className="lovTitle"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: 'easeIn',
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        The wonder of 4 Decades
      </WrapperP>

      <div className="lov_lovRock">
        {/* First Image */}
        <WrapperDiv
          className="lov_lovRockBox"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
            delay: 0.2, // Delay for the first image
          }}
        >
          <div className="lov_diffrence_box1_main">
            <img
              className="lov_deffrence_img"
              src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference1.webp`}
              alt="CVD Growing to Handcrafted jewelry manufacturer"
            />
          </div>
          <div className="lov_diffrence_box2_main">
            <p className="lov_lovBoxName">CVD Growing to Handcrafted jewelry manufacturer</p>
          </div>
        </WrapperDiv>

        {/* Second Image */}
        <WrapperDiv
          className="lov_lovRockBox"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
            delay: 0.4, // Delay for the second image
          }}
        >
          <div className="lov_diffrence_box1_main">
            <img
              className="lov_deffrence_img"
              src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference2.webp`}
              alt="Recycling Gold to save nature"
            />
          </div>
          <div className="lov_diffrence_box2_main">
            <p className="lov_lovBoxName">
              Recycling Gold to save nature
            </p>
          </div>
        </WrapperDiv>

        {/* Third Image */}
        <WrapperDiv
          className="lov_lovRockBox"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
            delay: 0.6, // Delay for the third image
          }}
        >
          <div className="lov_diffrence_box1_main_dia">
            <img
              className="lov_deffrence_img_dia"
              src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference3.webp`}
              alt="Finest Precisely Polished certified Gems"
            />
          </div>
          <div className="lov_diffrence_box2_main">
            <p className="lov_lovBoxName">Finest Precisely Polished certified Gems</p>
          </div>
        </WrapperDiv>

        {/* Fourth Image */}
        <WrapperDiv
          className="lov_lovRockBox"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
            delay: 0.8, // Delay for the fourth image
          }}
        >
          <div className="lov_diffrence_box1_main">
            <img
              className="lov_deffrence_img"
              src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference4.webp`}
              alt="Socially Progressive & Sustainable practices"
            />
          </div>
          <div className="lov_diffrence_box2_main">
            <p className="lov_lovBoxName">Socially Progressive & Sustainable practices</p>
          </div>
        </WrapperDiv>

        {/* Fifth Image */}
        <WrapperDiv
          className="lov_lovRockBox"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            ease: 'easeIn',
            delay: 1.0, // Delay for the fifth image
          }}
        >
          <div className="lov_diffrence_box1_main">
            <img
              className="lov_deffrence_img"
              src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference5.webp`}
              alt="Unparalleled Quality & commitment"
            />
          </div>
          <div className="lov_diffrence_box2_main">
            <p className="lov_lovBoxName">Unparalleled Quality & commitment</p>
          </div>
        </WrapperDiv>
      </div>
    </div>
  );
};

export default TheDifference;
