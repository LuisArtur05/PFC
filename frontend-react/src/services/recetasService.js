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

export async function actualizarReceta(usuarioId, idReceta, recetaDTO) {
  const response = await api.put(`recetas/${usuarioId}/${idReceta}`, recetaDTO);
  return response.data;
}


export const eliminarReceta = async (receta_id) => {
  const response = await api.delete(`/recetas/Eliminar/${receta_id}`);
  return response.data
};


export const generarRecetaConIA = async (alimentos) => {
  try {
    console.log("Alimentos recibidos:", alimentos);

    const prompt = `Tengo estos alimentos: ${alimentos.join(", ")}. ¿Puedes darme una receta con sentido, no hace falta que uses todos los alimentos, algo rico. dame el Nombre,Alimentos,Instrucciones,Tiempo de preparacion, D : ificultad:(Fácil,Media,Difícil),Precio(Valor numerico). damelo en formato json y sin responder a nada más`;

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
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error 401 Unauthorized: Token inválido o expirado.");
    } else {
      console.error("Error generando receta con IA:", error.message);
    }
    throw error;  // Re-lanzar error para manejarlo más arriba si quieres
  }
};