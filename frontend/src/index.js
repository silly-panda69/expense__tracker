import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import ExpenseTotalContextProvider from './contexts/ExpenseTotalContext';
import ExpenseContextProvider from './contexts/ExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpenseTotalContextProvider>
          <ExpenseContextProvider>
            <App></App>
          </ExpenseContextProvider>
      </ExpenseTotalContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

