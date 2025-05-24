import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // Importa el hook

const ReturnButton = () => {
    const navigate = useNavigate();  // Inicializa navegación

    const handleClick = () => {
        navigate("/recetas");  // Redirecciona al hacer clic
    };

    return (
        <StyledWrapper>
            <button className="cssbuttons-io-button" onClick={handleClick}>
                <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2L5 9h3v4h4V9h3z" fill="currentColor" />
                </svg>
                <span>Return</span>
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    display: flex;
    align-items: center;
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    padding: 0.7em 1.4em 0.7em 1.1em;
    color: white;
    background: #e1bee7;
    background: linear-gradient(
      0deg,
      rgba(156, 73, 198, 1) 0%,
      rgba(210, 148, 255, 1) 100%
    );
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em #8c4a97;
    letter-spacing: 0.05em;
    border-radius: 20em;
  }

  .cssbuttons-io-button svg {
    margin-right: 6px;
  }

  .cssbuttons-io-button:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #8c4a97;
  }

  .cssbuttons-io-button:active {
    box-shadow: 0 0.3em 1em -0.5em #8c4a97;
  }
`;

export default ReturnButton;
