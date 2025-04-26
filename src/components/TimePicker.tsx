import { useState } from "react";

const TimePicker = () => {
  // Create hours and minutes arrays
  const hours: string[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i.toString().padStart(2, "0"));
  }

  const minutes: string[] = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i.toString().padStart(2, "0"));
  }

  const [selectedHour, setSelectedHour] = useState("11");
  const [selectedMinute, setSelectedMinute] = useState("30");

  return (
    <div className="time-picker flex w-full items-center justify-center">
      <div className="w-80 rounded-lg bg-gray-100 p-8 shadow-md">
        <div className="flex justify-center gap-4">
          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="text-2xl"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>

          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
            className="text-2xl"
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
