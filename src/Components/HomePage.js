import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

const services = [
  { name: 'Chat', description: 'Personal chatbot for fruit information',link: '/chat' },
  { name: 'Translator', description: 'Translate fruit names to regional languages', link: '/translator' },
  { name: 'FAQ', description: 'Frequently asked questions about fruits', link: '/faq' },
  { name: 'About', description: 'Learn more about our app Fruit.ai', link: '/about' },
];

export default function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Fruit.ai</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.name} className="card service-card">
            <h2 className="service-title">
              {service.name}
            </h2>
            <p className="service-description">{service.description}</p>
            <Link to={service.link} className="btn service-link">
              Go to {service.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}