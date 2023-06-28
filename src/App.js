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
    return <div class="loader"></div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="login-card-wrap">
          <div className="login-card">
            <p className="title">Welcome to the Weather App</p>
            <p className="body">
              <div className="login-btn" onClick={loginWithRedirect}>
                Login
              </div>
            </p>
            <p className="footer">Fidenz academy</p>
          </div>
        </div>
      </>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
