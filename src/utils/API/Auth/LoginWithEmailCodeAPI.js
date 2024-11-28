import { CommonAPI } from "../CommonAPI/CommonAPI";


export const LoginWithEmailCodeAPI = async (storedEmail) => {
    let response
    try {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            userid: storedEmail, FrontEnd_RegNo: FrontEnd_RegNo
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            con: "{\"id\":\"\",\"mode\":\"WEBSCEMAIL\"}",
            f: "LoginWithEmailCode (firstTimeOTP)",
            p: encodedCombinedValue,
            "dp": combinedValue,

        };
         response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;
}