import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "component/Dashboard/Dashboard";
import Details from "component/Details/Details";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Dashboard />} />
      <Route path=":id" element={<Details />} />
    </Route>
  )
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <RouterProvider router={router} />;
}

export default App;
