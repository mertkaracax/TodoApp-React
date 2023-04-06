import { useRef, useState } from "react";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../UI/Modal";

function Signup() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalTitle, setModalTitle] = useState("Default Title");
  const [modalContent, setModalContent] = useState("Default modal content.");

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    console.log(username, password, confirmPassword);

    if (password !== confirmPassword) {
      setModalTitle("Warning");
      setModalContent("Your passwords are not equal.");
      setModalVisibility(true);
      return console.log("ERROR - Passwords are not equal");
    }
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setModalTitle("Success");
        setModalContent("Your registration is successful.");
        setModalVisibility(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      {modalVisibility && (
        <Modal onClose={closeModal} title={modalTitle} content={modalContent} />
      )}
      <form className={classes.form} onSubmit={handleSubmit}>
        <h3 className={classes.heading}>Sign Up</h3>
        <input
          type="text"
          className={classes.input}
          placeholder="username"
          ref={usernameRef}
        />
        <input
          type="password"
          className={classes.input}
          placeholder="password"
          ref={passwordRef}
        />
        <input
          type="password"
          className={classes.input}
          placeholder="confirm password"
          ref={confirmPasswordRef}
        />
        <button type="submit" className={classes.button}>
          Sign Up
        </button>
        <span style={{ marginTop: 15 }}>
          <span style={{ color: "gray" }}>Already a member? </span>
          <span
            onClick={() => {
              navigate("/");
            }}
            className={classes.link}
            style={{ display: "inline-block" }}
          >
            Login now
          </span>
        </span>
      </form>
    </div>
  );
}

export default Signup;
