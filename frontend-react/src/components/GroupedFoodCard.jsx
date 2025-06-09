import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodCard from "./FoodCard";

const GroupedFoodCard = ({
    grupoNombre,
    lotes,
    onSelect,
    selectedItem,
    onEliminar,
    onGuardar,
    categoriaMap,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => {
        setIsOpen(false);
        onSelect(null);
    };

    const lotesOrdenados = [...lotes].sort(
        (a, b) => new Date(a.fecha_caducidad) - new Date(b.fecha_caducidad)
    );

    const visibleCard = lotesOrdenados[0];
    const stackedCard = lotesOrdenados[1];

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    >
                        <div
                            className="d-flex justify-content-center align-items-start pt-5 w-100 h-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                className="bg-white rounded shadow p-4 position-relative"
                                style={{ maxWidth: "600px", width: "90%" }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <button
                                    className="btn-close position-absolute"
                                    onClick={close}
                                    style={{ top: "10px", right: "10px" }}
                                />
                                <div className="mt-5 px-2">
                                    {lotesOrdenados.map((item) => (
                                        <FoodCard
                                            key={item.id_alimento}
                                            {...item}
                                            fecha={item.fecha_caducidad}
                                            categoriaNombre={categoriaMap[item.categoria_id]} // ✅ Imagen por categoría
                                            onSelect={() => onSelect(item)}
                                            isSelected={selectedItem?.id_alimento === item.id_alimento}
                                            onEliminar={() => onEliminar(item)}
                                            onGuardar={(alimentoEditado) =>
                                                onGuardar(item, alimentoEditado)
                                            }
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <div className="position-relative mb-4" style={{ zIndex: 1 }}>
                    <div
                        onClick={() => setIsOpen(true)}
                        className="mb-3"
                        style={{ cursor: "pointer" }}
                    >
                        <FoodCard
                            {...visibleCard}
                            nombre={grupoNombre}
                            fecha={visibleCard.fecha_caducidad}
                            categoriaNombre={categoriaMap[visibleCard.categoria_id]} // ✅
                            onSelect={() => onSelect(visibleCard)}
                            isSelected={
                                isOpen && selectedItem?.id_alimento === visibleCard.id_alimento
                            }
                        />
                    </div>

                    {stackedCard && (
                        <div
                            style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                width: "100%",
                                zIndex: -1,
                                pointerEvents: "none",
                            }}
                        >
                            <FoodCard
                                className="stacked"
                                {...stackedCard}
                                nombre={grupoNombre}
                                fecha={stackedCard.fecha_caducidad}
                                categoriaNombre={categoriaMap[stackedCard.categoria_id]} // ✅
                                isSelected={false}
                                onSelect={() => { }}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GroupedFoodCard;
