import api from "../config/axios.config"

export const sendEnquiry = async (data) => {
    const res = await api.post('/enquiry', data);
    return res.data; s
}