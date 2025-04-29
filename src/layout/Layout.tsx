import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  const showFooter =
    location.pathname === "/home" ||
    location.pathname === "/meditate" ||
    location.pathname === "/yoga" ||
    location.pathname === "/music" ||
    location.pathname === "/profile";

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex grow flex-col">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
