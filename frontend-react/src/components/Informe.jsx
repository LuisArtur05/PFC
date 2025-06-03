import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

// Función auxiliar para convertir imagen a base64
async function loadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Función principal para generar el PDF
export async function Informe(alimentos) {
  const doc = new jsPDF();

  // Cargar imagen del logo
  const imageBase64 = await loadImageAsBase64("/IMG_COOLED_CUT.PNG");

  // Calcular posición centrada
  const pageWidth = doc.internal.pageSize.getWidth();
  const imageWidth = 50;
  const imageX = (pageWidth - imageWidth) / 2;

  // Añadir imagen
  doc.addImage(imageBase64, 'PNG', imageX, 10, imageWidth, 30);

  const headers = [
    ["Nombre", "Fecha de Caducidad", "Cantidad", "Precio (€)", "Proveedor", "Ubicación"]
  ];

  const ubicaciones = ["Frigorifico", "Congelador", "Despensa"];

  ubicaciones.forEach((ubicacion, index) => {
    const alimentosFiltrados = alimentos.filter(a => a.ubicacion === ubicacion);

    if (alimentosFiltrados.length > 0) {
      const sumatorio = alimentosFiltrados.reduce((acc, a) => acc + a.precio, 0);

      const rows = alimentosFiltrados.map(a => [
        a.nombre,
        a.fecha_caducidad,
        a.cantidad,
        a.precio,
        a.proveedor,
        a.ubicacion
      ]);

      const footer = [{
        content: `Valor total de alimentos en ${ubicacion}: ${sumatorio.toFixed(2)} €`,
        colSpan: 6,
        styles: { halign: 'left' }
      }];

      const offsetY = index === 0 ? 50 : doc.lastAutoTable.finalY + 10;

      autoTable(doc, {
        head: headers,
        body: rows,
        foot: [footer],
        startY: offsetY + 5,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
        footStyles: {
          fontStyle: 'bold',
          textColor: [255, 255, 255],
          fillColor: [22, 160, 133]
        }
      });
    }
  });

  doc.save("alimentos.pdf");
}
