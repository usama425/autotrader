import {
  postRequest,
  getRequest,
  postWithFormRequest,
  getFilterRequest,
  deleteRequest,
} from '../index';

// Endpoints for Auth
export const registerAPI = payload => postWithFormRequest('/register', payload);
export const loginAPI = payload => postWithFormRequest('/login', payload);
export const socialLoginAPI = payload =>
  postWithFormRequest('/social-auth', payload);
export const fetchUserById = id => postRequest(`/fetch_users_by_id/${id}`);
export const updateUserById = (id, payload) =>
  postWithFormRequest(`/update_user_by_id/${id}`, payload);
export const fetchRegions = () => postRequest('/fetch_all_regions');
export const fetchRegionsById = id =>
  postRequest(`/fetch_regions_by_pid/${id}`);
export const fetchAllCategories = () => postRequest('/fetch_all_category');
export const fetchMakes = id => postRequest(`/fetch_makes_by_cid/${id}`);
export const fetchModels = id => postRequest(`/fetch_models_by_mid/${id}`);
export const fetchBodyTypes = id =>
  postRequest(`/fetch_bodytypes_by_cid/${id}`);
export const postListing = payload => postRequest('/post_listing', payload);
export const fetchAllAdditionalFeatures = () =>
  postRequest('/fetch_all_additional_features');
export const getListing = (payload, page) =>
  postWithFormRequest(`/search_listings?page=${page}`, payload, page);
export const postListinImages = payload =>
  postWithFormRequest('/post_listing_images', payload);
export const relatedPosts = payload =>
  postWithFormRequest('/fetch_related_listings_by_cid', payload);
export const fetchListingImages = id =>
  postRequest(`/fetch_listing_images_by_lid/${id}`);
export const fetchDealerListing = (payload, id, page) =>
  postRequest(`/fetch_listing_by_uid/${id}?page=${page}`, payload, id, page);
export const fetchNotifications = () => postRequest('/fetch_all_notification');
export const fetchListingById = id => postRequest(`/fetch_listing_by_id/${id}`);
export const fetchMakesForHomeScreen = id =>
  postRequest(`/fetch_specific_makes_by_cid/${id}`);
export const fetchAllParts = () => postRequest('/fetch_all_parts');
export const fetchUsersByCategory = (payload, page) =>
  postWithFormRequest(`/getUsersByCategory?page=${page}`, payload, page);
export const changeUserPassword = (payload, id) =>
  postWithFormRequest(`change_user_password/${id}`, payload);
export const fetchServices = () => postRequest('/fetch_services');
export const fetchServiceCompanyById = id =>
  postRequest(`/fetch_service_company_by_sid/${id}`);
export const deleteAllNotifications = payload =>
  postWithFormRequest('/delete-all-notifications', payload);
