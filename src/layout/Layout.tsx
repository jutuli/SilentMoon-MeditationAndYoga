import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {

const location = useLocation()
const hideFooter = location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/welcome"

  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
