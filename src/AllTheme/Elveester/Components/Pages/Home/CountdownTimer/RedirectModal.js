import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { redirectModal, timerExpiredState } from '../../../Recoil/atom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: '20px',
};

export default function RedirectModal() {
    const navigate = useNavigate();
    const getRedModal = useRecoilValue(redirectModal)
    const [open, setOpen] = React.useState(getRedModal);
    const handleClose = () => setOpen(false);
    const loginUserDet = JSON.parse(sessionStorage?.getItem('loginUserDetail'));
    const setRedModal = useSetRecoilState(redirectModal);

    const handleContinue = () => {
        setRedModal(false);
        // navigate('/')
        window.location.href = "/"
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: "blur(7px)",
                    },
                    timeout: 700,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                        >
                            <CloseIcon />
                        </IconButton> */}
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Dear Customer,
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Your  <b>{loginUserDet?.PackageName}</b> package has expired, and you can no longer view the package designs. Please contact your sales representative to renew your package.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => handleContinue()}
                            sx={{ mt: 3, textAlign: 'center', width: '100%', borderRadius: '20px' }}
                        >
                            Continue
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}