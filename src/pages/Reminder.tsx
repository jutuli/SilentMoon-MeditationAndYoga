import Button from "../components/Button";
import DayPicker from "../components/DayPicker";
import TimePicker from "../components/TimePicker";

const Reminder = () => {
  return (
    <section className="reminders flex flex-col gap-5 px-5">
      <p>Silent Moon Komp</p>
      <article>
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          What time would you like to meditate?
        </h2>
        <p className="text-gray text-xs">
          Any time you can choose but We recommend first thing in th morning.
        </p>
      </article>
      <TimePicker />
      <article>
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          Which day would you like to meditate?{" "}
        </h2>
        <p className="text-gray text-xs">
          Everyday is best, but we recommend picking at least five.{" "}
        </p>
      </article>
      <DayPicker />
      <Button text="Save" />
      <button className="text-pink uppercase">No Thanks</button>
    </section>
  );
};

export default Reminder;
