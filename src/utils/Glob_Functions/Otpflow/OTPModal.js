import { useState, useRef, useEffect } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { MdEmail, MdSmartphone, MdClose } from "react-icons/md"
import { Timer } from "./Timer"
import "./OTPVerificationModal.scss"


export const OTPVerificationModal = ({
  isOpen,
  onClose,
  type,
  contactInfo,
  buttonBgColor ,
  onVerify,
  onResend,
  iconcolor ,
bgcolor ,
iconbgcolor
}) => {
  const otpLength = 4
  const [otp, setOtp] = useState(new Array(otpLength).fill(""))
  const [showResend, setShowResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [isOpen])

  useEffect(() => {
    setOtp(new Array(otpLength).fill(""))
  }, [otpLength])

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    if (element.value && index < otpLength - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const otpString = otp.join("")
    if (otpString.length === otpLength) {
      onVerify(otpString)
    }
  }

  const handleResend = () => {
    setOtp(new Array(otpLength).fill(""))
    setShowResend(false)
    onResend()
  }

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="otp-modal-title" className="otp-verification-modal">
      <Box className="modal-content" sx={{
        bgcolor:`${bgcolor} !important`
      }}>
        <button className="close-button"  onClick={onClose}>
          <MdClose />
        </button>

        <div className="icon-container" style={{
          backgroundColor: iconbgcolor
        }}>
          {type === "email" ? <MdEmail className="icon"  color={iconcolor} /> : <MdSmartphone className="icon" color={iconcolor} />}
        </div>

        <Typography variant="h5" id="otp-modal-title" className="title">
          {`Verify Your ${type === "email" ? "Email Address" : "Mobile Number"}`}
        </Typography>

        <Typography variant="body2" className="description">
          {`We have sent a verification code to ${contactInfo}`}
        </Typography>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              variant="outlined"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
                className: "otp-input",
              }}
            />
          ))}
        </div>

        <div className="action-container">
          {showResend ? (
            <Button onClick={handleResend} className="resend-button">
              Resend Code
            </Button>
          ) : (
            <div className="timer-container">
              Resend code in <Timer onComplete={() => setShowResend(true)} />
            </div>
          )}
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={otp.some((digit) => digit === "")}
          className="verify-button"
          style={{ backgroundColor: buttonBgColor }}
        >
          Verify {type === "email" ? "Email" : "Mobile"}
        </Button>
      </Box>
    </Modal>
  )
}

