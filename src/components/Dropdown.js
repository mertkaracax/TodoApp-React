import React, { useState } from "react";
import classes from "./Dropdown.module.css";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ buttonText, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.dropdown}>
      <button className={classes.button} onClick={toggleMenu}>
        {buttonText}
      </button>
      {isOpen && (
        <div className={classes.menu}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={classes.menuItem}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                if (item === "Çıkış Yap") {
                  navigate("/");
                } else if (item === "Profil") {
                  navigate("/Home");
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
