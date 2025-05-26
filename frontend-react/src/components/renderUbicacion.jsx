const renderUbicacion = (nombreUbicacion) => {
    const alimentosUbicacion = alimentos.filter(a => a.ubicacion === nombreUbicacion);
    const agrupados = agruparPorNombre(alimentosUbicacion);

    return (
        <div
            key={nombreUbicacion}
            className="col-sm p-3 bg-white"
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
                const { id, ubicacion: origen } = JSON.parse(e.dataTransfer.getData("text/plain"));
                if (origen === nombreUbicacion) return;

                const usuarioId = localStorage.getItem("usuarioId");
                const alimento = alimentos.find(a => a.id_alimento === id);
                if (!alimento) return;

                const actualizado = {
                    ...alimento,
                    ubicacion: nombreUbicacion,
                    fecha_caducidad: null // deja que el trigger la calcule
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
                        onSelect={() =>
                            setSelectedItem(
                                selectedItem?.id_alimento === lotes[0].id_alimento ? null : lotes[0]
                            )
                        }
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
                                ...alimentoEditado,
                            });
                            fetchAlimentos();
                            setSelectedItem(null);
                        }}
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
};
