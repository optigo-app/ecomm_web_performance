import { useNavigate } from "react-router-dom";
import { DiamondLists, shapes } from "../../../../data/NavbarMenu";
import "./ShapeSection.scss";
import { useState } from "react";
import MountModel from "../../../ReusableComponent/MountModel/MountModel";
import { Dialog, DialogContent } from "@mui/material";
import { RxCross1 } from "react-icons/rx";

const ShapeSection = () => {
  const navigate = useNavigate();
  const handleMoveTo = (shape) => {
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
  };
  const [showModal, setShowModal] = useState(false);
  const [shape, setShape] = useState();
  const [showModal1, setShowModal1] = useState(false);
  const [checkIndex, setCheckIndex] = useState();
  const steps = JSON.parse(sessionStorage.getItem("customizeSteps"));
  const steps1 = JSON.parse(sessionStorage.getItem("customizeSteps2Ring"));
  const steps2 = JSON.parse(sessionStorage.getItem("customizeSteps2Pendant"));
  const steps3 = JSON.parse(sessionStorage.getItem("customizeSteps2Earring"));


  const createUrl = `/d/setting-complete-product/det345/?p=${(steps ?? steps1 ?? steps2 ?? steps3)?.[2]?.url}`;

  const handleToggle = () => {
    setShowModal(!showModal);
  }

  const handleToggle1 = () => {
    setShowModal1(!showModal1);
  }

  const handleConfirm = () => {
    navigate(createUrl);
  }

  const checkStepsOf0 =
    (steps?.[0] !== undefined && steps?.[0] !== null) ||
    (steps1?.[0] !== undefined && steps1?.[0] !== null) ||
    (steps2?.[0] !== undefined && steps2?.[0] !== null) ||
    (steps3?.[0] !== undefined && steps3?.[0] !== null);

  const checkSteps =
    (steps?.[2] !== undefined && steps?.[2] !== null) ||
    (steps1?.[2] !== undefined && steps1?.[2] !== null) ||
    (steps2?.[2] !== undefined && steps2?.[2] !== null) ||
    (steps3?.[2] !== undefined && steps3?.[2] !== null);

  const handleCheckSteps = (value, link, index) => {
    let isStepValid = false;
    let shapeVal;

    // if (value === "Diamond Rings" && steps1?.[2]?.step3 === true) {
    if (value === "Diamond Rings") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isRing', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isPendant')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ=="
      }
      // } else if (value === "Diamond Pendant" && steps2?.[2]?.step3 === true) {
    } else if (value === "Diamond Pendant") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isPendant', true)
        sessionStorage.removeItem('isPair')
        sessionStorage.removeItem('isRing')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ=="
      }
    } else if (value === "Diamond Earrings") {
      if (steps?.[2] !== undefined && steps?.[2] !== null) {
        isStepValid = checkSteps
      } else {
        shapeVal = "Round"
        sessionStorage.setItem('isPair', true)
        sessionStorage.removeItem('isPendant')
        sessionStorage.removeItem('isRing')
        window.location.href = "/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ=="
      }
    }
    else if (value !== "Diamond Rings" && value !== "Diamond Pendant" && value !== "Diamond Earrings") {
      isStepValid = checkSteps
    }

    if (isStepValid) {
      setShowModal(true);
      setCheckIndex(index);
      setShape((value === "Diamond Rings" || value === "Diamond Pendant") ? shapeVal : value);
    }
    else {
      navigate(link);
      if (value === "Diamond Rings" && steps1?.[2]?.step3 !== true) {
        if (!steps1) {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
        } else {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/M=UmluZy9jYXRlZ29yeQ==`);

        }
      }
      if (value === "Diamond Pendant" && steps2?.[2]?.step3 !== true) {
        if (!steps2) {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`);
        } else {
          navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/diamond_shape=${(steps?.[0]?.shape ?? steps1?.[1]?.shape ?? steps2?.[1]?.shape)}/M=UGVuZGFudC9jYXRlZ29yeQ==`);
        }
      }
    };
  }

  const createYesUrl = `/certified-loose-lab-grown-diamonds/diamond/`;

  const handleNoConfirm = () => {
    if (steps1?.[0]?.Status === 'active') {
      const getRingSteps = [...steps1];
      sessionStorage.setItem("customizeSteps2Ring", JSON.stringify(getRingSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getRingSteps?.[1]?.shape}`);
    }
    if (steps2?.[0]?.Status === 'active') {
      const getPendantSteps = [...steps2];
      sessionStorage.setItem("customizeSteps2Pendant", JSON.stringify(getPendantSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getPendantSteps?.[1]?.shape}`);
    }
    if (steps3?.[0]?.Status === 'active') {
      const getEarringSteps = [...steps3];
      sessionStorage.setItem("customizeSteps2Earring", JSON.stringify(getEarringSteps));
      setShowModal(false);
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${getEarringSteps?.[1]?.shape}`);
    }
  };

  const HandleDiamondNavigation = (shape) => {
    if (checkStepsOf0 && (steps1?.[1]?.step2 !== true && steps2?.[1]?.step2 !== true && steps3?.[1]?.step2 !== true)) {
      sessionStorage.removeItem('customizeSteps2Ring');
      sessionStorage.removeItem('custStepData2Ring')
      sessionStorage.removeItem('customizeSteps2Pendant');
      sessionStorage.removeItem('custStepData2Pendant')
      sessionStorage.removeItem('customizeSteps2Earring');
      sessionStorage.removeItem('custStepData2Earring')
      navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
      const step1 = [{ step1: true, shape: shape }];
      sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
    } else {
      if (steps1?.[1]?.step2 === true || steps2?.[1]?.step2 === true || steps3?.[1]?.step2 === true) {
        const getShape = steps1?.[1]?.shape ?? steps2?.[1]?.shape ?? steps3?.[1]?.shape;
        if (getShape !== shape) {
          setShowModal1(true);
          setShape(shape);
        } else {
          handleNoConfirm();
        }
      } else {
        navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
        sessionStorage.setItem('isRing', true);
        sessionStorage.removeItem("isPair");
        sessionStorage.removeItem('isPendant');
        const step1 = [{ step1: true, shape: shape }];
        sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
      }
    }
  };


  const handleRemoveData = (shape) => {
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem("customizeSteps2Pendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("customizeSteps2Earring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem("isRing");
    sessionStorage.removeItem("isPendant");
    sessionStorage.removeItem("isPair");
    sessionStorage.removeItem('ringFlowUrl');
    sessionStorage.removeItem('PendantFlowUrl');
    sessionStorage.removeItem('EarringFlowUrl');
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')
    
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
                    onClick={() => handleCheckSteps(val?.name, " ", 0)}
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
          <CheckingDiaSetModal
            open={showModal1}
            link1={createYesUrl}
            handleNoConfirm={handleNoConfirm}
            handleClose={handleToggle1}
            handleRemoveData={handleRemoveData}
            index={checkIndex}
            shape={shape}
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeSection;


const CheckingDiaSetModal = ({ open, link1, handleNoConfirm, handleClose, shape, handleRemoveData, index, flowType }) => {

  const handleYesConfirm = () => {
    sessionStorage.removeItem("customizeSteps2Ring");
    sessionStorage.removeItem("custStepData2Ring");
    sessionStorage.removeItem('isRing');
    sessionStorage.removeItem("setImage");
    sessionStorage.removeItem('ringFlowUrl')
    sessionStorage.removeItem('ShapeRingFlowUrl')
    sessionStorage.removeItem("customizeStepsPendant");
    sessionStorage.removeItem("custStepData2Pendant");
    sessionStorage.removeItem("setPenImage");
    sessionStorage.removeItem("isPendant");
    sessionStorage.removeItem('PendantFlowUrl')
    sessionStorage.removeItem('ShapePendantFlowUrl')
    sessionStorage.removeItem("customizeStepsEarring");
    sessionStorage.removeItem("custStepData2Earring");
    sessionStorage.removeItem("setEarImage");
    sessionStorage.removeItem("isPair");
    sessionStorage.removeItem('EarringFlowUrl')
    sessionStorage.removeItem('ShapeEarringFlowUrl')
    sessionStorage.removeItem("customizeSteps");
    sessionStorage.removeItem("custStepData");
    handleClose();
    const step = [{ step1: true, shape: "All" }]
    sessionStorage.setItem('customizeSteps', JSON.stringify(step));
    if (flowType !== "") {
      if (flowType === "ring") {
        sessionStorage.setItem('isRing', 'true')
      } else if (flowType === "pendant") {
        sessionStorage.setItem('isPendant', 'true')
      } else if (flowType === "earring") {
        sessionStorage.setItem('isPair', 'true')
      }
    }
    window.location.href = `${link1}${shape ? shape : ""}`;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          zIndex: 9999999,
          "& .MuiDialog-root": {
            zIndex: 9999,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            border: "1px solid white",
            zIndex: 9999,
          },
          "& .MuiDialogContent-root": {
            padding: "10px",
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: "0px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className="for_modal_nav_title">
              This Diamond Shape Is Not Compatible With Your Selected Setting.
              Do You Want To Remove Selected Setting And Continue?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button
                onClick={() => {
                  handleYesConfirm();
                  handleClose();
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  handleNoConfirm();
                }}
              >
                No
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};