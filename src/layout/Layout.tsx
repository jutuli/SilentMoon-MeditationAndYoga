import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
