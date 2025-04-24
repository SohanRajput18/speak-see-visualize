
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="backdrop-blur-md bg-background/30 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 bg-accent text-white rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80"></div>
              <svg className="relative z-10" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <span className="hidden sm:inline-block text-xl text-[#403E43]">Voice-to-<span className="text-[#9b87f5]">Visualization</span></span>
          </NavLink>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              cn("hidden sm:inline-flex px-4 py-2 rounded-md font-medium transition-colors", 
                isActive ? "bg-[#9b87f5] text-white" : "hover:bg-white/10 text-[#8E9196]"
              )
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/results"
            className={({ isActive }) => 
              cn("hidden sm:inline-flex px-4 py-2 rounded-md font-medium transition-colors", 
                isActive ? "text-white bg-[#9b87f5]" : "border border-[#6E59A5]/30 text-[#6E59A5] hover:border-[#6E59A5]"
              )
            }
          >
            Results
          </NavLink>
          <NavLink 
            to="/login"
            className={({ isActive }) => 
              cn("inline-flex px-4 py-2 rounded-md font-medium transition-colors", 
                isActive ? "bg-[#9b87f5] text-white" : "bg-[#9b87f5] text-white hover:opacity-80"
              )
            }
          >
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
