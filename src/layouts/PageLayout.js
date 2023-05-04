import Search from "components/search/Search";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

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
          <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
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
