import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NutriPalChat from "../components/NutriPalChat";

const RootLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pb-20">
        {" "}
        {/* Add padding to prevent footer overlap */}
        <Outlet />
      </main>
      <Footer onLogoClick={() => setShowChat(true)} />

      {/* Chatbox overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowChat(false)}
          ></div>
          <div className="absolute bottom-5 right-5 w-full max-w-md h-[90vh] bg-white rounded-t-2xl rounded-bl-2xl overflow-hidden shadow-xl">
            <NutriPalChat onClose={() => setShowChat(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
