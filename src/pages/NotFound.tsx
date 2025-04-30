import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Yoga session not found
  if (path.startsWith("/yoga/")) {
    return (
      <section className="not-found flex flex-1 flex-col items-center justify-center p-8 text-center">
        <h2 className="text-dark-green text-2xl font-bold tracking-wider">
          🧘‍♀️ Pose Lost in Transition
        </h2>
        <p className="text-gray mt-4">
          Looks like this yoga flow never made it to the mat.
        </p>
        <button
          onClick={() => navigate("/yoga")}
          className="bg-pink text-light-cream mt-6 rounded px-5 py-3 font-semibold"
        >
          Find Another Flow
        </button>
      </section>
    );
  }

  // Meditation session not found
  if (path.startsWith("/meditate/")) {
    return (
      <section className="not-found flex flex-1 flex-col items-center justify-center p-8 text-center">
        <h2 className="text-dark-green text-2xl font-bold tracking-wider">
          🌿 Calm Alert: Session Drifted Away
        </h2>
        <p className="text-gray mt-4">
          We reached for inner peace… but the session vanished.
        </p>
        <button
          onClick={() => navigate("/meditate")}
          className="bg-pink text-light-cream mt-6 rounded px-5 py-3 font-semibold"
        >
          Discover New Practice
        </button>
      </section>
    );
  }

  // Generic 404 fallback
  return (
    <section className="not-found flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h2 className="text-dark-green text-2xl font-bold tracking-wider">
        🚫 404 – Flow Unfound
      </h2>
      <p className="text-gray my-4">Your inner stillness took a detour.</p>
      <p className="text-dark-green font-semibold">What now? 🤷‍♀️</p>
      <ul className="text-dark-green mt-2 list-inside list-disc text-left">
        <li>Return to your Home Mat </li>
        <li>Double-check your URL alignment </li>
        <li>Or take a deep breath and try again 🧘‍♂️</li>
      </ul>
      <button
        onClick={() => navigate("/home")}
        className="bg-pink text-light-cream mt-6 rounded px-5 py-3 font-semibold"
      >
        Back to Home
      </button>
    </section>
  );
};

export default NotFound;
