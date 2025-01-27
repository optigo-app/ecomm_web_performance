import { useState } from "react"
import { Button } from "@mui/material"
import { OTPVerificationModal } from "./OTPModal"

const App = ({ btncolor, iconcolor, bgcolor,iconbgcolor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState("email")

  const handleVerify = (otp) => {
    console.log("Verifying OTP:", otp)
    setIsOpen(false)
  }

  const handleResend = () => {
    console.log("Resending OTP")
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button
        variant="contained"
        onClick={() => {
          setType("email")
          setIsOpen(true)
        }}
        style={{ marginRight: "10px" }}
      >
        Open Email OTP
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setType("mobile")
          setIsOpen(true)
        }}
      >
        Open Mobile OTP
      </Button>
      <OTPVerificationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={type}
        contactInfo={type === "email" ? "user@example.com" : "+1 234-567-8900"}
        buttonBgColor={btncolor}
        onVerify={handleVerify}
        onResend={handleResend}
        iconcolor={iconcolor}
        bgcolor={bgcolor}
        iconbgcolor={iconbgcolor}
      />
    </div>
  )
}

export default App

