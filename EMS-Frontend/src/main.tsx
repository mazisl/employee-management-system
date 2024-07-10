import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AddEmployeeProvider } from './contexts/addEmployee.context.tsx';
import './index.css'
import './assets/icons.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AddEmployeeProvider>
        <App />
      </AddEmployeeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
