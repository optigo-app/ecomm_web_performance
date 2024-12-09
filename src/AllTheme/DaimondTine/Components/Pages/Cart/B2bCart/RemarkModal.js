import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './dt_RemarkModal.scss';

const RemarkModal = ({ open, onClose, remark, onRemarkChange, onSave }) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="remark-modal-title"
      aria-describedby="remark-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          width: {
            xs: '95%',
            sm: '280px',
            md: '500px',
            lg: '500px',
          },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
        }}
        className="dt_remarkModalBox"
      >
        <Typography id="remark-modal-title" variant="h6" component="h2">
          Add The Item Remark..
        </Typography>
        <TextField
          id="remark-modal-description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={remark}
          onChange={onRemarkChange}
          sx={{ mt: 2 }}
          className='dt_RemarkMoalInput'
        />
        <div className="dt_projectRemarkBtn-group">
          <Button className="dt_remarksave-btn" onClick={onSave}>
            Save
          </Button>
          <Button className="dt_remarkcancel-btn" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RemarkModal;
