import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Form from './Form';
import Summary from './Summary';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/form" element={<Form />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;