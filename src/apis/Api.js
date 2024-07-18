import axios from "axios";

// Create an instance of axios with default configurations
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Configuration for axios requests that require authorization
const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

// Helper function to log errors
const logError = (error) => {
    console.error("API call failed. Error:", error.response ? error.response.data : error.message);
};

// Creating test API
export const testApi = () => Api.get("/test").catch(logError);

// Creating register API
export const registerApi = (data) => Api.post("/api/user/create", data).catch(logError);

// Create login API
export const loginApi = (data) => Api.post("/api/user/login", data).catch(logError);

// Create change password API
export const changePasswordApi = (data) => Api.post("/api/user/changepassword", data).catch(logError);

// Create profile API 
export const profileApi = (data) => Api.post("/api/user/profile", data, config).catch(logError);

// Create edit profile API 
export const editprofileApi = (data) => Api.post("/api/user/editprofile", data, config).catch(logError);

// Create product API
export const createProductApi = (formData) => Api.post('/api/product/create_product', formData, config).catch(logError);

// Get all products API
export const getAllProductsApi = () => Api.get('/api/product/get_products').catch(logError);

// Get cart API
export const cartApi = () => Api.get('/api/product/cart', config).catch(logError);

// Get single product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`).catch(logError);

// Update product API
export const updateProductApi = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData, config).catch(logError);

// Delete product API
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config).catch(logError);

// Add to cart (create order) API
export const create_order = (orderData) => Api.post(`/api/product/create_order`, orderData, config).catch(logError);

// Get all orders for a user API
export const getallorderapi = (userId) => Api.get(`/api/orders/${userId}`, config).catch(logError);

// Get all user orders API (assuming it's the same as getallorderapi)
export const getAllUserorderApi = (userId) => Api.get(`/api/orders/${userId}`, config).catch(logError);

// Get favorites API
export const getFavoritesApi = (userId) => Api.get(`/api/user/favorites/${userId}`, config).catch(logError);
