const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

//Properties api
export const propertyEndpoints = {
    GET_ALL_PROPERTIES_API: BASE_URL + '/property/all',
    ADD_PROPERTY_API: BASE_URL + '/property',
    GET_PROPERTY_BY_ID_API : BASE_URL + '/property/:id',   //add :id => pCode
    DELETE_PROPERTY_API: BASE_URL + '/property/:propertyId',   //add :propertyId => id 
    UPDATE_PROPERTY_API: BASE_URL + '/property/:propertyId',   //add :propertyId => id 
}

export const projectEndpoints = {
    GET_PUBLISHED_PROJECTS_API: BASE_URL + '/project/published',
    GET_PROJECT_BY_SLUG_API: BASE_URL + '/project/slug',
    GET_ADMIN_PROJECTS_API: BASE_URL + '/project/admin/all',
    GET_ADMIN_PROJECT_API: BASE_URL + '/project/admin',
    CREATE_PROJECT_API: BASE_URL + '/project',
    UPDATE_PROJECT_API: BASE_URL + '/project',
    STATUS_PROJECT_API: BASE_URL + '/project',
    ARCHIVE_PROJECT_API: BASE_URL + '/project',
    DELETE_PROJECT_API: BASE_URL + '/project',
}