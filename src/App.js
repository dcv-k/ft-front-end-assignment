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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<DashboardController />} />
      <Route path=":id" element={<DetailsController />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
