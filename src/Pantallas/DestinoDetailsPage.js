import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getUnsplashImage from "../services/UnSplash.ts";

const DestinoDetailsPage = () => {
    const { id } = useParams();
    const [destino, setDestino] = useState(null);
    const [img, setImg] = useState();
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        // Realizar una solicitud al backend para obtener los detalles del plan con el ID proporcionado
        axios.get(`http://localhost:5430/api/destinos/buscarDestino/${id}`)
            .then(response => {
                setDestino(response.data);
                setNombre(response.data.nombre)
            })
            .catch(error => {
                console.error('Error fetching plan details:', error);
            });
    }, [id]);

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const image = await getUnsplashImage(nombre);
            setImg(image);
        } catch (error) {
            console.error('Error fetching Unsplash image:', error);
        }
        };

        fetchImage();
    }, [nombre]);

    return (
        <div className="plan-details-page">
            {destino ? (
                <div className="plan-details-container">
                    <h2>{destino.nombre}</h2>
                    <img 
                        src={img} 
                        alt={destino.nombre} 
                        className="plan-details-image" 
                    />
                    <p>Nombre: {destino.nombre}</p>
                    <p>Descripcion: {destino.descripcion}</p>
                    <p>Fecha de Creacion: {destino.fechaCreacion}</p>
                    <p>estado: {destino.estado}</p>
                    {/* Aquí puedes mostrar otros detalles del plan según tus necesidades */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default DestinoDetailsPage;
