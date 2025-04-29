import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMoon,
  faMusic,
  faPerson,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const navIcons = [
  { name: "yoga", label: "Yoga", icon: faMoon, path: "/yoga" },
  { name: "meditate", label: "Meditate", icon: faSeedling, path: "/meditate" },
  { name: "home", label: "Home", icon: faHouse, path: "/home" },
  { name: "music", label: "Music", icon: faMusic, path: "/music" },
  { name: "profile", label: "Profile", icon: faPerson, path: "/profile" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const activeIcon = navIcons.find((icon) => icon.path === currentPath)?.name;


  const handleClick = (icon: (typeof navIcons)[number]) => {
    navigate(icon.path);
  };

  return (
    <footer className="fixed bottom-0 w-full bg-white px-4 py-2 shadow-neutral-200 drop-shadow-xl">
      <ul className="flex items-center justify-between">
        {navIcons.map((icon) => {
          const isActive = activeIcon === icon.name;
          return (
            <li
              key={icon.name}
              onClick={() => handleClick(icon)}
              className="flex cursor-pointer flex-col items-center text-sm"
            >
              <div
                className={`flex aspect-square w-12 items-center justify-center rounded-2xl ${
                  isActive ? "bg-pink text-cream" : "text-dark-green"
                }`}
              >
                <FontAwesomeIcon icon={icon.icon} className="text-xl" />
              </div>
              <p
                className={`text-md mt-1 ${
                  isActive ? "text-pink" : "text-dark-green"
                }`}
              >
                {icon.label}
              </p>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
