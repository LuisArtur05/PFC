import api from "./axios";

export const getCategorias = async () => {
    const response = await api.get("/categoria/todas_categorias");
    return response.data;
};