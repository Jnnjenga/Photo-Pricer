import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
    const navigate = useNavigate();
    const [hourlyRate, setHourlyRate] = useState('');
    const [preShootHours, setPreShootHours] = useState('');
    const [shootTimeHours, setShootTimeHours] = useState('');
    const [postShootHours, setPostShootHours] = useState('');
    const [cameraCost, setCameraCost] = useState('');
    const [lensCost, setLensCost] = useState('');
    const [droneCost, setDroneCost] = useState('');
    const [otherExpenses, setOtherExpenses] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const [tier, setTier] = useState('Beginner');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const state = {
            hourlyRate: parseFloat(hourlyRate) || suggestedHourlyRate,
            totalHours: totalHours,
            totalEquipmentCost: totalEquipmentCost,
            otherExpenses: parseFloat(otherExpenses),
            profitMargin: parseFloat(profitMargin) || 20
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
                    </div>
                    <div className="form-group">
                        <label>Estimated Time (Hours):</label>
                        <div className="time-inputs">
                            <input
                                type="number"
                                value={preShootHours}
                                onChange={(e) => setPreShootHours(e.target.value)}
                                placeholder="Pre-shoot"
                            />
                            <input
                                type="number"
                                value={shootTimeHours}
                                onChange={(e) => setShootTimeHours(e.target.value)}
                                placeholder="Shoot Time"
                            />
                            <input
                                type="number"
                                value={postShootHours}
                                onChange={(e) => setPostShootHours(e.target.value)}
                                placeholder="Post-shoot"
                            />
                        </div>
                        <p className="total-hours">
                            Total Hours: <strong>{totalHours}</strong>
                        </p>
                    </div>
                    <h2 className="form-title">Equipment Costs</h2>
                    <p className="description">
                        Add the total cost of your gear. The per-session cost will be calculated for you.
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
                        Calculated Equipment Cost: <strong>${totalEquipmentCost.toFixed(2)}</strong>
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
                    <h2 className="form-title">Profit Margin</h2>
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
                            This percentage will be added on top of your total costs.
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