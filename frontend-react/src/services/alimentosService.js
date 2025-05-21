import api from "./axios";
import axios from "axios";

export const getAlimentoPorId = async () => {
    const response = await api.get(`/alimento/BuscarAlimento/${id}`);
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

export const eliminarAlimento = async (id) => {
    const response = await api.delete(`/alimento/eliminarAlimento/${id}`);
    return response.data;
};

export const actualizarAlimento = async (id_alimento, usuario_id, alimentoActualizado) => {
    const response = await api.put(
        `/alimento/actualizarAlimento/${id_alimento}/${usuario_id}`,
        alimentoActualizado
    );
    return response.data;
};
