"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import AsideBar from "./AsideBar";
import LogoutModel from "../models/LogoutModel";

function Aside() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleLogoutModel = () => {
    setIsModelOpen((prev) => !prev);
  };

  const toggleAside = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed lg:hidden top-0 z-30 w-full bg-Aside-Border h-6 flex items-center">
        <Menu onClick={toggleAside} className="cursor-pointer ml-2" />
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed top-6 z-40 min-w-1/5">
          <AsideBar
            isVisible={isSidebarOpen}
            toggleLogoutModel={toggleLogoutModel}
          />
        </div>
      )}

      <div className="hidden lg:block lg:min-w-2/9 xl:min-w-1/7">
        <AsideBar isVisible={true} toggleLogoutModel={toggleLogoutModel} />
      </div>

      <LogoutModel
        closeLogoutModel={toggleLogoutModel}
        isModelOpen={isModelOpen}
      />
    </>
  );
}

export default Aside;