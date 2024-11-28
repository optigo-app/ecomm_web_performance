import { CommonAPI } from "../CommonAPI/CommonAPI";

export const WebLoginWithMobileToken = async (ismobiletoke) => {

    let response
    try {
        const combinedValue = JSON.stringify({
            userid: '', mobileno: '', pass: '', mobiletoken: `${ismobiletoke}`, FrontEnd_RegNo: ''
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WEBLOGINMOBILETOKEN\"}",
            "f": "WEBLOGINMOBILETOKEN (handleSubmit)",
            p: encodedCombinedValue,
            dp: combinedValue
        };
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}