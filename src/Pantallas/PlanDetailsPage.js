import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getUnsplashImage from "../services/UnSplash.ts";

const PlanDetailsPage = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [img, setImg] = useState();
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5430/api/planes/buscarPlan/${id}`)
            .then(response => {
                setPlan(response.data);
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
            {plan ? (
                <div className="plan-details-container">
                    <h2>{plan.nombre}</h2>
                    <img 
                        src={img} 
                        alt={plan.nombre} 
                        className="plan-details-image" 
                    />
                    <p>Código: {plan.codigo}</p>
                    <p>Descripcion Solicitud: {plan.descripcionSolicitud}</p>
                    <p>Cantidad de personas: {plan.cantidadPersonas}</p>
                    <p>Valor: {plan.valorTotal}</p>
                    <p>Fecha de Solicitud: {plan.fechaSolicitud}</p>
                    <p>Fecha de Inicio de Viaje: {plan.fechaInicioViaje}</p>
                    <p>Fecha de Finalización de Viaje: {plan.fechaFinViaje}</p>
                    <p>Estado: {plan.estado}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default PlanDetailsPage;
