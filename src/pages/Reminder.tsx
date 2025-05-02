import { useState } from "react";
import Button from "../components/Button";
import DayPicker from "../components/DayPicker";
import SilentMoon from "../components/SilentMoon";
import TimePicker from "../components/TimePicker";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../context/MainProvider";

const Reminder = () => {
  const { reminderOrigin, setReminderOrigin } = useMainContext();

  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleSave = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("User not authenticated", authError);
      return;
    }
    // Falls Reminder bereits existieren für User, werden sie gelöscht
    const { error: deleteError } = await supabase
      .from("meditation_reminders")
      .delete()
      .eq("user_id", user.id);
    if (deleteError) {
      console.error("Error deleting old reminders:", deleteError);
    }
    // Einen Reminder für jeden ausgewählten Tag erstellen in supabase DB speichern
    const reminders = selectedDays.map((day) => ({
      user_id: user?.id,
      day_of_week: day,
      time: selectedTime,
    }));
    const { data, error } = await supabase
      .from("meditation_reminders")
      .insert(reminders)
      .select();
    if (error) {
      console.error("Error saving reminders:", error);
    } else {
      console.log("Saved reminders:", data);
      handleNavigation();
    }
  };

  console.log(reminderOrigin);

  const handleNavigation = () => {
    if (reminderOrigin === "welcome") {
      navigate("/initialfilter");
      setReminderOrigin(null);
    } else if (reminderOrigin === "profile") {
      navigate("/profile");
      setReminderOrigin(null);
    } else {
      navigate("/home");
      setReminderOrigin(null);
    }
  };

  return (
    <section className="reminders flex flex-1 flex-col justify-between gap-5 px-5 pb-10">
      <SilentMoon />
      <article>
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          What time would you like to meditate?
        </h2>
        <p className="text-gray text-sm">
          Any time you can choose but we recommend first thing in the morning.
        </p>
      </article>
      <TimePicker value={selectedTime} onChange={setSelectedTime} />
      <article>
        <h2 className="text-dark-green text-lg font-bold tracking-wider">
          Which day would you like to meditate?{" "}
        </h2>
        <p className="text-gray text-xs">
          Everyday is best, but we recommend picking at least five.{" "}
        </p>
      </article>
      <DayPicker value={selectedDays} onChange={setSelectedDays} />
      <Button text="Save" onClick={handleSave} />
      <button
        className="text-pink cursor-pointer uppercase"
        onClick={handleNavigation}
      >
        No Thanks
      </button>
    </section>
  );
};

export default Reminder;
