import { toast } from 'react-toastify';
import { getAlimentoPorId, actualizarAlimento } from '../services/alimentosService';

export async function handleDropUbicacion({
    e,
    nombreUbicacion,
    zonaActivaSetter,
    alimentos,
    fetchAlimentos
}) {
    e.preventDefault();
    zonaActivaSetter(null);

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    const { id, ubicacion: origen } = JSON.parse(data);
    if (origen === nombreUbicacion) return;

    const usuarioId = localStorage.getItem("usuarioId");
    const alimento = alimentos.find((a) => a.id_alimento === id);
    if (!alimento) return;

    const actualizado = {
        ...alimento,
        ubicacion: nombreUbicacion,
    };

    await actualizarAlimento(id, usuarioId, actualizado);

    const alimentoFinal = await getAlimentoPorId(id);
    if (alimentoFinal?.fecha_caducidad) {
        const fechaFormateada = new Date(alimentoFinal.fecha_caducidad).toLocaleDateString("es-ES");

        if (origen === "Congelador") {
            toast.info(`Alimento descongelado. Nueva fecha de caducidad: ${fechaFormateada}`);
            toast.warn("Se recomienda evitar volver a congelar el alimento una vez descongelado.");
        } else {
            toast.success(`Ubicación actualizada. Nueva fecha de caducidad: ${fechaFormateada}`);
            toast.warn("Se recomienda no cambiar la ubicación del alimento más de una vez.");
        }
    }

    await fetchAlimentos();
}
