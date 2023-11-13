import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage';
import DormPage from './pages/DormPage';
import ExperiencePage from './pages/ExperiencePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
          <React.StrictMode>
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/dorm/:dormId" element={<DormPage/>}/>
        <Route path="/experience/:experienceId" element={<ExperiencePage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
    </UserProvider>

);


