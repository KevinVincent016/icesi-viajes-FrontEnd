import React, { useState } from 'react';

function HelpPage() {
  const [faqs, setFaqs] = useState([
    {
      question: "No se que preguntar xd",
      answer: "Mucho menos se que responder"
    },
    {
      question: "No se que preguntar xd",
      answer: "Mucho menos se que responder"
    },
    {
      question: "No se que preguntar xd",
      answer: "Mucho menos se que responder"
    },
    {
      question: "No se que preguntar xd",
      answer: "Mucho menos se que responder"
    }
    
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
