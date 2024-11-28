import { Box, Modal } from '@mui/material';
import React, { useState } from 'react'

const RemarkDialog = ({
    open1,
    onClose1,
    remark1,
    onRemarkChange1,
    onSave1
}) => {
    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 1,
        outline: 'none',
        width: 600,
    };
    const [tempRemark, setTempRemark] = useState(remark1);

    // Update temporary remark when textarea value changes
    const handleChange = (e) => {
        setTempRemark(e.target.value);
        onRemarkChange1(e); // Optional: call the prop function if needed
    };

    // Save the remark and close the modal
    const handleSave = () => {
        onSave1(tempRemark);
        onClose1();
    };

    // Handle modal close and reset temporary remark
    const handleClose = () => {
        setTempRemark(remark1); // Reset to the initial remark
        onClose1();
    };
    return (
        <>
            <Modal
                className='elev_modal'
                open={open1}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className="elv_product-remark">
                        <span className='elv_product-title-span'>Add The Order Remark..</span>
                        <textarea
                            className="elv_product-remarkTextArea"
                            rows="6"
                            style={{ borderRadius: '10px', marginBlock: '0.5rem', border: '', outline: 'none' }}
                            value={tempRemark}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="elv_projectRemarkBtn-group">
                        <button className="elv_remarksave-btn" onClick={handleSave}>
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

export default RemarkDialog