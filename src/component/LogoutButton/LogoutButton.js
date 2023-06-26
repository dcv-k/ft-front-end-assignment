import { useAuth0 } from "@auth0/auth0-react";
import { PATH_LOGOUT } from "constants";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div className="btn" onClick={() => logout()}>
      <img src={PATH_LOGOUT}></img>
    </div>
  );
};

export default LogoutButton;
