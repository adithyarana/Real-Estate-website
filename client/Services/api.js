const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

//Properties api
export const propertyEndpoints = {
    GET_ALL_PROPERTIES_API: BASE_URL + '/property/all',
    ADD_PROPERTY_API: BASE_URL + '/property',
    GET_PROPERTY_BY_ID_API : BASE_URL + '/property/:id',   //add :id => pCode
    DELETE_PROPERTY_API: BASE_URL + '/property/:propertyId',   //add :propertyId => id 
    UPDATE_PROPERTY_API: BASE_URL + '/property/:propertyId',   //add :propertyId => id 
}