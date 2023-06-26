import { Outlet } from "react-router-dom";
import { PATH_LOGO } from "constants";
import LogoutButton from "component/LogoutButton/LogoutButton";

const AppLayout = () => {
  return (
    <div className="container">
      <div className="logout-wrap">
        <LogoutButton />
      </div>
      <nav>
        <img className="logo" src={PATH_LOGO} alt="logo" />
        <p>Weather App</p>
      </nav>

      <div className="content">
        <Outlet />
      </div>

      <footer>
        <p>2023 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default AppLayout;
