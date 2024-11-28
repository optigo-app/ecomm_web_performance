import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchEstimateTax = async () => {
    try {
        const storedData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        const estimatedTaxId = storedData?.TaxId ?? 0

        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`, TaxId:`${estimatedTaxId}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"GetTax\",\"appuserid\":\"${storedData?.userid}\"}`,
            "f": "GetTax (Order Summary)",
            "p": encodedCombinedValue,
            "dp": combinedValue
        };
        const response = await CommonAPI(body);
        if (response.Data.rd) {
            return response.Data.rd;
        } else {
            // toast.error('Something went wrong');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};