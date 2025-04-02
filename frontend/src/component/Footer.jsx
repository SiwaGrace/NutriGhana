import React from "react";
import MyLogo from "../assets/logo&icons/nutrighanaLogo.svg";

const Footer = () => {
  return (
    <div>
      {" "}
      {/* Logo */}
      <div className="fixed bottom-10 right-2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md animate-bounce">
        <img src={MyLogo} alt="Nutri Ghana logo" className="w-10 h-10" />
      </div>
    </div>
  );
};

export default Footer;
