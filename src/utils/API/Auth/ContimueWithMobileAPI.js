import { CommonAPI } from "../CommonAPI/CommonAPI";



export const ContimueWithMobileAPI = async (mobileNo) => {

    let response;
    try {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
            country_code: '91', mobileno: `${mobileNo}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WEBVALDNMOBILE\"}",
            "f": "continueWithMobile (handleSubmit)",
            p: encodedCombinedValue,
            "dp": combinedValue,

        };

         response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }

    return response;

}