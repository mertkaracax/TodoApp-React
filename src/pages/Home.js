import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import lightClasses from "./HomeLight.module.css";
import { useSelector } from "react-redux";
import Task from "../components/Task";
import Dropdown from "../components/Dropdown";
import { getReduxState } from "../store";
import AddTaskForm from "../components/Form/AddTaskForm";
import Modal from "../UI/Modal";

function Home() {
  // const username = useSelector((state) => state.user.username); In this method, when I refresh the page, data is lost.
  const reduxState = getReduxState();
  const [apiListener, setApiListener] = useState(0);
  const [tasks, setTasks] = useState();
  const [modalVisibility, setModelVisibility] = useState(false);

  const theme = useSelector((state) => state.ui.theme);

  const openModal = () => {
    setModelVisibility(true);
    setTimeout(() => {
      setModelVisibility(false);
    }, 2000);
  };
  const closeModal = () => {
    setModelVisibility(false);
  };

  const triggerApiListener = () => {
    setApiListener((prevState) => {
      return prevState + 1;
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/task/getTasks/${reduxState.user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data.tasks);
        setApiListener((prevState) => {
          return prevState++;
        });
      })
      .catch((err) => console.log(err));
  }, [apiListener]);

  return (
    <div
      className={theme === "dark" ? classes.container : lightClasses.container}
    >
      {modalVisibility && (
        <Modal
          onClose={closeModal}
          title="Success"
          content="Task added successfully."
        />
      )}
      <header className={classes.header}>
        <div className={classes.logo}>To do App</div>
        <nav className={classes.nav}>
          <a href="/" className={classes.navLink}>
            Home
          </a>
          <a href="/" className={classes.navLink}>
            Notifications
          </a>
          <a href="/" className={classes.navLink}>
            Messages
          </a>
        </nav>
        <div className={classes.searchBar}>
          <input
            type="text"
            placeholder="Search Task"
            className={classes.searchInput}
          />
        </div>
        <div className={classes.profile}>
          <div className={classes.profilePic}></div>
          <Dropdown
            buttonText={reduxState.user.username}
            menuItems={["Profile", "Change Theme", "Çıkış Yap"]}
          />
          {/* <div className={classes.profileName}>{token}</div> */}
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.formBox}>
          <AddTaskForm onOpen={openModal} trigger={triggerApiListener} />
        </div>
        <div className={classes.tasks}>
          {tasks
            ? tasks.map((task) => {
                return (
                  <Task
                    trigger={triggerApiListener}
                    key={task._id}
                    id={task._id}
                    authorName={reduxState.user.username}
                    title={task.title}
                    description={task.description}
                  />
                );
              })
            : null}
        </div>
      </main>
    </div>
  );
}

export default Home;
