import api from "../config/axios.config";

export const initialize = async (data) => {
    const res = await api.post('/insight', data);
    return res.data;
}

export const countPagevisit = async () => {
    const res = await api.patch('/insight/visit', {});
    return res.data;
}