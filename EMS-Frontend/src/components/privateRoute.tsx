import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type PrivateRoutProps = {
  children: ReactNode;
}

const PrivateRoute = ({children}: PrivateRoutProps) => {
  return localStorage.getItem('valid') ? children : <Navigate to='/' />
}

export default PrivateRoute;