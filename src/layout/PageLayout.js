import Search from "component/views/Search/Search";
import WidgetError from "component/views/WidgetError/WidgetError";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { PATH_LOGO } from "utils/constants";

const PageLayout = () => {
  document.title = "Weather App";

  return (
    <div className="container">
      <nav>
        <img className="logo" src={PATH_LOGO} alt="logo" />
        <p>Weather App</p>
      </nav>

      <section>
        <Search />
      </section>

      <div className="content">
        <section className="widgets">
          <ErrorBoundary FallbackComponent={WidgetError}>
            <Outlet />
          </ErrorBoundary>
        </section>
      </div>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default PageLayout;
