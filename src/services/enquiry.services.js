import api from "../config/axios.config"

export const sendEnquiry = async (data) => {
    const res = await api.post('/enquiry', data);
    return res.data;
}

export const countWhatsappClicks = async () => {
    const res = await api.patch('/insight/click', {});
    return res.data;
}