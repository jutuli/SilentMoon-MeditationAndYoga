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

function App() {

const {setIsLoggedIn, isLoggedIn, user, setUser} = useMainContext()

const checkLoginStatus = async () => {
  const {data: user} = await supabase
  .auth
  .getUser()

  const {data: yogaUser, error} = await supabase
  .from("users")
  .select("*")
  .eq("id", user.user?.id)

  if (error) {
    console.log("Der Userfetch hat in der App.tsx nicht geklappt", error);
  } else {
    setUser(yogaUser?.[0] || null)
    setIsLoggedIn(true)
    console.log(user);
  }
}

useEffect(()=> {
  checkLoginStatus()
}, [setUser, isLoggedIn])




  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="yoga" element={<Yoga />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="meditate" element={<Meditate />} />
        <Route path="music" element={<Music />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reminder" element={<Reminder />} />
        <Route path="meditate/:meditateParams" element={<MeditateDetail />} />
        <Route
          path="meditate/:meditateParams/audio"
          element={<AudioPlayer />}
        />
        <Route path="/music/:musicId/player" element={<AudioPlayer />} />
        <Route path="yoga/:yogaParams" element={<YogaDetail />} />
        <Route path="yoga/:yogaParams/video" element={<VideoPlayer />} />
        <Route path="initialfilter" element={<InitialFiltering />} />
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
