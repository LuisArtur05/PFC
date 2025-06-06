// src/components/ZonaUbicacion.jsx
// más tarde lo implemento
import React from 'react';
import FoodCard from './FoodCard';
import GroupedFoodCard from './GroupedFoodCard';

export default function ZonaUbicacion({
    nombreUbicacion,
    alimentos,
    busqueda,
    categoriaMap,
    zonaActiva,
    setZonaActiva,
    selectedItem,
    setSelectedItem,
    actualizarAlimento,
    eliminarAlimento,
    fetchAlimentos,
    handleRefrescarConToast
}) {

    const agruparPorNombre = (lista) =>
        lista.reduce((acc, alimento) => {
            const clave = alimento.nombre;
            acc[clave] = acc[clave] || [];
            acc[clave].push(alimento);
            return acc;
        }, {});

    const alimentosUbicacion = alimentos
        .filter(a => a.ubicacion === nombreUbicacion)
        .filter(a => {
            const q = busqueda.toLowerCase();
            const categoriaNombre = categoriaMap[a.categoria_id]?.toLowerCase() || "";
            return (
                a.nombre.toLowerCase().includes(q) ||
                (a.proveedor && a.proveedor.toLowerCase().includes(q)) ||
                categoriaNombre.includes(q)
            );
        });

    const agrupados = agruparPorNombre(alimentosUbicacion);

    return (
        <div
            className={`col-sm p-3 bg-white transition-all ${zonaActiva === nombreUbicacion ? 'border border-primary shadow-sm bg-light' : ''}`}
            onDragOver={(e) => {
                e.preventDefault();
                setZonaActiva(nombreUbicacion);
            }}
            onDragLeave={() => setZonaActiva(null)}
            onDrop={async (e) => {
                setZonaActiva(null);
                const data = e.dataTransfer.getData("text/plain");
                if (!data) return;
                const { id, ubicacion: origen } = JSON.parse(data);
                if (origen === nombreUbicacion) return;

                const usuarioId = localStorage.getItem("usuarioId");
                const alimento = alimentos.find(a => a.id_alimento === id);
                if (!alimento) return;

                const actualizado = {
                    ...alimento,
                    ubicacion: nombreUbicacion,
                    fecha_caducidad: null
                };

                await actualizarAlimento(id, usuarioId, actualizado);
                fetchAlimentos();
            }}
        >
            <h2 className="text-center">{nombreUbicacion}</h2>
            {Object.entries(agrupados).map(([nombreGrupo, lotes]) =>
                lotes.length === 1 ? (
                    <FoodCard
                        key={lotes[0].id_alimento}
                        {...lotes[0]}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", JSON.stringify({ id: lotes[0].id_alimento, ubicacion: lotes[0].ubicacion }));
                        }}
                        fecha={lotes[0].fecha_caducidad}
                        categoriaNombre={categoriaMap[lotes[0].categoria_id]}
                        onSelect={() => setSelectedItem(prev => prev?.id_alimento === lotes[0].id_alimento ? null : lotes[0])}
                        isSelected={selectedItem?.id_alimento === lotes[0].id_alimento}
                        onEliminar={async () => {
                            await eliminarAlimento(lotes[0].id_alimento);
                            setSelectedItem(null);
                            fetchAlimentos();
                        }}
                        onGuardar={async (alimentoEditado) => {
                            const usuarioId = localStorage.getItem("usuarioId");
                            await actualizarAlimento(lotes[0].id_alimento, usuarioId, {
                                ...lotes[0],
                                ...alimentoEditado
                            });
                            fetchAlimentos();
                            setSelectedItem(null);
                        }}
                        onRefrescar={handleRefrescarConToast}
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
                            setSelectedItem(null);
                            fetchAlimentos();
                        }}
                        onGuardar={async (original, editado) => {
                            const usuarioId = localStorage.getItem("usuarioId");
                            await actualizarAlimento(original.id_alimento, usuarioId, {
                                ...original,
                                ...editado
                            });
                            fetchAlimentos();
                            setSelectedItem(null);
                        }}
                    />
                )
            )}
        </div>
    );
}
