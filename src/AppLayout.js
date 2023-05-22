import { Outlet } from "react-router-dom";
import { PATH_LOGO } from "constants";
import useApiHandler from "hooks/useApiHandler";

const AppLayout = () => {
  const { error } = useApiHandler();

  console.log(error);

  return (
    <div className="container">
      <nav>
        <img className="logo" src={PATH_LOGO} alt="logo" />
        <p>Weather App</p>
      </nav>

      {error && <div>{error}</div>}

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
