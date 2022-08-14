import { get_auth } from "hooks/get_auth";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { is_auth } = get_auth();
  if (!is_auth) return <Navigate to={"/"} />;

  return <>Dashboard</>;
};
