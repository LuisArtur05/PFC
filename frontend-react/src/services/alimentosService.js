import api from "./axios";

export const getAlimentoPorId = async () => {
    const response = await api.get("/alimento/BuscarAlimento/${id}");
    return response.data;
};

export const crearAlimento = async (alimento) => {
    const response = await api.post("/alimento/crearAlimento", alimento);
    return response.data;
};

export const getAlimentosPorUsuario = async (usuarioId) => {
    const response = await api.get(`/alimento/BuscarAlimentosPorUsuario/${usuarioId}`);
    return response.data;
};
