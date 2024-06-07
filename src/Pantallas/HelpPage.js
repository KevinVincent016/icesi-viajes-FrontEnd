import React, { useState } from 'react';

function HelpPage() {
  const [faqs, setFaqs] = useState([
    {
      question: "¿Cómo puedo añadir un nuevo destino?",
      answer: "Para añadir un nuevo destino, dirígete a la sección 'Destinos' en el menú principal y selecciona 'Añadir Destinos'. Completa el formulario con la información del nuevo destino y haz clic en 'Guardar'."
    },
    {
      question: "¿Cómo se modifican los datos de un usuario?",
      answer: "Para modificar los datos de un usuario, ve a la sección 'Usuarios' en el menú principal y selecciona 'Modificar Usuarios'. Busca el usuario que deseas modificar, haz clic en 'Editar' y actualiza la información necesaria."
    },
    {
      question: "¿Cómo puedo ver todas las reservas realizadas?",
      answer: "Para ver todas las reservas realizadas, dirígete a la sección 'Reservas' en el menú principal y selecciona 'Ver Reservas'. Aquí podrás ver una lista de todas las reservas, así como detalles específicos de cada una."
    },
    {
      question: "¿Cómo contacto al soporte técnico?",
      answer: "Puedes contactar al soporte técnico a través del número de teléfono +1 234 567 890 o enviando un correo electrónico a ayuda@icesiviajes.com."
    },
  ]);

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <h3>{question}</h3>
        {isOpen && <p>{answer}</p>}
      </div>
    );
  };

  return (
    <div className="help-page">
      <h2>Contacto de Ayuda</h2>
      <div className="contact-info">
        <p>Puedes contactarnos a través del siguiente número de teléfono o correo electrónico:</p>
        <p>Número de Teléfono: +1 234 567 890</p>
        <p>Correo Electrónico: ayuda@icesiviajes.com</p>
      </div>
      <div className="faq-section">
        <h3 className="faq-title">Preguntas Frecuentes</h3>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default HelpPage;
