import api from "../config/axios.config"

export const getFeedbacks = async (limit = 3, offset) => {
    const res = await api.get(`/feedback/?limit=${limit}&offset=${offset}`);
    return res.data;
}