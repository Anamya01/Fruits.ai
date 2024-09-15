import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AboutPage.css';
import '../Styles/base.css';

export default function AboutPage() {
  return (
    <div className="about-container">
      <div className="card about-card">
        <h1 className="about-title">About Fruit.ai</h1>
        <div className="about-content">
          <p>
            Welcome to Fruit.ai, your ultimate destination for all things fruit-related! We are passionate about promoting healthy eating habits and increasing awareness about the wonderful world of fruits.
          </p>
          <p>
          Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our Al-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
          </p>
        </div>
        <Link to="/home" className="btn back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}