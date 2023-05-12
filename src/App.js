import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DetailsController from "component/controllers/DetailsController";
import PageLayout from "layout/PageLayout";
import DashboardController from "component/controllers/DashboardController";
import DetailsError from "component/views/DetailsError/DetailsError";
import { ErrorBoundary } from "react-error-boundary";
import WidgetError from "component/views/WidgetError/WidgetError";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
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
