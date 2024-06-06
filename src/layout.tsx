import { Link, Outlet } from "react-router-dom";
import AuthStatus from "./components/AuthStatus";

export default function Layout() {
    return (
      <div className="p-6">
        <AuthStatus />
        <Outlet />
      </div>
    );
  }