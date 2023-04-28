import React, { useState } from "react";
import classes from "./Dropdown.module.css";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/user";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";

const Dropdown = ({ buttonText, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
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
                if (item === "Profile") {
                  navigate("/Home");
                } else if (item === "Change Theme") {
                  dispatch(uiActions.changeTheme());
                } else if (item === "Çıkış Yap") {
                  dispatch(userActions.userLogout());
                  navigate("/");
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
