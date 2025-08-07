import React from 'react';
import './Invoice.css';

const Invoice = ({
    clientName,
    projectName,
    invoiceNumber,
    pricingModel,
    hourlyRate,
    totalHours,
    totalTimeCost,
    totalEquipmentCost,
    otherExpenses,
    subtotalCosts,
    profitAmount,
    totalBeforeTax,
    serviceTaxRate,
    taxAmount,
    roundedFinalPrice,
    flatFee,
}) => {
    // Determine the current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <div className="invoice-header-left">
                    <h1>Invoice</h1>
                    <p className="invoice-number">Invoice #: {invoiceNumber}</p>
                </div>
                <div className="invoice-header-right">
                    <p className="invoice-date">Date: {formattedDate}</p>
                    {clientName && <p className="invoice-client">Client: {clientName}</p>}
                    {projectName && <p className="invoice-project">Project: {projectName}</p>}
                </div>
            </div>

            <div className="invoice-section">
                <h2>Invoice Details</h2>
                {pricingModel === 'hourly' ? (
                    <div className="invoice-table">
                        <div className="table-header">
                            <span className="description">Description</span>
                            <span className="rate">Rate</span>
                            <span className="hours">Hours</span>
                            <span className="amount">Amount</span>
                        </div>
                        <div className="table-row">
                            <span className="description">Time Cost</span>
                            <span className="rate">${hourlyRate.toFixed(2)}/hr</span>
                            <span className="hours">{totalHours}</span>
                            <span className="amount">${totalTimeCost.toFixed(2)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="invoice-table">
                        <div className="table-header">
                            <span className="description">Description</span>
                            <span className="amount">Amount</span>
                        </div>
                        <div className="table-row">
                            <span className="description">Flat Fee</span>
                            <span className="amount">${flatFee.toFixed(2)}</span>
                        </div>
                    </div>
                )}
                <div className="invoice-costs">
                    <div className="cost-row">
                        <p>Equipment Depreciation:</p>
                        <p>${totalEquipmentCost.toFixed(2)}</p>
                    </div>
                    <div className="cost-row">
                        <p>Other Expenses:</p>
                        <p>${otherExpenses.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="invoice-summary">
                <div className="summary-row subtotal">
                    <span>Subtotal:</span>
                    <span>${totalBeforeTax.toFixed(2)}</span>
                </div>
                <div className="summary-row tax">
                    <span>Service Tax ({serviceTaxRate}%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row final-total">
                    <span>Total:</span>
                    <span>${roundedFinalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default Invoice;