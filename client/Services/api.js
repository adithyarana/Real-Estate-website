const BASE_URL = "http://localhost:4000/api"

//Properties api
export const propertyEndpoints = {
    GET_ALL_PROPERTIES_API: BASE_URL + '/property/all',
    ADD_PROPERTY_API: BASE_URL + '/property',
    GET_PROPERTY_BY_ID_API : BASE_URL + '/property/',   //add :id => pCode
    DELETE_PROPERTY_API: BASE_URL + '/property/',   //add :propertyId => id 
    UPDATE_PROPERTY_API: BASE_URL + '/property/',   //add :propertyId => id 
}