const FoodCard = ({nombre, descripcion, fecha}) => {
    return (
        <div className="card mb-3 shadow-sm w-100">
          <div className="card-body d-flex align-items-center">
            {/* Miniatura */}
            <div className="me-3">
              <div style={{
                width: 50,
                height: 50,
                backgroundColor: "#e0e0e0",
                borderRadius: 10
              }} />
            </div>
    
            {/* Info */}
            <div>
              <h5 className="mb-1">{nombre}</h5>
              <p className="mb-1 text-muted">{descripcion}</p>
              <small className="text-secondary">{fecha}</small>
            </div>
          </div>
        </div>
      );
};

export default FoodCard;


