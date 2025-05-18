import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from './Pages/hero';

import AppLayout from './Components/AppLayout'
import ErrorPage from './pages/errorPage'
import Login from './Pages/login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Hero />
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />
      },
      {
        path: "login",
        element: <Login />

      },
      // {
      //   path: "menu",
      //   element: <Menu />

      // },
      // {
      //   path: "booking",
      //   element: <BookingPage />

      // },
      // {
      //   path: "private",
      //   element: <Private/>

      // },
     
      // {
      //   path: "contact",
      //   element: <Contact />
      // },
      
    ],

  }

])

const App = () => {


  return (
    
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App