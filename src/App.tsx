import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Yoga from "./pages/Yoga";
import Meditate from "./pages/Meditate";
import Music from "./pages/Music";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="yoga" element={<Yoga />} />
        <Route path="meditate" element={<Meditate />} />
        <Route path="music" element={<Music />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
