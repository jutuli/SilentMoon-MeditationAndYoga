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
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Reminder from "./pages/Reminder";
import MeditateDetail from "./pages/MeditateDetail";
import YogaDetail from "./pages/YogaDetail";
import InitialFiltering from "./pages/InitialFiltering";
import AudioPlayer from "./pages/AudioPlayer";
import VideoPlayer from "./pages/VideoPlayer";
import { useMainContext } from "./context/MainProvider";
import supabase from "./utils/supabase";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { setIsLoggedIn, user, isLoggedIn, setUser } = useMainContext();
  console.log(user);

  const checkLoginStatus = async () => {
    const { data: user } = await supabase.auth.getUser();

    const { data: yogaUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.user?.id);

    if (error) {
      console.log("Der Userfetch hat in der App.tsx nicht geklappt", error);
    } else {
      setUser(yogaUser?.[0] || null);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [setUser, isLoggedIn]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route
          path="yoga"
          element={
            <ProtectedRoute>
              <Yoga />
            </ProtectedRoute>
          }
        />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="meditate"
          element={
            <ProtectedRoute>
              <Meditate />
            </ProtectedRoute>
          }
        />
        <Route
          path="music"
          element={
            <ProtectedRoute>
              <Music />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="reminder"
          element={
            <ProtectedRoute>
              <Reminder />
            </ProtectedRoute>
          }
        />
        <Route
          path="meditate/:meditateParams"
          element={
            <ProtectedRoute>
              <MeditateDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="meditate/:meditateParams/audio"
          element={
            <ProtectedRoute>
              <AudioPlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/music/:musicId/player"
          element={
            <ProtectedRoute>
              <AudioPlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="yoga/:yogaParams"
          element={
            <ProtectedRoute>
              <YogaDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="yoga/:yogaParams/video"
          element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="initialfilter"
          element={
            <ProtectedRoute>
              <InitialFiltering />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
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
