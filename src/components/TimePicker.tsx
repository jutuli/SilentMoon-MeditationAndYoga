interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  // Create hours and minutes arrays
  const hours: string[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i.toString().padStart(2, "0"));
  }

  const minutes: string[] = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(i.toString().padStart(2, "0"));
  }

  let [selectedHour, selectedMinute] = value.split(":");
  if (!selectedHour) selectedHour = "00";
  if (!selectedMinute) selectedMinute = "00";

  return (
    <div className="time-picker my-4 flex w-full items-center justify-center">
      <div className="bg-light-green text-cream w-full rounded-full p-4 shadow-md">
        <div className="flex justify-center gap-4">
          <select
            value={selectedHour}
            onChange={(e) => onChange(`${e.target.value}:${selectedMinute}`)}
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
            onChange={(e) => onChange(`${selectedHour}:${e.target.value}`)}
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
