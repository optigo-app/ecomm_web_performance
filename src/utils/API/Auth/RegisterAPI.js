import { CommonAPI } from "../CommonAPI/CommonAPI";


export const RegisterAPI = async (firstName, lastName, email, mobileNo, hashedPassword,code) => {

    let response;

    try {
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const domainForNo = storeInit?.DomainForNo ?? "";
        const { FrontEnd_RegNo, IsB2BWebsite } = storeInit;
        const combinedValue = JSON.stringify({
            firstname: `${firstName}`, lastname: `${lastName}`, userid: `${(email).toLocaleLowerCase()}`, country_code: code ?? "91", mobileno: `${mobileNo}`, pass: `${hashedPassword}`, IsB2BWebsite: `${IsB2BWebsite}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: '0', DomainForNo: domainForNo
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