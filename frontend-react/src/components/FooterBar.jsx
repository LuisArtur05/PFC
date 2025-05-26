import { Button } from "react-bootstrap";

export default function FooterBar({ onDownloadClick }) {
    return (
        <div className="d-flex justify-content-end align-items-center px-4 py-2 shadow-sm bg-white sticky-bottom" style={{ zIndex: 1030, border: '1px solid #e0e0e0' }}>
            <Button variant="primary" onClick={onDownloadClick}>
                Descargar Pegatinas
            </Button>
        </div>
    );
}
