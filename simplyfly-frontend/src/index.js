import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/ThemeDL.css";

import { GoogleOAuthProvider }
    from "@react-oauth/google";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    
        <GoogleOAuthProvider
            clientId="1067351260287-nmphicr56nifdjt57kbffdgrpmbjh0pl.apps.googleusercontent.com"
        >
            <App />
        </GoogleOAuthProvider>
    
);

reportWebVitals();