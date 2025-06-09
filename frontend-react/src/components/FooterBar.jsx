import { Button } from "react-bootstrap";

export default function FooterBar({ mostrarBotonPegatinas, onDownloadClick, onInformeClick }) {
    return (
        <div
            className="footer-bar-container d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm flex-wrap"
            style={{
                position: "sticky",
                bottom: 0,
                zIndex: 100,
                borderTop: "1px solid #eaeaea",
                marginTop: "auto",
            }}
        >
            <span className="text-muted small">COOLED · Tu despensa digital</span>

            <div className="d-flex gap-2 flex-wrap">
                {onInformeClick && (
                    <Button variant="outline-secondary" size="sm" onClick={onInformeClick}>
                        Informe PDF
                    </Button>
                )}

                {mostrarBotonPegatinas && onDownloadClick && (
                    <Button variant="outline-primary" size="sm" onClick={onDownloadClick}>
                        Descargar Pegatinas
                    </Button>
                )}
            </div>
        </div>
    );
}
