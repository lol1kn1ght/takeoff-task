import { Authorisation } from "components/Authorisation";
import { get_auth } from "hooks/get_auth";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { is_auth } = get_auth();
  return is_auth ? <Navigate to={"/dashboard"} /> : <Authorisation />;
};
