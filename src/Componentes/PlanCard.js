import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUnsplashImage from "../services/UnSplash.ts";
import '../styles/PlanCard.css';

const PlanCard = ({id, codigo, nombre, valor, imageSrc }) => {
  
    const [PlanImage, setPlanImage] = useState(imageSrc);
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
        navigate(`/event/${id}`);
    };

    return (
        <div className="plan-card">
            <div className="plan-card-title">
                <h3 className="card-ellipsis">{nombre}</h3>
            </div>
            <img
                loading="lazy"
                src={PlanImage}
                className="plan-image"
                alt="Plan"
            />
            <div className="plan-overlay">
                <button className="plan-card-select-button">Seleccionar</button>
            </div>
            <div className="plan-details">
                <p>{codigo}</p>
                <p>$ {valor}</p>
            </div>
        </div>
    );
};

export default PlanCard;