import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './AuthComponents/register';
import Login from './AuthComponents/login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello World</div>,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]);

  return (
      <RouterProvider router={router} />);
}

export default App
