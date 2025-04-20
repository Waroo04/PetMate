import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Layout: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  // Hide theme toggle on scroll down, show on scroll up
  let lastScrollTop = 0;
  React.useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (st > lastScrollTop && st > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <main className="flex-grow container mx-auto px-4 pt-4 pb-24 md:pb-28">
        <Outlet />
      </main>
      {user && <Navbar />}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-20 right-4 md:bottom-28 md:right-8 p-3 rounded-full shadow-lg transition-all duration-300 z-10
          ${
            theme === "dark"
              ? "bg-primary-500 hover:bg-primary-600"
              : "bg-secondary-500 hover:bg-secondary-600"
          }
          ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun size={20} className="text-white" />
        ) : (
          <Moon size={20} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default Layout;
