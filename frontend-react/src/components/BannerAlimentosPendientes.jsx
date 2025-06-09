import { Alert, Button } from "react-bootstrap";

export default function BannerAlimentosPendientes({ cantidad, onClickMostrar }) {
    if (cantidad === 0) return null;

    return (
        <Alert
            variant="warning"
            dismissible
            onClose={onClickMostrar}
            className="rounded shadow-sm d-flex justify-content-between align-items-center"
        >
            <div>
                Tienes <strong>{cantidad}</strong> alimento(s) pendientes de colocar.
            </div>
            <Button variant="outline-warning" size="sm" onClick={onClickMostrar}>
                Mostrar
            </Button>
        </Alert>
    );
}
