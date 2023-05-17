import { Outlet } from "react-router-dom";
import { PATH_LOGO } from "constants";

const AppLayout = () => {
  document.title = "Weather App";

  return (
    <div className="container">
      <nav>
        <img className="logo" src={PATH_LOGO} alt="logo" />
        <p>Weather App</p>
      </nav>

      <section>
        <div className="search">
          <input placeholder="Enter a city"></input>
          <button>Add City</button>
        </div>
      </section>

      <div className="content">
        <section className="widgets">
          <Outlet />
        </section>
      </div>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default AppLayout;
