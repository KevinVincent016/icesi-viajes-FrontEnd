import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';

import axios from 'axios';
import getUnsplashImage from "../services/UnSplash.ts";
import '../styles/PlanCard.css';

const PlanCard = ({ id, key, codigo, nombre, valor, imageSrc }) => {
  
    const [planImage, setPlanImage] = useState(imageSrc);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await getUnsplashImage(nombre);
                setPlanImage(image);
            } catch (error) {
                console.error('Error fetching Unsplash image:', error);
            }
        };

        fetchImage();
    }, [nombre]);

    const handleClick = () => {
        console.log("ID del plan:", key); // Agregar log para verificar el valor de id

        navigate(`/PlanDetailsPage/${id}`); // Redirige a la página de detalles del plan
    };

    return (
        <div className="plan-card" onClick={handleClick}>
            <div className="plan-card-title">
                <h3 className="card-ellipsis">{nombre}</h3>
            </div>
            <img
                loading="lazy"
                src={planImage}
                className="plan-image"
                alt="Plan"
            />
            <div className="plan-overlay">
                <button className="plan-card-select-button">Seleccionar</button>
            </div>
            <div className="plan-details">
                <p>{key}</p>
                <p>{codigo}</p>
                <p>$ {valor}</p>
            </div>
        </div>
    );
};

export default PlanCard;
