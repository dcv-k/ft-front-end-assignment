import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import AppLayout from "./AppLayout";
import WidgetError from "./component/WidgetError/WidgetError";
import DetailsError from "./component/DetailsError/DetailsError";
import Dashboard from "component/Dashboard/Dashboard";
import Details from "component/Details/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route
        index
        element={
          <ErrorBoundary FallbackComponent={WidgetError}>
            <Dashboard />
          </ErrorBoundary>
        }
      />

      <Route
        path=":id"
        element={
          <ErrorBoundary FallbackComponent={DetailsError}>
            <Details />
          </ErrorBoundary>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
