import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error && error.message && (/status code/i.test(error.message) || /request failed/i.test(error.message))) {
            error.message = "Unable to connect to the server. Please try again in a few moments.";
        }
        return Promise.reject(error);
    }
);

export default api;
