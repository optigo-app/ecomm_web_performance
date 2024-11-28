import { Box, Modal } from '@mui/material';
import React, { useState } from 'react'

const ItemRemarkDialog = ({
    showRemark1,
    handleClose1,
    handleClose2,
    selectedItem,
    productRemark,
    open1,
    handleRemarkChange,
    handleSave,
    onRemarkChange,
    onSave,
    remark,
}) => {
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        width: 600,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 1,
        outline: 'none',
    };
    const [tempRemark, setTempRemark] = useState(remark);

    // Update temporary remark when textarea value changes
    const handleChange = (e) => {
        setTempRemark(e.target.value);
        onRemarkChange(e); // Optional: call the prop function if needed
    };

    // Save the remark and close the modal
    const handleSave1 = () => {
        onSave(tempRemark);
        handleClose1();
        // handleClose2();
    };

    // Handle modal close and reset temporary remark
    const handleClose = () => {
        setTempRemark(remark); // Reset to the initial remark
        handleClose1();
        // handleClose2();
    };
    return (
        <>
            <Modal
                className='elev_modal'
                open={showRemark1 || open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className="elv_product-remark">
                        <span className='elv_product-title-span'>Add The Item Remark..</span>
                        <textarea
                            className="elv_product-remarkTextArea"
                            rows="6"
                            style={{ borderRadius: '10px', marginBlock: '0.5rem', border: '', outline: 'none' }}
                            value={remark}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="elv_projectRemarkBtn-group">
                        <button className="elv_remarksave-btn" onClick={handleSave1}>
                            Save
                        </button>
                        <button className="elv_remarkcancel-btn" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ItemRemarkDialog