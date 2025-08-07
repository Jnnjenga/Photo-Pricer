import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    const handleStartSession = () => {
        navigate('/form');
    };

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to the Photo Pricing Assistant</h1>
            <p className="welcome-subtitle">
                Your ultimate guide to fair and competitive pricing for your photography sessions.
            </p>
            <button onClick={handleStartSession} className="welcome-button">
                Start Calculating
            </button>
        </div>
    );
};

export default Welcome;