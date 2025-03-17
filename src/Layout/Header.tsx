import { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <header className="flex w-full items-center justify-between pb-2">
      <h1 className="text-2xl font-extrabold">Todo App</h1>
      <Toggle
        className="cursor-pointer border-2"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? (
          <Moon className="text-white" />
        ) : (
          <Sun className="text-black" />
        )}
      </Toggle>
    </header>
  );
};

export default Header;
