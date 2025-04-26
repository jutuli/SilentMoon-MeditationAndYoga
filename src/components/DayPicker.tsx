import { useState } from "react";

const DayPicker = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const day = e.currentTarget.id;
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  return (
    <div className="flex items-center justify-center">
      <ul className="flex w-full items-center justify-between">
        <li
          onClick={handleClick}
          id="monday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("monday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          M
        </li>
        <li
          onClick={handleClick}
          id="tuesday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("tuesday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          T
        </li>
        <li
          onClick={handleClick}
          id="wednesday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("wednesday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          W
        </li>
        <li
          onClick={handleClick}
          id="thursday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("thursday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          TH
        </li>
        <li
          onClick={handleClick}
          id="friday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("friday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          F
        </li>
        <li
          onClick={handleClick}
          id="saturday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("saturday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          S
        </li>
        <li
          onClick={handleClick}
          id="sunday"
          className={`border-cream flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full border-1 font-bold ${
            selectedDays.includes("sunday")
              ? "bg-dark-green text-cream"
              : "text-dark-green"
          }`}
        >
          SU
        </li>
      </ul>
    </div>
  );
};

export default DayPicker;
