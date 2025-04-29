import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { ICategory } from "../interfaces/ICategory";

interface ICategoryFilterProps {
  type:
    | "431a7ad8-a08b-429e-820c-24c53c240990"
    | "8d946553-91d1-4307-915a-a2b5329769e2";
    onFilterChange: (filter: string | "all" | "favourites" | null) => void;
}

const CategoryFilter = ({ type, onFilterChange }: ICategoryFilterProps) => {
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



  const filteredCategories = categories?.filter(
    (category) => category.type_id === type,
  );
  const [activeCategory, setActiveCategory] = useState<string | "all" | "favourites" | null>("all");

  const handleClick = (categorie: ICategory) => {
    setActiveCategory(categorie.id);
    onFilterChange(categorie.id)
  };

  const handleClickAll = () => {
    setActiveCategory("all")
    onFilterChange("all")
  };

  const handleClickFavs = () => {
    setActiveCategory("favourites")
    onFilterChange("favourites")
  };

  

  return (
    <>
    <div className="category-filter w-full bg-white flex justify-center py-2">
      <ul className="carousel flex pb-5">
      <div className="carousel-item gap-3">
      <li
            
            onClick={handleClickAll}
            className="flex cursor-pointer flex-col items-center text-sm"
          >
            <div
              className={`flex aspect-square w-15 items-center justify-center rounded-2xl ${
                activeCategory === "all"
                  ? "bg-light-green text-cream"
                  : "bg-gray text-white"
              }`}
            >
              <FontAwesomeIcon icon={SolidIcons.faBorderAll} className="text-xl" />
            </div>
            <p
              className={`mt-1 w-15 text-center text-xs ${
                activeCategory === "all" ? "text-light-green" : "text-gray"
              }`}
            >
              All
            </p>
          </li>
          <li
            onClick={handleClickFavs}
            className="flex cursor-pointer flex-col items-center text-sm"
          >
            <div
              className={`flex aspect-square w-15 items-center justify-center rounded-2xl ${
                activeCategory === "favourites"
                  ? "bg-light-green text-cream"
                  : "bg-gray text-white"
              }`}
            >

              <FontAwesomeIcon icon={SolidIcons.faHeart} className="text-xl" />
            </div>
            <p
              className={`mt-1 w-15 text-center text-xs ${
                activeCategory === "favourites" ? "text-light-green" : "text-gray"
              }`}
            >
              Favourites
            </p>
          </li>
    {filteredCategories?.map((category: ICategory) => {
      const isActive = activeCategory === category.id;
      const icon = (SolidIcons as any)[category.icon];
      return (
        <div key={category.id}>
          <li
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
      </div>
      </ul>
    </div>
    </>
  );
};

export default CategoryFilter;
