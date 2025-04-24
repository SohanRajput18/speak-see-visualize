
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { History } from "./History";
import { SidebarProvider } from "./ui/sidebar";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SidebarProvider defaultOpen>
          <div className="flex w-full">
            <History />
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
}
