import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faX,
  faForward,
  faBackward,
  faRotateRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import DetailNav from "../components/DetailNav";
import useAudioPlayer from "../functions/useAudioPlayer";
import BackgroundCircles from "../components/BackgroundCircles";

const AudioPlayer = () => {
  const {
    iframeRef,
    isPlaying,
    uploader,
    officialTitle,
    trackUrl,
    title,
    sessionId,
    isMeditation,
    togglePlayPause,
    handleSkip,
    handleExit,
  } = useAudioPlayer();

  return (
    <div className="bg-cream relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <BackgroundCircles />
      {/* Back Button */}
      <DetailNav
        buttonLeft={faX}
        onBackClick={handleExit}
        session_id={sessionId}
      />

      <div className="z-20">
        <div className="p-10 text-center">
          <h1 className="text-dark-green mb-15 text-3xl font-bold">
            {title || "Loading..."}
          </h1>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={() => handleSkip(-15)}
                className="text-dark-green cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={isMeditation ? faRotateLeft : faBackward}
                  size="2x"
                />
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-dark-green text-cream flex h-16 w-16 cursor-pointer items-center justify-center rounded-full"
              >
                <FontAwesomeIcon
                  icon={isPlaying ? faPause : faPlay}
                  size="2x"
                />
              </button>
              <button
                onClick={() => handleSkip(15)}
                className="text-dark-green cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={isMeditation ? faRotateRight : faForward}
                  size="2x"
                />
              </button>
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
