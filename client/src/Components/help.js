
import React, { useState } from "react";
import "./help.css";

const HelpSupportPage = () => {
  const faqs = [
    { question: "How can I reset my password?", answer: "Click on 'Forgot Password' on the login page." },
    { question: "How do I add a new sensor?", answer: "Use the control panel and select 'Add Sensor'." },
    { question: "How can I enable notifications?", answer: "Go to settings and activate the notifications option." },
    { question: "What are the different sensor statuses?", answer: "Statuses include: Active, Inactive, or Maintenance Required." },
    { question: "What should I do if a sensor is not working?", answer: "Go to the Maintenance section and schedule a repair for the sensor." },
    { question: "How do I add a new admin?", answer: "From the control panel, select 'Manage Users' and add a new admin." },
    { question: "What are the features of the dashboard?", answer: "The dashboard displays real-time status of all sensors and alerts." },
    { question: "How can I download a PDF report?", answer: "Click on the 'Export to PDF' button in the Reports section." },
    { question: "How do I view the activity log?", answer: "Go to the Logs section in the control panel." },
    
  ];

  
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-card"
            onMouseEnter={() => setHoveredIndex(index)} 
            onMouseLeave={() => setHoveredIndex(null)} 
          >
            <h3 className="faq-question">{faq.question}</h3>
            {hoveredIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupportPage;
