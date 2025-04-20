import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, MessageSquare, User, Plus } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    to: string;
    isActive: boolean;
  }> = ({ icon, label, to, isActive }) => {
    return (
      <button
        onClick={() => navigate(to)}
        className={`flex flex-col items-center justify-center transition-colors duration-200 w-full py-2
          ${
            isActive
              ? "text-primary-500 dark:text-primary-400"
              : "text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
          }`}
      >
        {icon}
        <span className="text-xs font-nunito mt-1">{label}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg z-20 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto ">
        <div className="flex justify-around items-center relative">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            to="/"
            isActive={currentPath === "/"}
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="Calendar"
            to="/appointments"
            isActive={currentPath === "/appointments"}
          />

          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/add-pet")}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg flex items-center justify-center transition-colors duration-200"
              aria-label="Add"
            >
              <Plus size={24} />
            </button>
          </div>

          <NavItem
            icon={<MessageSquare size={20} />}
            label="AI Chat"
            to="/ai"
            isActive={currentPath === "/ai"}
          />
          <NavItem
            icon={<User size={20} />}
            label="Profile"
            to="/settings"
            isActive={currentPath === "/settings"}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
