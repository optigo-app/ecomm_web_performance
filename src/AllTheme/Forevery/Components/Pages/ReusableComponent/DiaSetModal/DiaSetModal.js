import { Dialog, DialogContent } from '@mui/material';
import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const DiaSetModal = ({ open, data, Steps, handleClose, productData, isSettFlow, setImage }) => {
    const navigate = useNavigate();
    const handleYesConfirm = () => {
        if (Steps?.[0] || Steps?.[1]) {
            if (Steps[0].Setting === "Ring") {
                Steps.pop();
                Steps[1].shape = productData?.ShapeName;
                sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(Steps));
                data.step1Data = productData;
                sessionStorage.setItem('custStepData2Ring', JSON.stringify([data]));
                sessionStorage.removeItem('setImage');
                sessionStorage.setItem('setImage', JSON.stringify(setImage));
                navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
            }
            else if (Steps[0]?.Setting === 'Pendant') {
                Steps.pop();
                Steps[1].shape = productData?.ShapeName;
                sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(Steps));
                data.step1Data = productData;
                sessionStorage.setItem('custStepData2Pendant', JSON.stringify([data]));
                sessionStorage.setItem('setPenImage', JSON.stringify(setImage));
                navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
            }
            else if (Steps[0]?.Setting === 'Earring') {
                Steps.pop();
                Steps[1].shape = productData?.ShapeName;
                sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(Steps));
                data.step1Data = productData;
                sessionStorage.setItem('custStepData2Earring', JSON.stringify([data]));
                sessionStorage.setItem('setEarImage', JSON.stringify(setImage));
                navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
            } else if (Steps?.[0]?.shape !== productData) {
                Steps.pop();
                Steps[0].shape = productData;
                sessionStorage.setItem('customizeSteps', JSON.stringify(Steps));
                sessionStorage.removeItem('custStepData');
                sessionStorage.removeItem('ShapeFlowUrl');
                navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.charAt(0)?.toUpperCase() + productData?.slice(1)?.toLowerCase()}`);
            }
            else if (Steps[0]?.shape !== "" && Steps[0]?.step1 === true) {
                const stepsBackup = [...Steps];
                Steps = [];
                Steps.push({
                    step1: true,
                    Setting: stepsBackup[1]?.Setting,
                    id: stepsBackup[1]?.Setting === "Ring" ? 1 : stepsBackup[1]?.Setting === "Pendant" ? 2 : 3,
                    Status: "active",
                });
                Steps.push({
                    step2: true,
                    shape: productData?.ShapeName,
                    id: stepsBackup[1]?.Setting === "Ring" ? 1 : stepsBackup[1]?.Setting === "Pendant" ? 2 : 3,
                });
                data.step1Data = data.step2Data; // Copy step2Data to step1Data
                delete data.step2Data; // Remove the step2Data key
                data.step1Data = productData;

                if (stepsBackup[1]?.Setting === "Ring") {
                    sessionStorage.setItem('customizeSteps2Ring', JSON.stringify(Steps));
                    sessionStorage.setItem('custStepData2Ring', JSON.stringify([data]));
                    sessionStorage.removeItem('customizeSteps');
                    sessionStorage.removeItem('custStepData');
                    navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
                } else if (stepsBackup[1]?.Setting === "Pendant") {
                    sessionStorage.setItem('customizeSteps2Pendant', JSON.stringify(Steps));
                    sessionStorage.setItem('custStepData2Pendant', JSON.stringify([data]));
                    sessionStorage.removeItem('customizeSteps');
                    sessionStorage.removeItem('custStepData');
                    navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
                } else if (stepsBackup[1]?.Setting === "Earring") {
                    sessionStorage.setItem('customizeSteps2Earring', JSON.stringify(Steps));
                    sessionStorage.setItem('custStepData2Earring', JSON.stringify([data]));
                    sessionStorage.removeItem('customizeSteps');
                    sessionStorage.removeItem('custStepData');
                    navigate(`/certified-loose-lab-grown-diamonds/diamond/${productData?.ShapeName?.charAt(0)?.toUpperCase() + productData?.ShapeName?.slice(1)?.toLowerCase()}`);
                }
            }
        }
    };

    const handleNoConfirm = () => {
        if (Steps?.[0] || Steps?.[1]) {
            if (Steps[0].Setting === "Ring") {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`)
            }
            else if (Steps[0]?.Setting === 'Pendant') {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`)
            }
            else if (Steps[0]?.Setting === 'Earring') {
                navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`)
            }
            else if ((Steps?.[0]?.shape !== productData)) {
                const category = `${Steps?.[1]?.Setting}/category`;
                const filterKeyVal = btoa(category);
                sessionStorage.setItem("ShapeFlowUrl",JSON.stringify(`/certified-loose-lab-grown-diamonds/settings/${Steps?.[1]?.Setting}/diamond_shape=${productData}/M=${filterKeyVal}`))
                handleClose();
                navigate(`/certified-loose-lab-grown-diamonds/settings/${Steps?.[1]?.Setting}/diamond_shape=${productData}/M=${filterKeyVal}`);
            }
            else if (Steps[0]?.shape !== "") {
                if (Steps[1]?.Setting === 'Ring') {
                    navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`)
                }
                else if (Steps[1]?.Setting === 'Pendant') {
                    navigate(`/certified-loose-lab-grown-diamonds/settings/Pendant/M=UGVuZGFudC9jYXRlZ29yeQ==`)
                }
                else if (Steps[1]?.Setting === 'Earring') {
                    navigate(`/certified-loose-lab-grown-diamonds/settings/Earring/M=RWFycmluZy9jYXRlZ29yeQ==`)
                }
            }
        }
    }

    return (
        <>
            <Dialog
                open={open}
                // onClose={handleClose}
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
                    {isSettFlow === 1 && (
                        <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
                            <RxCross1 className="for_modal_cancel_nav_btn" size={"12px"} />
                        </div>
                    )}
                    <div className="for_modal_inner_nav_div">
                        <span className="for_modal_nav_title">
                            {isSettFlow === 1 ? "This Setting Shape Is Not Matching With Your Already Selected Setting Shape.Do You Want To Remove Selected Setting And Continue?" : "This Diamond Shape Is Not Matching With Setting Shape.Do You Want To Remove Selected Dimaond And Continue?"}
                        </span>
                        <div className="for_modal_buttons_nav_div_1" style={{marginTop: isSettFlow === 0 ? "1.2rem" : "0.5rem"}}>
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
}

export default DiaSetModal;