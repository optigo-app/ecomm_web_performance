import { useNavigate } from "react-router-dom";
import { DiamondLists, shapes } from "../../../../data/NavbarMenu";
import "./ShapeSection.scss";
import { useState } from "react";
import MountModel from "../../../ReusableComponent/MountModel/MountModel";

const ShapeSection = () => {
  const navigate = useNavigate();
  const handleMoveTo = (shape) => {
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
  };
  const [showModal, setShowModal] = useState(false);
  const [shape, setShape] = useState();
  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2"));


  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  }

  const handleConfirm = () => {
    navigate(createUrl);
  }
  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null);

  const handleCheckSteps = (value) => {
    if (checkSteps) {
      setShowModal(true);
      setShape(value);
    } else {
      console.log("Alternative action");
    }
  };

  const HandleDiamondNavigation = (shape) => {
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
    const step1 = [{ step1: true, shape: shape }];
    sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = (shape) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2");
    sessionStorage.removeItem("custStepData2");
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
    handleToggle();
  };
  return (
    <div className="for_ShapeSection">
      <div className="shape_Section">
        <div className="head">
          <h3>Explore With Diamond shapes </h3>
        </div>
        <div className="shape_list">
          {DiamondLists?.slice(0, DiamondLists.length - 3)?.map((val, i) => {
            return (
              <>
                {checkSteps ? (
                  <div
                    className="shape_card_for"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => handleCheckSteps(val?.name)}
                  // onClick={() => handleMoveTo(val?.name)}
                  >
                    <img src={val?.img} alt="" />
                    <span>{val?.name}</span>
                  </div>
                ) : (
                  <div
                    className="shape_card_for"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => HandleDiamondNavigation(val?.name)}
                  // onClick={() => handleMoveTo(val?.name)}
                  >
                    <img src={val?.img} alt="" />
                    <span>{val?.name}</span>
                  </div>
                )}
              </>
            );
          })}
          <MountModel
            open={showModal}
            handleConfirm={handleConfirm}
            handleClose={handleToggle}
            handleRemoveData={handleRemoveData}
            index={shape}
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeSection;
