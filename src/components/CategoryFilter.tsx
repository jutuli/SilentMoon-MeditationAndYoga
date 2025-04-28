import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { ICategory } from "../interfaces/ICategory";

interface ICategoryFilterProps {
  //! hard gecoded, weil sonst weiterer fetch?!-so auch okay?
  type:
    | "431a7ad8-a08b-429e-820c-24c53c240990"
    | "8d946553-91d1-4307-915a-a2b5329769e2";
}

const CategoryFilter = ({ type }: ICategoryFilterProps) => {
  const [categories, setCategories] = useState<ICategory[] | undefined>();

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.log(error);
    } else {
      setCategories(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // später durch supabase ersetzen
  // const categorie = [
  //   { id: "1", name: "All", type: "yoga", icon: faMoon },
  //   { id: "2", name: "Favorites", type: "yoga", icon: faMoon },
  //   { id: "3", name: "Morning Flows", type: "yoga", icon: faMoon },
  //   { id: "4", name: "Evening Wind Down", type: "yoga", icon: faMoon },
  //   { id: "5", name: "Gentle/Yin Yoga", type: "yoga", icon: faMoon },
  //   { id: "6", name: "Strength & Balance", type: "yoga", icon: faMoon },
  //   { id: "7", name: "Breath & Movement", type: "yoga", icon: faMoon },
  //   { id: "8", name: "All", type: "meditate", icon: faMoon },
  //   { id: "9", name: "Favorites", type: "meditate,", icon: faMoon },
  //   { id: "10", name: "Sleep", type: "meditate", icon: faMoon },
  //   { id: "11", name: "Stress Relief", type: "meditate", icon: faMoon },
  //   { id: "12", name: "Focus", type: "meditate", icon: faMoon },
  //   { id: "13", name: "Beginner’s Path", type: "meditate", icon: faMoon },
  //   { id: "14", name: "Morning Boost", type: "meditate", icon: faMoon },
  //   { id: "15", name: "Silence & Bells", type: "meditate", icon: faMoon },
  // ];

  //! hab ich nicht verstanden und dann weggelassen
  // const filteredCategories = categories?.filter(
  //   (category) => category.type_id === type,
  // );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (categorie: ICategory) => {
    setActiveCategory(categorie.id);
  };

  return (
    <div className="category-filter w-full bg-white px-4 py-2">
      <ul className="carousel flex justify-between pb-5">
        {categories?.map((category: ICategory) => {
          const isActive = activeCategory === category.id;
          const icon = (SolidIcons as any)[category.icon];
          return (
            <div className="carousel-item">
              <li
                key={category.id}
                onClick={() => handleClick(category)}
                className="flex cursor-pointer flex-col items-center text-sm"
              >
                <div
                  className={`flex aspect-square w-15 items-center justify-center rounded-2xl ${
                    isActive
                      ? "bg-light-green text-cream"
                      : "bg-gray text-white"
                  }`}
                >
                  {/* Funktioniert nicht */}
                  <FontAwesomeIcon icon={icon} className="text-xl" />
                </div>
                <p
                  className={`mt-1 w-15 text-center text-xs ${
                    isActive ? "text-light-green" : "text-gray"
                  }`}
                >
                  {category.name}
                </p>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
