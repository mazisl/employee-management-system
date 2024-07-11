import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { EmployeeProvider } from './contexts/employee.context.tsx';
import './index.css'
import './assets/icons.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
