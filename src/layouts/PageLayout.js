import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { PATH_LOGO } from "constants";
import Search from "components/Search/Search";
import ErrorJSON from "components/ErrorJSON/ErrorJSON";

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
          <ErrorBoundary FallbackComponent={ErrorJSON}>
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
