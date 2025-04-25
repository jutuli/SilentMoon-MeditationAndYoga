import CategoryFilter from "../components/CategoryFilter";
import Headline from "../components/Headline";
import SearchField from "../components/SearchField";

const Yoga = () => {
  return (
    <div>
      <Headline name="Yoga" description="Find your inner zen from annywhere." />
      <CategoryFilter type="yoga" />
      <SearchField/>
    </div>
  );
};

export default Yoga;
