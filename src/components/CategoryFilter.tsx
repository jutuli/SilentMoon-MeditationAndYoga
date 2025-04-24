import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ICategoryFilterProps {
  type: "yoga" | "meditate";
}

const CategoryFilter = ({ type }: ICategoryFilterProps) => {
  // später durch supabase ersetzen
  const categories = [
    { id: "1", name: "All", type: "yoga", icon: faMoon },
    { id: "2", name: "Favorites", type: "yoga", icon: faMoon },
    { id: "3", name: "Morning Flows", type: "yoga", icon: faMoon },
    { id: "4", name: "Evening Wind Down", type: "yoga", icon: faMoon },
    { id: "5", name: "Gentle/Yin Yoga", type: "yoga", icon: faMoon },
    { id: "6", name: "Strength & Balance", type: "yoga", icon: faMoon },
    { id: "7", name: "Breath & Movement", type: "yoga", icon: faMoon },
    { id: "8", name: "All", type: "meditate", icon: faMoon },
    { id: "9", name: "Favorites", type: "meditate,", icon: faMoon },
    { id: "10", name: "Sleep", type: "meditate", icon: faMoon },
    { id: "11", name: "Stress Relief", type: "meditate", icon: faMoon },
    { id: "12", name: "Focus", type: "meditate", icon: faMoon },
    { id: "13", name: "Beginner’s Path", type: "meditate", icon: faMoon },
    { id: "14", name: "Morning Boost", type: "meditate", icon: faMoon },
    { id: "15", name: "Silence & Bells", type: "meditate", icon: faMoon },
  ];

  const filteredCategories = categories.filter(
    (category) => category.type === type,
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (category: (typeof categories)[number]) => {
    setActiveCategory(category.id);
  };

  return (
    <div className="category-filter w-full bg-white px-4 py-2">
      <ul className="flex items-center justify-between">
        {filteredCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <li
              key={category.id}
              onClick={() => handleClick(category)}
              className="flex cursor-pointer flex-col items-center text-sm"
            >
              <div
                className={`flex aspect-square w-12 items-center justify-center rounded-2xl ${
                  isActive ? "bg-light-green text-cream" : "bg-gray text-white"
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="text-xl" />
              </div>
              <p
                className={`text-md mt-1 ${
                  isActive ? "text-light-green" : "text-gray"
                }`}
              >
                {category.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
