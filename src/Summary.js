import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom/client';
import './Summary.css';
import Invoice from './Invoice';

const Summary = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [invoiceNumber, setInvoiceNumber] = useState('');

    // Generate a new invoice number on component mount
    useEffect(() => {
        const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');
        const newInvoiceNumber = lastInvoiceNumber ? parseInt(lastInvoiceNumber) + 1 : 1;
        const formattedInvoiceNumber = `INV-${String(newInvoiceNumber).padStart(3, '0')}`;

        setInvoiceNumber(formattedInvoiceNumber);
        localStorage.setItem('lastInvoiceNumber', newInvoiceNumber);
    }, []);

    const generatePdf = () => {
        const invoiceContainer = document.createElement('div');
        invoiceContainer.style.position = 'absolute';
        invoiceContainer.style.left = '-9999px';
        document.body.appendChild(invoiceContainer);

        const root = ReactDOM.createRoot(invoiceContainer);

        root.render(
            <Invoice
                clientName={location.state?.clientName}
                projectName={location.state?.projectName}
                invoiceNumber={invoiceNumber}
                pricingModel={location.state?.pricingModel}
                hourlyRate={location.state?.hourlyRate}
                totalHours={location.state?.totalHours}
                totalTimeCost={totalTimeCost}
                totalEquipmentCost={totalEquipmentCost}
                otherExpenses={location.state?.otherExpenses}
                subtotalCosts={subtotalCosts}
                profitAmount={profitAmount}
                totalBeforeTax={totalBeforeTax}
                serviceTaxRate={location.state?.serviceTaxRate}
                taxAmount={taxAmount}
                roundedFinalPrice={roundedFinalPrice}
                flatFee={location.state?.flatFee}
            />
        );

        // Wait a moment for the component to render before capturing
        setTimeout(() => {
            html2canvas(invoiceContainer, { scale: 2 })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth() - 16; // 8mm on each side
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 8, 8, pdfWidth, pdfHeight);
                    pdf.save("invoice.pdf");
                })
                .finally(() => {
                    root.unmount();
                    document.body.removeChild(invoiceContainer);
                });
        }, 500);
    };

    const {
        pricingModel,
        hourlyRate,
        totalHours,
        totalEquipmentCost,
        otherExpenses,
        profitMargin,
        serviceTaxRate,
        flatFee,
        clientName,
        projectName,
    } = location.state || {};

    // Check if data is available based on the selected pricing model
    if (!pricingModel || (pricingModel === 'hourly' && (!hourlyRate || !totalHours)) || (pricingModel === 'flat-fee' && !flatFee)) {
        return (
            <div className="main-content">
                <div className="summary-container">
                    <h2>No data found!</h2>
                    <p>Please start a new session from the home page and fill out all the fields.</p>
                </div>
            </div>
        );
    }

    // Declare all variables at the top
    let totalTimeCost = 0;
    let subtotalCosts = 0;
    let profitAmount = 0;
    let totalBeforeTax = 0;
    let finalPrice = 0;
    let roundedFinalPrice = 0;
    let taxAmount = 0;

    // Calculations based on pricing model
    if (pricingModel === 'hourly') {
        totalTimeCost = hourlyRate * totalHours;
        subtotalCosts = totalTimeCost + totalEquipmentCost + otherExpenses;
        profitAmount = subtotalCosts * (profitMargin / 100);
        totalBeforeTax = subtotalCosts + profitAmount;
    } else { // flat-fee
        subtotalCosts = totalEquipmentCost + otherExpenses;
        profitAmount = flatFee - subtotalCosts;
        totalBeforeTax = flatFee;
    }

    taxAmount = totalBeforeTax * (serviceTaxRate / 100);
    finalPrice = totalBeforeTax + taxAmount;
    roundedFinalPrice = Math.round(finalPrice / 5) * 5;

    // Updated guidance message to be conditional based on pricing model
    const guidanceMessage = pricingModel === 'hourly'
        ? `This price was calculated by adding your Time Cost, Equipment Cost, and Other Expenses, then adding a ${profitMargin}% profit margin and ${serviceTaxRate}% service tax. The final result was rounded to the nearest $5.`
        : `This flat fee includes your Equipment Cost, and Other Expenses. The final price was calculated by adding a ${serviceTaxRate}% service tax to the flat fee and rounding to the nearest $5.`;

    return (
        <div className="main-content">
            <div className="summary-container" id="summary-container">
                <h2>Your Price Estimate</h2>

                <div className="invoice-header">
                    <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
                    {clientName && <p><strong>Client:</strong> {clientName}</p>}
                    {projectName && <p><strong>Project:</strong> {projectName}</p>}
                </div>

                <div className="detailed-breakdown">
                    <h3>Invoice Breakdown</h3>
                    {pricingModel === 'hourly' ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <div className="summary-item">
                                <p className="summary-label">Flat Fee:</p>
                                <p className="summary-value">${flatFee.toFixed(2)}</p>
                            </div>
                            <div className="summary-item">
                                <p className="summary-label">Equipment Depreciation:</p>
                                <p className="summary-value">${totalEquipmentCost.toFixed(2)}</p>
                            </div>
                            <div className="summary-item">
                                <p className="summary-label">Other Expenses:</p>
                                <p className="summary-value">${otherExpenses.toFixed(2)}</p>
                            </div>
                            <div className="summary-item profit-item">
                                <p className="summary-label">Calculated Profit:</p>
                                <p className="summary-value">${profitAmount.toFixed(2)}</p>
                            </div>
                        </>
                    )}
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
                    {guidanceMessage}
                </p>
            </div>

            <div className="button-group">
                <button onClick={generatePdf} className="download-button">
                    Download Invoice as PDF
                </button>
                <button onClick={() => navigate('/')} className="start-button">
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default Summary;