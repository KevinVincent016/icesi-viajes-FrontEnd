import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUnsplashImage from "../services/UnSplash.ts";

const ReservaCard = ({id, nombre, plan, personas, imageSrc }) => {
  
    const [reservaImage, setReservaImage] = useState(imageSrc);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchImage = async () => {
        try {
            const image = await getUnsplashImage(nombre);
            setReservaImage(image);
        } catch (error) {
            console.error('Error fetching Unsplash image:', error);
        }
        };

        fetchImage();
    }, [nombre]);
    
    const handleClick = () => {
       
        navigate(`/DestinoDetailsPage/${id}`);
    };

    return (
        <div className="plan-details-page">
            {plan ? (
                <div className="plan-details-container">
                    <h2>{nombre}</h2>
                    <img 
                        src={reservaImage} 
                        alt="reserva"
                        className="plan-details-image" 
                    />
                    <p>Nombre del plan reservado:</p>
                    <p>{plan.nombre}</p>
                    <p>Descripcion del plan reservado:</p>
                    <p>{plan.descripcion}</p>
                    <p>Personas registradas</p>
                    <p>{personas}</p>
                    <p>Fecha de Creacion del plan reservado:</p>
                    <p>{plan.fechaCreacion}</p>
                    <p>estado: {plan.estado}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ReservaCard;