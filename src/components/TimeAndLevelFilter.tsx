import { useEffect, useState } from "react";
import { ISession } from "../interfaces/ISession";
import supabase from "../utils/supabase";

interface ITimeAndLevelProps {
  levelChange: (filter: string | undefined | null) => void
  timeChange: (filter: number | null) => void
}

const TimeAndLevelFilter = ({levelChange, timeChange}: ITimeAndLevelProps) => {

    const [activeTime, setActiveTime] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ISession[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase
        .from("sessions")
        .select("*, session_tags(*, tags(*))");

      if (resp.data) {
        setSessions(resp.data as unknown as ISession[]);
      }
      console.log(resp.data);
    };
    fetchData();
  }, []);






  

  //um dann darüber zu mappen und je nur einmal Advanced und Beginner zu erhalten
const advancedSession = sessions?.find((session) => session.level === "Advanced");
const beginnerSession = sessions?.find((session) => session.level === "Beginner");

const handleLevelClick = (level: string | undefined | null) => {
  const normalizedLevel = level ?? null;
  const newLevel = normalizedLevel === activeLevel ? null : normalizedLevel;
  setActiveLevel(newLevel);
  levelChange(newLevel);
};

const handleTimeClick = (time: string) => {
  const normalizedTime = time === activeTime ? null : time;
  setActiveTime(normalizedTime);

  // Übergebe die erste Ziffer als Zahl: "10 Min" → 1
  const firstDigit = normalizedTime ? parseInt(normalizedTime[0]) : null;
  timeChange(firstDigit);
};


    return ( 
        
<>
      <article className="flex justify-between gap-5 pb-5 carousel">
        <article className="flex gap-1 carousel-item">
          {["10 Min", "20 Min", "30 Min"].map((time) => (
            <div
              key={time}
              onClick={() => handleTimeClick(time)}
              className={`rounded-xl px-2 py-2 cursor-pointer text-xs flex items-center ${
                activeTime === time ? "bg-cream text-dark-green" : "bg-gray text-white"
              }`}
            >
              {time}
            </div>
          ))}
        </article>
        <article className="flex gap-1 carousel-item">
          {[advancedSession, beginnerSession].map((session, index) => (
            <div
              key={index}
              onClick={() => handleLevelClick(session?.level)}
              className={`rounded-xl px-2 py-2 text-xs cursor-pointer ${
                activeLevel === session?.level ? "bg-pink text-cream" : "bg-gray text-white"
              }`}
            >
              {session?.level}
            </div>
          ))}
        </article>
      </article>
    </>

     );
}
 
export default TimeAndLevelFilter;