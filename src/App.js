import "./App.css";
import WeatherWidgetContainer from "./modules/dashboard";
import DetailsContainer from "modules/details";
import MainLayout from "layouts/PageLayout";
import { routes } from "routes/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
