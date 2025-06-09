import React, { useState } from "react";
import FoodCard from "./FoodCard";
import GroupedFoodCard from "./GroupedFoodCard";
import { handleDropUbicacion } from "../utils/alimentoUtils";

export default function ZonasNevera({
    alimentos,
    categorias,
    busqueda,
    selectedItem,
    setSelectedItem,
    actualizarAlimento,
    eliminarAlimento,
    onRefrescar,
}) {
    const [zonaActiva, setZonaActiva] = useState(null);

    const categoriaMap = Object.fromEntries(
        categorias.map(cat => [cat.id_categoria, cat.nombre])
    );


    const ubicaciones = ["Frigorifico", "Congelador", "Despensa"];

    const agruparPorNombre = (lista) =>
        lista.reduce((acc, alimento) => {
            const clave = alimento.nombre;
            acc[clave] = acc[clave] || [];
            acc[clave].push(alimento);
            return acc;
        }, {});

    const renderUbicacion = (nombreUbicacion) => {
        const alimentosUbicacion = alimentos
            .filter((a) => a.ubicacion === nombreUbicacion)
            .filter((a) => {
                const q = busqueda.toLowerCase();
                const categoriaNombre =
                    categoriaMap[a.categoria_id]?.toLowerCase() || "";
                return (
                    a.nombre.toLowerCase().includes(q) ||
                    (a.proveedor && a.proveedor.toLowerCase().includes(q)) ||
                    categoriaNombre.includes(q)
                );
            });

        const agrupados = agruparPorNombre(alimentosUbicacion);

        return (
            <div
                key={nombreUbicacion}
                className={`col-md-4 p-3 transition-all ${zonaActiva === nombreUbicacion
                    ? "border border-primary bg-light shadow-sm"
                    : "bg-white"
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setZonaActiva(nombreUbicacion);
                }}
                onDragLeave={() => setZonaActiva(null)}
                onDrop={(e) =>
                    handleDropUbicacion({
                        e,
                        nombreUbicacion,
                        zonaActivaSetter: setZonaActiva,
                        alimentos,
                        fetchAlimentos: onRefrescar,
                    })
                }
            >
                <h4 className="text-center mb-3">{nombreUbicacion}</h4>
                {Object.entries(agrupados).map(([nombreGrupo, lotes]) =>
                    lotes.length === 1 ? (
                        <FoodCard
                            key={lotes[0].id_alimento}
                            {...lotes[0]}
                            fecha={lotes[0].fecha_caducidad}
                            categoriaNombre={categoriaMap[lotes[0].categoria_id]}
                            isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                            onSelect={() =>
                                setSelectedItem(
                                    selectedItem?.id_alimento === lotes[0].id_alimento
                                        ? null
                                        : lotes[0]
                                )
                            }
                            onEliminar={async () => {
                                await eliminarAlimento(lotes[0].id_alimento);
                                onRefrescar();
                            }}
                            onGuardar={async (alimentoEditado) => {
                                const usuarioId = localStorage.getItem("usuarioId");
                                await actualizarAlimento(lotes[0].id_alimento, usuarioId, {
                                    ...lotes[0],
                                    ...alimentoEditado,
                                });
                                onRefrescar();
                            }}
                            onRefrescar={onRefrescar}
                            draggable
                            onDragStart={(e) =>
                                e.dataTransfer.setData(
                                    "text/plain",
                                    JSON.stringify({
                                        id: lotes[0].id_alimento,
                                        ubicacion: lotes[0].ubicacion,
                                    })
                                )
                            }
                        />
                    ) : (
                        <GroupedFoodCard
                            key={nombreGrupo}
                            grupoNombre={nombreGrupo}
                            lotes={lotes}
                            selectedItem={selectedItem}
                            onSelect={setSelectedItem}
                            onEliminar={async (alimento) => {
                                await eliminarAlimento(alimento.id_alimento);
                                onRefrescar();
                            }}
                            onGuardar={async (original, editado) => {
                                const usuarioId = localStorage.getItem("usuarioId");
                                await actualizarAlimento(original.id_alimento, usuarioId, {
                                    ...original,
                                    ...editado,
                                });
                                onRefrescar();
                            }}
                            categoriaMap={categoriaMap}
                        />

                    )
                )}
            </div>
        );
    };

    return <div className="row">{ubicaciones.map(renderUbicacion)}</div>;
}
