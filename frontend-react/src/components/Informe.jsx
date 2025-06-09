import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Convertir imagen a base64
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

export async function Informe(alimentos) {
  const doc = new jsPDF();

  // Cargar imagen
  const imageBase64 = await loadImageAsBase64("/img/Logotipo_COOLED.png");

  // Crear imagen HTML para conocer dimensiones reales
  const tempImg = new Image();
  tempImg.src = imageBase64;
  await new Promise((resolve) => tempImg.onload = resolve);

  // Calcular proporción de la imagen
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = 50;
  const width = maxWidth;
  const height = maxWidth * (tempImg.height / tempImg.width);
  const x = (pageWidth - width) / 2;

  doc.addImage(imageBase64, "PNG", x, 10, width, height);

  const headers = [
    ["Nombre", "Fecha de Caducidad", "Cantidad", "Precio (€)", "Proveedor", "Ubicación"]
  ];

  const ubicaciones = ["Frigorifico", "Congelador", "Despensa"];
  let lastY = 10 + height + 10;

  for (const ubicacion of ubicaciones) {
    const filtrados = alimentos.filter(a => a.ubicacion === ubicacion);
    if (filtrados.length === 0) continue;

    const total = filtrados.reduce((acc, a) => acc + (a.precio || 0), 0);

    const rows = filtrados.map(a => [
      a.nombre || "-",
      new Date(a.fecha_caducidad).toLocaleDateString("es-ES"),
      a.cantidad || 0,
      a.precio?.toFixed(2) || "0.00",
      a.proveedor || "-",
      a.ubicacion || "-"
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      foot: [[
        {
          content: `Valor total en ${ubicacion}: ${total.toFixed(2)} €`,
          colSpan: 6,
          styles: { halign: 'left' }
        }
      ]],
      startY: lastY + 10,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      footStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: 'bold' },
      didDrawPage: (data) => {
        lastY = data.cursor.y;
      }
    });
  }

  doc.save("alimentos.pdf");
}
