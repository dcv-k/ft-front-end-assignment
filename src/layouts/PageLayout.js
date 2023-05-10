import ErrorJSON from "components/error/ErrorJSON";
import Search from "components/search/Search";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  document.title = "Weather App";

  return (
    <div className="container">
      <nav>
        <img className="logo" src="/images/logo.png" alt="logo" />
        <p>Weather App</p>
      </nav>

      <section>
        <Search />
      </section>

      <div className="content">
        <section className="tiles">
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
