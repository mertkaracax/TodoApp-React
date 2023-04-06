import { useRef, useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user";
import Modal from "../UI/Modal";

function Login() {
  const navigate = useNavigate(); // For navigating between secreens

  const dispatch = useDispatch(); // For redux state change

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [modalVisibility, setModalVisibility] = useState(false);

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(`Username: ${username}, Password: ${password}`);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => {
        if (res.status === 404 || res.status === 401) {
          const error = new Error("Username or password is wrong.");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        const user = {
          username: data.username,
          token: data.token,
          userId: data.userId,
        };
        console.log(
          dispatch(
            userActions.createUser({
              username: user.username,
              token: user.token,
              userId: user.userId,
            })
          )
        );
        navigate("/home");
      })
      .catch((err) => setModalVisibility(true));
  };

  return (
    <div className={classes.container}>
      {modalVisibility && (
        <Modal
          onClose={closeModal}
          title="Warning"
          content="Username or password is wrong."
        />
      )}
      <form className={classes.form} onSubmit={handleSubmit}>
        <h3 className={classes.heading}>Login</h3>
        <input
          type="username"
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
        <button type="submit" className={classes.button}>
          Login
        </button>
        <span style={{ marginTop: 15 }}>
          <span style={{ color: "gray" }}>Not a member? </span>
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className={classes.link}
            style={{ display: "inline-block" }}
          >
            Sign up now
          </span>
        </span>
      </form>
    </div>
  );
}

export default Login;
