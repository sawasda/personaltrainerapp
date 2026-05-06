import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createHashRouter, RouterProvider } from 'react-router';
import Customers from './pages/Customers.tsx';
import Trainings from './pages/Trainings.tsx';
import Home from './pages/Home.tsx';
import Error from './pages/Error.tsx';
import Calendar from './pages/Calendar.tsx';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />
      }
    ]
  }
], {
});

ReactDOM.createRoot(document.getElementById('root')!
).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>
);