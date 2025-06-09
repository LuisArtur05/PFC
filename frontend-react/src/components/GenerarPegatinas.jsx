import jsPDF from "jspdf";

export function generarPegatinas(alimentos) {
    const doc = new jsPDF();
    const fechaHoy = new Date().toLocaleDateString("es-ES");

    const columnas = 4;
    const anchoEtiqueta = 48;
    const altoEtiqueta = 35;
    const margenX = 10;
    const margenY = 10;
    const espacioX = anchoEtiqueta + 5;
    const espacioY = altoEtiqueta + 5;

    alimentos.forEach((alimento, index) => {
        const col = index % columnas;
        const fila = Math.floor(index / columnas) % 7;
        const pagina = Math.floor(index / (columnas * 7));

        if (index > 0 && index % (columnas * 7) === 0) {
            doc.addPage();
        }

        const x = margenX + col * espacioX;
        const y = margenY + fila * espacioY;

        const fechaCad = new Date(alimento.fecha_caducidad).toLocaleDateString("es-ES");

        // Dibujo del fondo y borde
        doc.setFillColor(244, 244, 244); // #F4F4F4
        doc.setDrawColor(200);
        doc.rect(x, y, anchoEtiqueta, altoEtiqueta, "F");

        // Nombre (multilínea si necesario)
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        const nombreWrap = doc.splitTextToSize(alimento.nombre, anchoEtiqueta - 8); // 4px padding a cada lado
        doc.text(nombreWrap, x + 3, y + 8);

        // Calcular offset dinámico dependiendo de líneas del nombre
        const offsetY = 8 + nombreWrap.length * 5; // 5px por línea de texto

        // Info secundaria
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);

        doc.text(`Ubicación: ${alimento.ubicacion}`, x + 3, y + offsetY);
        doc.text(`Caduca: ${fechaCad}`, x + 3, y + offsetY + 6);
        doc.text(`Cantidad: ${alimento.cantidad} ud.`, x + 3, y + offsetY + 12);
        doc.setFontSize(7);
        doc.setTextColor(120);
        doc.text(`COOLED · ${fechaHoy}`, x + 3, y + offsetY + 18);
    });

    doc.save("pegatinas_cooled.pdf");
}
