import { toast } from "react-toastify";
import { apiConnector } from "../apiConnecter";
import { propertyEndpoints } from "../api";

const {
    GET_ALL_PROPERTIES_API,
    GET_PROPERTY_BY_ID_API
} = propertyEndpoints;


export const getAllProperties = async() => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector('GET',GET_ALL_PROPERTIES_API);
        console.log(response)
        if(!response.data.success){
            throw new Error("Couldn't fetch all properties!")
        }

        result = response?.data?.data;

    } catch (error) {
        console.log("GET_ALL_PROPERTY_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const getPropertyByCode = async(pCode) => {
    const toastId = toast.loading('Loading...');
    let result = null;
    try {
        
        const response = await apiConnector('GET',GET_PROPERTY_BY_ID_API + pCode);
        if(!response?.data?.success){
            throw new Error("Unable to fetch property details");
        }
        result = response?.data?.data;

    } catch (error) {
        console.log("GET_PROPERTY_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}