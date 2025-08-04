import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Summary.css';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    const { hourlyRate, totalHours, totalEquipmentCost, otherExpenses, profitMargin } = location.state || {};

    if (!hourlyRate || !totalHours || !totalEquipmentCost || otherExpenses === undefined || profitMargin === undefined) {
        return (
            <div className="main-content">
                <div className="summary-container">
                    <h2>No data found!</h2>
                    <p>Please start a new session from the home page and fill out all the fields.</p>
                </div>
            </div>
        );
    }

    const totalTimeCost = hourlyRate * totalHours;
    const baselineCost = totalTimeCost + totalEquipmentCost + otherExpenses;
    const finalPrice = baselineCost * (1 + profitMargin / 100);
    const roundedStandardRate = Math.round(finalPrice / 5) * 5;

    return (
        <div className="main-content">
            <div className="summary-container">
                <h2>Your Price Estimate</h2>
                <div className="summary-item">
                    <h3>Total Time Cost:</h3>
                    <p className="summary-value">${totalTimeCost.toFixed(2)}</p>
                </div>
                <div className="summary-item">
                    <h3>Total Equipment Cost:</h3>
                    <p className="summary-value">${totalEquipmentCost.toFixed(2)}</p>
                </div>
                <div className="summary-item">
                    <h3>Total Other Expenses:</h3>
                    <p className="summary-value">${otherExpenses.toFixed(2)}</p>
                </div>
                <div className="summary-final">
                    <h3>Your Proposed Price:</h3>
                    <p className="summary-value">${roundedStandardRate.toFixed(2)}</p>
                </div>
                <p className="guidance">
                    This price was calculated by adding your Time Cost, Equipment Cost, and Other Expenses. The total was then multiplied by a {profitMargin}% profit margin, and the final result was rounded to the nearest $5.
                </p>
            </div>

            <div className="button-group">
                <button onClick={handlePrint} className="download-button">
                    Print Invoice
                </button>
                <button onClick={() => navigate('/')} className="start-button">
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default Summary;