import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { AuthProvider } from './Contexts/AuthContext';
import { NotificationProvider } from './Contexts/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NotificationProvider>
  // </React.StrictMode>
)
