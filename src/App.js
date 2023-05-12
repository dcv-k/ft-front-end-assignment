import "./App.css";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";

import WeatherWidgetController from "component/controllers/WeatherWidgetController";
import DetailsController from "component/controllers/DetailsController";
import PageLayout from "layout/PageLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<WeatherWidgetController />} />
      <Route path=":id" element={<DetailsController />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
