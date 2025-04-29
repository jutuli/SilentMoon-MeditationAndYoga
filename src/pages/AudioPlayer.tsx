import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faTimes,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import RoundButton from "../components/RoundButton";
import supabase from "../utils/supabase";
import { useParams } from "react-router-dom";
import DetailNav from "../components/DetailNav";

const AudioPlayer = () => {
  const navigate = useNavigate();
  const { meditateParams: sessionId } = useParams();

  // Ref für den SoundCloud-Player (unsichtbar im Hintergrund)
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // States für den Player
  const [widget, setWidget] = useState<any>(null); // SoundCloud Widget
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [uploader, setUploader] = useState(""); // Name des Künstlers
  const [officialTitle, setOfficialTitle] = useState(""); // Original Tracktitel auf SoundCloud
  const [trackUrl, setTrackUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // Fetch Session-Daten von Supabase
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
        setTrackUrl(data.media_url);
        setTitle(data.title);
        console.log(data.media_url);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Script-Element für SoundCloud Player API erzeugen und laden
  useEffect(() => {
    if (!trackUrl) return; // Warten, bis die Track-URL geladen ist
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);

    // Interval zum Abfragen der aktuellen Position
    let interval: any = null;

    // Wenn das Script geladen wurde
    script.onload = () => {
      // Wenn das iframe-Element und die SoundCloud API bereit sind
      // (window as any).SC =  SoundCloud API
      if (iframeRef.current && (window as any).SC) {
        const newWidget = (window as any).SC.Widget(iframeRef.current); // SoundCloud Widget holen
        setWidget(newWidget);

        // Wenn der Player bereit ist
        newWidget.bind("ready", () => {
          newWidget.getCurrentSound((sound: any) => {
            setUploader(sound.user.username);
            setOfficialTitle(sound.title);
            setDuration(sound.duration / 1000);
          });

          // Jetzt erst Intervall starten, um aktuelle Position zu holen
          interval = setInterval(() => {
            if (
              newWidget &&
              iframeRef.current &&
              iframeRef.current.contentWindow // contentWindow bezieht sich auf das iframe
            ) {
              newWidget.getPosition((pos: number) => {
                setCurrentTime(pos / 1000); // Position in Sekunden speichern
              });
            }
          }, 1000);
          newWidget.play(); // Player automatisch starten
        });

        // Abspielen/Anhalten Status speichern
        newWidget.bind("play", () => setIsPlaying(true));
        newWidget.bind("pause", () => setIsPlaying(false));
      }
    };

    // Aufräumen beim Verlassen der Seite
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      // Löschen des Scripts, wenn die Seite verlassen wird
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [trackUrl]);

  // Toggle von Play & Pause
  const togglePlayPause = () => {
    if (!widget) return;
    widget.isPaused((paused: boolean) => {
      if (paused) {
        widget.play();
      } else {
        widget.pause();
      }
    });
  };

  // Sekunden vorspringen oder zurückspringen
  const skip = (seconds: number) => {
    if (!widget) return;
    widget.getPosition((pos: number) => {
      widget.seekTo(pos + seconds * 1000);
    });
  };

  // User-Input über Fortschrittsbalken
  const handleProgressBarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (widget) {
      widget.seekTo(newTime * 1000);
    }
  };

  // Zeit in MM:SS Format umwandeln
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Session als Favorit markieren
  const handleFavoriteClick = () => {
    console.log("Track favorited");
  };

  return (
    <div className="bg-cream relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Kreise im Hintergrund */}
      <div className="bg-light-cream absolute top-[-100px] left-[-100px] z-1 h-[300px] w-[300px] rounded-full opacity-50"></div>
      <div className="bg-light-cream absolute top-[20%] right-[-80px] z-1 h-[250px] w-[250px] rounded-full opacity-20"></div>
      <div className="bg-light-cream absolute bottom-[-150px] left-[30%] z-1 h-[400px] w-[400px] rounded-full opacity-30"></div>
      <div className="z-2">
        {/* Back Button */}
        <DetailNav
          buttonLeft={faTimes}
          onBackClick={() => navigate(`/meditate/${sessionId}`)}
          onFavoriteClick={() => {
            handleFavoriteClick;
          }}
        />
        <div className="p-10 text-center">
          <h1 className="text-dark-green mb-15 text-3xl font-bold">
            {title || "Loading..."}
          </h1>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-8">
              <button onClick={() => skip(-15)} className="text-dark-green">
                <FontAwesomeIcon icon={faBackward} size="2x" />
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-dark-green text-cream flex h-16 w-16 items-center justify-center rounded-full"
              >
                <FontAwesomeIcon
                  icon={isPlaying ? faPause : faPlay}
                  size="2x"
                />
              </button>
              <button onClick={() => skip(15)} className="text-dark-green">
                <FontAwesomeIcon icon={faForward} size="2x" />
              </button>
            </div>
            <div className="mt-8 w-full">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleProgressBarInput}
                className="accent-dark-green bg-light-green h-2 w-full appearance-none rounded-lg"
              />
              <div className="text-gray mt-2 flex justify-between text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          <p className="text-gray mt-6 p-5 text-xs">
            by <strong>{uploader || "..."}</strong> — "{officialTitle || "..."}"
            on{" "}
            <a
              href={trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-green underline"
            >
              SoundCloud
            </a>
          </p>
        </div>
      </div>

      {/* Unsichtbarer eingebauter SoundCloud-Player */}
      <iframe
        ref={iframeRef}
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}`}
        allow="autoplay"
        width="0"
        height="0"
        style={{ display: "none" }}
      ></iframe>
    </div>
  );
};

export default AudioPlayer;
