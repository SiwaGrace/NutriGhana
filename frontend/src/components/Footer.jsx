import React from "react";
import MyLogo from "../assets/logo&icons/nutrighanaLogo.svg";

const Footer = ({ onLogoClick }) => {
  return (
    <footer className="fixed bottom-20 right-2 transform -translate-x-1/2 rounded-full ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Other footer content if any */}

        {/* Chat logo button */}
        <div
          className="bg-white p-2 rounded-full shadow-md animate-bounce cursor-pointer"
          onClick={onLogoClick}
        >
          <img src={MyLogo} alt="Nutri Ghana logo" className="w-10 h-10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
