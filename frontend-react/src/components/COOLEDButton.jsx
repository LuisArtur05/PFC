// src/components/COOLEDButton.jsx
import React from "react";

const COOLEDButton = ({ children, type = "button", onClick, className = "", style = {} }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-100 ${className}`}
            style={{
                backgroundColor: "var(--verde-cooled)",
                border: "none",
                padding: "0.75em",
                borderRadius: "8px",
                fontWeight: 600,
                color: "white",
                ...style
            }}
        >
            {children}
        </button>
    );
};

export default COOLEDButton;
