import { CommonAPI } from "../CommonAPI/CommonAPI";

export const WebSignUpOTPVerify = async (userid, mobileno, OTP) => {

    let response;
    try {
        const dp = {
            userid: userid || '',
            mobileno: mobileno || '',
                   OTP: OTP || ''
        };
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WebSignUpOTPVerify\"}",
            "f": "zen (cartcount)",
            dp: JSON.stringify(dp)
        };
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;
}