import { Dialog, DialogContent } from "@mui/material";
import { RxCross1 } from "react-icons/rx";

const MountModel = ({ open, handleConfirm, handleClose, handleRemoveData, index }) => {
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
                            You have already selected mount & diamond, would you like to view
                            it?
                        </span>
                        <div className="for_modal_buttons_nav_div">
                            <button
                                onClick={() => {
                                    handleConfirm();
                                    handleClose();
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    handleRemoveData(index);
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


export default MountModel;