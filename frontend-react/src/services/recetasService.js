import api from "./axios";
import axios from "axios";

export const getRecetasPorUsuario = async (usuarioId) => {
    const response = await api.get(`/recetas/usuario/${usuarioId}`);
    return response.data;
};
export const postReceta = async (receta) => {
    const response = await api.post("recetas/CrearReceta", receta);
    return response.data;
};

export const generarRecetaConIA = async (alimentos) => {
    const prompt = `Tengo estos alimentos: ${alimentos.join(", ")}. ¿Puedes darme una receta con ellos dandome el Nombre,Alimentos,Instrucciones,Tiempo de preparacion, D : ificultad:(Fácil,Media,Difícil),Precio(Valor numerico). damelo en formato json y sin responder a nada más`;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: "deepseek/deepseek-chat",
            messages: [{ role: "user", content: prompt }],
        },
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
        }
    );

    return response.data.choices[0].message.content;
};