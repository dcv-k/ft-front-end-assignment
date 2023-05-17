import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import AppLayout from "./AppLayout";
import Dashboard from "component/Dashboard/Dashboard";
import Details from "component/Details/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Dashboard />} />
      <Route path=":id" element={<Details />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
