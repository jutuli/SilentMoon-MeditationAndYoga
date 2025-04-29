import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faRotateLeft, faX } from "@fortawesome/free-solid-svg-icons";
import supabase from "../utils/supabase";
import DetailNav from "../components/DetailNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { yogaParams: sessionId } = useParams();

  const [videoUrl, setVideoUrl] = useState("");
  const [showRotateMessage, setShowRotateMessage] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase
        .from("sessions")
        .select("media_url, title")
        .eq("id", sessionId)
        .single();

      if (error) {
        console.error("Fehler beim Laden der Session:", error);
        return;
      }

      if (data) {
        setVideoUrl(data.media_url);
      }
    };

    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowRotateMessage(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-cream relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Hintergrund-Kreise */}
      <div className="bg-light-cream absolute top-[-100px] left-[-100px] z-1 h-[300px] w-[300px] rounded-full opacity-50"></div>
      <div className="bg-light-cream absolute top-[20%] right-[-80px] z-1 h-[250px] w-[250px] rounded-full opacity-20"></div>
      <div className="bg-light-cream absolute bottom-[-150px] left-[30%] z-1 h-[400px] w-[400px] rounded-full opacity-30"></div>

      {!showRotateMessage ? (
        <div className="z-2 flex h-screen w-full flex-col items-center justify-center p-6">
          <DetailNav
            buttonLeft={faX}
            onBackClick={() => navigate(`/yoga/${sessionId}`)}
            onFavoriteClick={() => {
              console.log("Video favorited");
            }}
          />

          <div className="relative mt-6 h-full w-full rounded-2xl">
            {videoUrl && (
              <iframe
                className="absolute top-1/2 left-1/2 h-[75vw] w-[75vh] origin-center -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-xl"
                src={`${videoUrl}?autoplay=1&modestbranding=1&rel=0&controls=0&playsinline=1`}
                title="YouTube Video Player"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-cream text-dark-green flex h-screen w-full items-center justify-center px-6 text-center">
          <p className="z-2 text-xl font-bold">
            Please turn your phone to landscape mode.
            <FontAwesomeIcon icon={faRotateLeft} className="ml-2" />
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
