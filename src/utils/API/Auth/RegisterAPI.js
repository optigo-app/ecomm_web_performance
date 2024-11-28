import { CommonAPI } from "../CommonAPI/CommonAPI";


export const RegisterAPI = async (firstName, lastName, email, mobileNo, hashedPassword) => {

    let response;

    try {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { FrontEnd_RegNo, IsB2BWebsite } = storeInit;
        const combinedValue = JSON.stringify({
            firstname: `${firstName}`, lastname: `${lastName}`, userid: `${(email).toLocaleLowerCase()}`, country_code: '91', mobileno: `${mobileNo}`, pass: `${hashedPassword}`, IsB2BWebsite: `${IsB2BWebsite}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: '0'
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WEBSIGNUP\"}",
            "f": "Register (handleSubmit)",
            "p": encodedCombinedValue,
            "dp": combinedValue,
        }
        response = await CommonAPI(body);
    } catch (error) {
        console.error('Error:', error);
    }
    return response;
}