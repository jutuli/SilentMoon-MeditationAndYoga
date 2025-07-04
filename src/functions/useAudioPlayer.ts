import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import formatTime from "../utils/formatTime";

const useAudioPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meditateParams: sessionId, musicId } = useParams();

  const isMeditation = Boolean(sessionId);
  const itemId = sessionId || musicId;

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
    if (!itemId) return;
    const fetchTrack = async () => {
      const table = isMeditation ? "sessions" : "music";
      const { data, error } = await supabase
        .from(table)
        .select("media_url, title")
        .eq("id", itemId)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
      } else if (data) {
        setTrackUrl(data.media_url);
        setTitle(data.title);
      }
    };
    fetchTrack();
  }, [itemId, isMeditation]);

  // Script-Element für SoundCloud Player API erzeugen und laden
  useEffect(() => {
    if (!trackUrl) return; // Warten, bis die Track-URL geladen ist
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);

    // Interval zum Abfragen der aktuellen Position
    let interval: number | null = null;

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

          newWidget.play(); // Player automatisch starten
          interval = window.setInterval(() => {
            newWidget.getPosition((pos: number) => {
              setCurrentTime(pos / 1000);
            });
          }, 1000); // Alle 1 Sekunde die aktuelle Position abfragen
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

  // Skippen bzw. Next/Prev Track
  const handleSkip = async (seconds: number) => {
    if (location.pathname.includes("/meditate")) {
      skip(seconds);
    } else if (location.pathname.includes("/music") && musicId) {
      const { data: songs, error } = await supabase.from("music").select("id");
      if (error || !songs) return;

      const ids = songs.map((song) => song.id);
      const idx = ids.indexOf(musicId);
      if (idx === -1) return;

      // +1 für Next, -1 für Prev
      const nextIdx = idx + (seconds > 0 ? 1 : -1);
      if (nextIdx < 0 || nextIdx >= ids.length) return;

      navigate(`/music/${ids[nextIdx]}/player`);
    }
  };

  const handleExit = () => {
    if (location.pathname.includes("/meditate")) {
      navigate(-1);
    } else if (location.pathname.includes("/music")) {
      navigate("/music");
    } else {
      navigate("/home");
    }
  };

  return {
    iframeRef,
    isPlaying,
    currentTime,
    duration,
    uploader,
    officialTitle,
    trackUrl,
    title,
    sessionId,
    isMeditation,
    formatTime,
    togglePlayPause,
    skip,
    handleProgressBarInput,
    handleSkip,
    handleExit,
  };
};

export default useAudioPlayer;
