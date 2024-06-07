import React, { useState, useEffect } from 'react';
import getUnsplashImage from "../services/UnSplash.ts";
import ReservaCard from '../Componentes/ReservaCard.js';
import axios from 'axios';

const ViewReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [plan, setPlan] = useState({});
    const [imagenes, setImagenes] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5430/api/reservas/obtenerReservas`)
            .then(response => {
                setReservas(response.data);
            })
            .catch(error => {
                console.error('Error fetching reservas:', error);
            });
    }, []);

    return (
        <div className="plan-details-page">
            {reservas.map(reserva => {
                return (
                    <ReservaCard
                        id={reserva.idReserva}
                        key={reserva.idReserva}
                        nombre={plan ? plan.nombre : 'Cargando...'}
                        plan={reserva.idPlan}
                        personas={reserva.personas}
                        imageSrc={reserva.imgSrc}
                    />
                );
            })}
        </div>
    );
};

export default ViewReservas;
