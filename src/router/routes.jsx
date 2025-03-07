import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import Home from "../pages/Home";
import Parts from "../pages/Parts";
import Layout from "../components/Layouts";
import Customers from "../pages/Customers";
import Devices from "../pages/Devices";
import Laser from "../pages/Laser";
import Operator from "../pages/Operator";
import Pallets from "../pages/Pallets";
import Supervisor from "../pages/Supervisor";
import Warehouse from "../pages/Warehouse";
import Delivery from "../pages/Delivery";
import Analyst from "../pages/Analyst";
import Login from "../pages/Login";

const routes = createBrowserRouter([

  { path: "/Login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/Delivery", element: <Delivery /> },
      { path: "/parts", element: <Parts /> },
      { path: "/Devices", element: <Devices /> },
      { path: "/Pallets", element: <Pallets /> },
      { path: "/Warehouse", element: <Warehouse /> },
      { path: "/Laser", element: <Laser /> },
      { path: "/Supervisor", element: <Supervisor /> },
      { path: "/Operator", element: <Operator /> },
      { path: "/Analyst", element: <Analyst /> },
      { path: "/Customers", element: <Customers /> },
     
  





    ],
  },
]);

export default routes;
