import WeatherWidgetContainer from "../modules/dashboard";
import DetailsContainer from "../modules/details";
import MainLayout from "layouts/PageLayout";
import { Route, createRoutesFromElements } from "react-router-dom";

export const routes = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route index element={<WeatherWidgetContainer />} />
    <Route path=":id" element={<DetailsContainer />} />
  </Route>
);
