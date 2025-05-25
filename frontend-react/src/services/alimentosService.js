import api from "./axios";
import axios from "axios";

export const getAlimentoPorId = async () => {
    const response = await api.get(`/alimento/BuscarAlimento/${id}`);
    return response.data;
};

export const crearAlimento = async (alimento) => {
    const response = await api.post("/alimento/crearAlimento/nevera", alimento);
    return response.data;
};

export const crearAlimento_lista = async (alimento) => {
    const response = await api.post("/alimento/crearAlimento/lista", alimento);
    return response.data;
};


export const getAlimentosPorUsuario = async (usuarioId) => {
    const response = await api.get(`/alimento/BuscarAlimentosPorUsuario/nevera/${usuarioId}`);
    return response.data;
};

export const getAlimentosPorUsuario_Litsa = async (usuarioId) => {
    const response = await api.get(`/alimento/BuscarAlimentosPorUsuario/lista/${usuarioId}`);
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

export const actualizarNevera_A_Lista = async (id_usuario,id_alimento) => {
    const response = await api.put(`/alimento/cambiarNeveraALista/${id_usuario}/${id_alimento}`);
    return response.data;
};

export const actualizarLista_A_Nevera = async (id_usuario,id_alimento) => {
    const response = await api.put(`/alimento/cambiarListaANevera/${id_usuario}/${id_alimento}`);
    return response.data;
};
export const getNombresAlimentosSinCaducar = async (usuarioId) => {
    const response = await api.get(`/alimento/BuscarNombresAlimentosSinCaducar/${usuarioId}`);
    return response.data;
};

export const getPrecioUbicacion =async (usuarioId) => {
    const response = await api.get(`/alimento/PrecioPorUbicacion/${usuarioId}`)
    return response.data;
}
