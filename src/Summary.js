import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Summary.css';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    const { hourlyRate, totalHours, totalEquipmentCost, otherExpenses, profitMargin, serviceTaxRate } = location.state || {};

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

    // Calculations
    const totalTimeCost = hourlyRate * totalHours;
    const subtotalCosts = totalTimeCost + totalEquipmentCost + otherExpenses;
    const profitAmount = subtotalCosts * (profitMargin / 100);
    const totalBeforeTax = subtotalCosts + profitAmount;
    const taxAmount = totalBeforeTax * (serviceTaxRate / 100);
    const finalPrice = totalBeforeTax + taxAmount;
    const roundedFinalPrice = Math.round(finalPrice / 5) * 5;

    return (
        <div className="main-content">
            <div className="summary-container">
                <h2>Your Price Estimate</h2>

                <div className="detailed-breakdown">
                    <h3>Invoice Breakdown</h3>
                    <div className="summary-item">
                        <p className="summary-label">Time Cost ({totalHours} hours @ ${hourlyRate.toFixed(2)}/hr):</p>
                        <p className="summary-value">${totalTimeCost.toFixed(2)}</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Equipment Depreciation:</p>
                        <p className="summary-value">${totalEquipmentCost.toFixed(2)}</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Other Expenses:</p>
                        <p className="summary-value">${otherExpenses.toFixed(2)}</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Subtotal:</p>
                        <p className="summary-value">${subtotalCosts.toFixed(2)}</p>
                    </div>
                    <div className="summary-item profit-item">
                        <p className="summary-label">Profit ({profitMargin}%):</p>
                        <p className="summary-value">${profitAmount.toFixed(2)}</p>
                    </div>
                    <div className="summary-item">
                        <p className="summary-label">Total Before Tax:</p>
                        <p className="summary-value">${totalBeforeTax.toFixed(2)}</p>
                    </div>
                    <div className="summary-item tax-item">
                        <p className="summary-label">Service Tax ({serviceTaxRate}%):</p>
                        <p className="summary-value">${taxAmount.toFixed(2)}</p>
                    </div>
                </div>

                <div className="summary-final">
                    <h3>Your Proposed Price:</h3>
                    <p className="summary-value">${roundedFinalPrice.toFixed(2)}</p>
                </div>
                <p className="guidance">
                    This price was calculated by adding your Time Cost, Equipment Cost, and Other Expenses, then adding a {profitMargin}% profit margin and {serviceTaxRate}% service tax. The final result was rounded to the nearest $5.
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