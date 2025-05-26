import jsPDF from "jspdf";

export function generarPegatinas(alimentos) {
    const doc = new jsPDF();
    const fechaHoy = new Date().toLocaleDateString("es-ES");

    const columnas = 4;
    const anchoEtiqueta = 48;  // mm aprox (A4 width ~210mm)
    const altoEtiqueta = 35;
    const margenX = 10;
    const margenY = 10;

    alimentos.forEach((alimento, index) => {
        const col = index % columnas;
        const fila = Math.floor(index / columnas) % 7; // 7 filas por página aprox
        const pagina = Math.floor(index / (columnas * 7));

        if (index > 0 && index % (columnas * 7) === 0) {
            doc.addPage();
        }

        const x = margenX + col * (anchoEtiqueta + 5);
        const y = margenY + fila * (altoEtiqueta + 5);

        doc.setFontSize(10);
        doc.text(` ${alimento.nombre}`, x + 12, y + 6);
        doc.text(` ${alimento.ubicacion}`, x + 1, y + 15);
        doc.text(` ${new Date(alimento.fecha_caducidad).toLocaleDateString("es-ES")}`, x + 1, y + 21);
        doc.text(` ${alimento.cantidad} ud.`, x + 1, y + 27);
        doc.text(` ${fechaHoy}`, x + 1, y + 33);

        // Borde opcional
        doc.rect(x, y, anchoEtiqueta, altoEtiqueta);
    });

    doc.save("pegatinas_cooled.pdf");
}
