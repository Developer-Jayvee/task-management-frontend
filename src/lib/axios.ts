import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout:8000,
    withCredentials:true,
    headers: {
        Accept: "application/json"
    }
});

http.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
)

http.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        return Promise.reject(error?.response?.data);
    }
);


export default http;
