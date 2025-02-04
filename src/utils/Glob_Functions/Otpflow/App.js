import { useState } from "react"
import { Button } from "@mui/material"
import { OTPVerificationModal } from "./OTPModal"
import { WebSignUpOTPVerify } from "../../API/Auth/WebSignUpOTPVerify"


const App = ({ btncolor, iconcolor, bgcolor, iconbgcolor, isOpen, setIsOpen = false, type = "email", mobileNo = '', emailId = '', onClose = () => { }, navigation, location }) => {
  const otpLength = 4;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);

  const handleVerify = async (otp) => {
    setloading(true)
    setmessage("")
    const userid = type === "email" ? emailId : '';
    const mobileno = type === "mobile" ? mobileNo : '';
    const search = location?.search;
    const redirectSignUpUrl = `/register/${search}`;

    try {
      const response = await WebSignUpOTPVerify(userid, mobileno, otp);
      if (response?.Data?.rd[0]?.stat == 1 || response?.Data?.rd[0]?.stat == "success") {
        setmessage("Verification Successfull")
        navigation(redirectSignUpUrl, { state: { email: emailId } });
        onClose();
      } else {
        console.log("OTP Verification Failed:", response);
        setmessage("Invalid OTP")
        setloading(false)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setmessage("something went wrong")
      setloading(false)
    }
  };

  const handleResend = async () => {
    const contact = type === "email" ? emailId : mobileNo;
    WebSignUpOTPVerify().then((res) => {
      console.log(res, "res")
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <OTPVerificationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={type}
        contactInfo={type === "email" ? emailId : mobileNo}
        buttonBgColor={btncolor}
        onVerify={handleVerify}
        onResend={handleResend}
        iconcolor={iconcolor}
        bgcolor={bgcolor}
        iconbgcolor={iconbgcolor}
        otp={otp}
        setOtp={setOtp}
        message={message}
        loading={loading}
      />
    </div>
  )
}

export default App

