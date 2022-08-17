import { Authorisation } from "components/Authorisation";
import { get_userdata } from "hooks/get_userdata";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { is_auth } = get_userdata();
  return is_auth ? <Navigate to={"/dashboard"} /> : <Authorisation />;
};
