import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import AppLayout from "./AppLayout";
import WidgetError from "./component/views/WidgetError/WidgetError";
import DetailsError from "./component/views/DetailsError/DetailsError";
import DetailsController from "./component/controllers/DetailsController";
import DashboardController from "./component/controllers/DashboardController";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route
        index
        element={
          <ErrorBoundary FallbackComponent={WidgetError}>
            <DashboardController />
          </ErrorBoundary>
        }
      />

      <Route
        path=":id"
        element={
          <ErrorBoundary FallbackComponent={DetailsError}>
            <DetailsController />
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
