import React from "react";
import "./Education.scss";
import { education } from "../../../data/dummydata";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import btnstyle from "../../../scss/Button.module.scss";
import { useNavigate } from "react-router-dom";
const Education = () => {
  const navigate = useNavigate();
  const addCategory = `Ring/category`;
  const filterKeyVal = btoa(addCategory);

  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));

  const checkSteps =
  (steps?.[2] !== undefined && steps?.[2] !== null) ||
  (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
  (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
  (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

    const handleSettingNavigation = () => {
      // const regex = /M=([^/]+)/;
      // const match = link.match(regex);
      // if (match) {
      //   mValue = match[1];
      // } else {
      //   // console.log('M value not found.');
      // }
  
        if (checkSteps) {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);
        } else {
          if (checkStepsOf0) {
            if (steps?.[0] !== undefined && steps?.[0] !== null) {
              sessionStorage.removeItem('customizeSteps')
              sessionStorage.removeItem("custStepData");
            } else {
              sessionStorage.removeItem('customizeSteps2Pendant');
              sessionStorage.removeItem('custStepData2Pendant')
              sessionStorage.removeItem('customizeSteps2Earring');
              sessionStorage.removeItem('custStepData2Earring')
            }
          }
          sessionStorage.setItem('isRing', true)
          sessionStorage.removeItem('isPair')
          sessionStorage.removeItem('isPendant')
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
        }
    };

  return (
    <>
      <div className="for_Education">
        <div className="heading-e">
          <span>Education center</span>
        </div>
        <div className="education-wrapper">
          <hr />
          <div className="desc">
            <h2>Become a Pro With Forevery Education Center </h2>
            <p>
              If you are buying it for the first time? Don't you worry; we have
              all the information you need to know before making a substantial
              purchase. Learn about natural diamonds, Lab-grown diamonds,
              engagement ring styles and patterns, wedding bands, fine diamond
              jewelry pieces featuring bracelets, earrings, studs, pendants, and
              rings. Before customizing your ring, Get to know about various
              diamond shapes, ring settings, diamond certifications, and the
              four C's of a diamond. Read our education center and become an
              expert.
            </p>
            <bdo>be smart, buy smart with forevery</bdo>
          </div>
          <div className="education_grid">
            {education?.map((val, i) => {
              return (
                <div className="grid_boxes">
                  <div className="image">
                    <img src={val?.img} alt="" />
                  </div>
                  <div className="details-t">
                    <span className="title-t">{val?.title}</span>
                    <p className="descri-t">{val?.description}</p>
                    <button
                      onClick={() => {
                        if (val?.title === "Engagement Rings") {
                          handleSettingNavigation();
                        }
                      }}
                      className={`${btnstyle?.btn_for_new} ${btnstyle?.btn_15}`}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div >
      {/* <NewsletterSignup /> */}
    </>
  );
};

export default Education;
