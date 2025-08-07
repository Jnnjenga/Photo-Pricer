import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
    const navigate = useNavigate();

    // Initialize state with values from local storage for persistent data
    const [hourlyRate, setHourlyRate] = useState(() => localStorage.getItem('hourlyRate') || '');
    const [tier, setTier] = useState(() => localStorage.getItem('tier') || 'Beginner');
    const [cameraCost, setCameraCost] = useState(() => localStorage.getItem('cameraCost') || '');
    const [lensCost, setLensCost] = useState(() => localStorage.getItem('lensCost') || '');
    const [droneCost, setDroneCost] = useState(() => localStorage.getItem('droneCost') || '');
    const [serviceTaxRate, setServiceTaxRate] = useState(() => localStorage.getItem('serviceTaxRate') || '');


    // Initialize state with empty strings for session-specific data
    const [preShootHours, setPreShootHours] = useState('');
    const [shootTimeHours, setShootTimeHours] = useState('');
    const [postShootHours, setPostShootHours] = useState('');
    const [otherExpenses, setOtherExpenses] = useState('');
    const [profitMargin, setProfitMargin] = useState('');

    const ESTIMATED_USES = 100;

    const tierHourlyRates = {
        'Beginner': { min: 25, max: 100 },
        'Amateur': { min: 100, max: 200 },
        'Pro': { min: 200, max: 500 }
    };

    const suggestedRateRange = tierHourlyRates[tier];
    const suggestedHourlyRate = suggestedRateRange.min;

    const totalHours =
        Number(preShootHours) + Number(shootTimeHours) + Number(postShootHours);

    const totalEquipmentCost = (
        Number(cameraCost) +
        Number(lensCost) +
        Number(droneCost)
    ) / ESTIMATED_USES;

    // Use a single useEffect hook to save only persistent data to local storage
    useEffect(() => {
        localStorage.setItem('hourlyRate', hourlyRate);
        localStorage.setItem('tier', tier);
        localStorage.setItem('cameraCost', cameraCost);
        localStorage.setItem('lensCost', lensCost);
        localStorage.setItem('droneCost', droneCost);
        localStorage.setItem('serviceTaxRate', serviceTaxRate);
    }, [hourlyRate, tier, cameraCost, lensCost, droneCost, serviceTaxRate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const state = {
            hourlyRate: parseFloat(hourlyRate) || suggestedHourlyRate,
            totalHours: totalHours,
            totalEquipmentCost: totalEquipmentCost,
            otherExpenses: parseFloat(otherExpenses),
            profitMargin: parseFloat(profitMargin) || 20,
            serviceTaxRate: parseFloat(serviceTaxRate) || 0
        };
        navigate('/summary', { state });
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Session Details</h2>
                    <div className="form-group">
                        <label>
                            Select your tier:
                            <select
                                value={tier}
                                onChange={(e) => setTier(e.target.value)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Amateur">Amateur</option>
                                <option value="Pro">Pro</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Hourly Rate ($):
                            <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                placeholder={`e.g., ${suggestedRateRange.min} - ${suggestedRateRange.max}`}
                                required
                            />
                        </label>
                        <p className="guidance">
                            The suggested rate for your tier is ${suggestedRateRange.min} - ${suggestedRateRange.max}.
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Estimated Time (Hours):</label>
                        <div className="time-inputs">
                            <label>
                                Pre-shoot
                                <input
                                    type="number"
                                    value={preShootHours}
                                    onChange={(e) => setPreShootHours(e.target.value)}
                                    placeholder="0"
                                />
                            </label>
                            <label>
                                Shoot Time
                                <input
                                    type="number"
                                    value={shootTimeHours}
                                    onChange={(e) => setShootTimeHours(e.target.value)}
                                    placeholder="0"
                                />
                            </label>
                            <label>
                                Post-shoot
                                <input
                                    type="number"
                                    value={postShootHours}
                                    onChange={(e) => setPostShootHours(e.target.value)}
                                    placeholder="0"
                                />
                            </label>
                        </div>
                        <p className="guidance">
                            These are the total hours for planning, shooting, and editing.
                        </p>
                        <p className="total-hours">
                            Total Hours: <strong>{totalHours}</strong>
                        </p>
                    </div>
                    <h2 className="form-title">Equipment Costs</h2>
                    <p className="description">
                        Add the total cost of your gear. The per-session cost will be calculated for you based on an estimated {ESTIMATED_USES} uses.
                    </p>
                    <div className="form-group">
                        <label>
                            Camera Cost ($):
                            <input
                                type="number"
                                value={cameraCost}
                                onChange={(e) => setCameraCost(e.target.value)}
                                placeholder="e.g., 5000"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Lens Cost ($):
                            <input
                                type="number"
                                value={lensCost}
                                onChange={(e) => setLensCost(e.target.value)}
                                placeholder="e.g., 2500"
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Drone/Extra Gear ($):
                            <input
                                type="number"
                                value={droneCost}
                                onChange={(e) => setDroneCost(e.target.value)}
                                placeholder="e.g., 1000"
                            />
                        </label>
                    </div>
                    <div className="total-equipment-cost">
                        Calculated Equipment Cost Per Session: <strong>${totalEquipmentCost.toFixed(2)}</strong>
                    </div>
                    <h2 className="form-title">Other Costs</h2>
                    <div className="form-group">
                        <label>
                            Total Other Expenses ($):
                            <input
                                type="number"
                                value={otherExpenses}
                                onChange={(e) => setOtherExpenses(e.target.value)}
                                required
                            />
                        </label>
                        <p className="guidance">
                            Include costs for travel, props, permits, or other miscellaneous items.
                        </p>
                    </div>
                    <h2 className="form-title">Profit & Taxes</h2>
                    <div className="form-group">
                        <label>
                            Desired Profit Margin (%):
                            <input
                                type="number"
                                value={profitMargin}
                                onChange={(e) => setProfitMargin(e.target.value)}
                                placeholder="e.g., 20"
                            />
                        </label>
                        <p className="guidance">
                            The profit margin is calculated as a percentage of your total costs.
                        </p>
                    </div>
                    <div className="form-group">
                        <label>
                            Service Tax Rate (%):
                            <input
                                type="number"
                                value={serviceTaxRate}
                                onChange={(e) => setServiceTaxRate(e.target.value)}
                                placeholder="e.g., 8.25"
                            />
                        </label>
                        <p className="guidance">
                            Enter the service tax rate for your region. This will be applied to the total price before rounding.
                        </p>
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={() => navigate('/')} className="back-button">
                            Back
                        </button>
                        <button type="submit" className="submit-button">
                            Calculate Price
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;