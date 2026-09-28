import api from "../config/axios.config"

export const getFeedbacks = async (limit = 3, offset) => {
    const res = await api.get(`/feedback/?limit=${limit}&offset=${offset}`);
    return res.data;
}

export const getLinkByToken = async (token) => {
    const res = await api.get(`feedback/link/${token}`);
    return res.data;
}

export const submitFeedback = async (data, token) => {
    const res = await api.post(`/feedback/${token}`, data);
    return res.data;
}