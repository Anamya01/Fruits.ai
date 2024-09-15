import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/FAQPage.css';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('https://fruits-ai-q32r.onrender.com/faqs');
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateFAQ(editingId);
    } else {
      await createFAQ();
    }
  };

  const createFAQ = async () => {
    try {
      const response = await fetch('https://fruits-ai-q32r.onrender.com/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      if (!response.ok) {
        throw new Error('Failed to create FAQ');
      }
      fetchFAQs();
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  const updateFAQ = async (id) => {
    try {
      const response = await fetch(`https://fruits-ai-q32r.onrender.com/faqs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      if (!response.ok) {
        throw new Error('Failed to update FAQ');
      }
      fetchFAQs();
      setNewQuestion('');
      setNewAnswer('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const deleteFAQ = async (id) => {
    try {
      const response = await fetch(`https://fruits-ai-q32r.onrender.com/faqs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete FAQ');
      }
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const startEditing = (faq) => {
    setEditingId(faq.id);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  return (
    <div className="faq-container">
      <div className="card faq-card">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer-container">
                  <p className="faq-answer">{faq.answer}</p>
                  <div className="faq-actions">
                    <button onClick={() => startEditing(faq)} className="btn btn-edit">Edit</button>
                    <button onClick={() => deleteFAQ(faq.id)} className="btn btn-delete">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="faq-form">
          <h2>{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea
              id="answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-submit">
            {editingId ? 'Update FAQ' : 'Add FAQ'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setNewQuestion('');
              setNewAnswer('');
            }} className="btn btn-cancel">
              Cancel Edit
            </button>
          )}
        </form>
        <Link to="/home" className="btn back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}