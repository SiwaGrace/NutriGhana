import { HomeIcon, UtensilsCrossed, BarChart3, User2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full shadow-md py-2 flex justify-around items-center border-b bg-white border-gray-300 h-14  z-50">
      {/* Navigation Items */}
      <NavLink
        to="/home"
        title="Home"
        className={({ isActive }) =>
          isActive ? "text-black" : "text-gray-400"
        }
      >
        <HomeIcon size={24} />
      </NavLink>
      <NavLink
        to="/dishes"
        title="Dishes"
        className={({ isActive }) =>
          isActive ? "text-black" : "text-gray-400"
        }
      >
        <UtensilsCrossed size={24} />
      </NavLink>
      <NavLink
        to="/stats"
        title="Stats"
        className={({ isActive }) =>
          isActive ? "text-black" : "text-gray-400"
        }
      >
        <BarChart3 size={24} />
      </NavLink>
      <NavLink
        to="/userprofile"
        title="Profile"
        className={({ isActive }) =>
          isActive ? "text-black" : "text-gray-400"
        }
      >
        <User2 size={24} />
      </NavLink>
    </nav>
  );
}
