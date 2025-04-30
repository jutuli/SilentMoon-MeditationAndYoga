
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import DayPicker from "../components/DayPicker";
import TimePicker from "../components/TimePicker";
import SilentMoon from "../components/SilentMoon";



const Reminder = () => {

  const navigate = useNavigate()

  const handleSaveReminder = () => {
    navigate("/initialfilter")
  }



  return (
    <section className="reminders flex flex-col gap-5 px-5">
      <div className="pb-10">
      <SilentMoon/>
      </div>
      <article>
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          What time would you like to meditate?
        </h2>
        <p className="text-gray text-sm">
          Any time you can choose but we recommend first thing in the morning.
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
      <Button text="Save" onClick={handleSaveReminder}/>
      <Link to={"/initialfilter"} className="text-center cursor-pointer">
      <button className="text-pink uppercase cursor-pointer">No Thanks</button>
      </Link>
    </section>
  );
};

export default Reminder;
