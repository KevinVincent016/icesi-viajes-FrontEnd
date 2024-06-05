import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUnsplashImage from "../services/UnSplash.ts";
import '../styles/DestinoCard.css';

const DestinoCard = ({id, codigo, nombre, imageSrc }) => {
  
    const [DestinoImage, setDestinoImage] = useState(imageSrc);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const image = await getUnsplashImage(nombre);
            setDestinoImage(image);
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
        <div className="destino-card">
        <img
            loading="lazy"
            src={DestinoImage}
            className="destino-image"
            alt="Destino"
        />
        <div className="destino-overlay">
            <button className="destino-card-select-button">Seleccionar</button>
        </div>
        <div className="destino-details">
            <p>{codigo}</p>
            <p>{nombre}</p>
        </div>
        </div>
    );
};

export default DestinoCard;