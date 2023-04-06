import React from "react";
import classes from "./Task.module.css";
import { MdDone, MdClear } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { getReduxState } from "../store";

const Task = (props) => {
  const onDeleteHandler = () => {
    const reduxState = getReduxState();
    console.log(reduxState.user.userId);
    fetch(`http://localhost:8080/task/deleteTask/${props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: reduxState.user.userId }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        props.trigger();
      });
  };

  return (
    <div className={classes.task}>
      <div className={classes.taskAvatar}></div>
      <div className={classes.taskContent}>
        <div className={classes.taskHeader}>
          <div className={classes.taskAuthor}>{props.title}</div>
          <div className={classes.taskTimestamp}>2h ago</div>
        </div>

        <div className={classes.taskText}>{props.description}</div>
        <div className={classes.taskActions}>
          <a href="/" className={classes.taskAction}>
            <MdDone size={23} />
          </a>
          <a onClick={onDeleteHandler} className={classes.taskAction}>
            <MdClear size={23} />
          </a>
          <a className={classes.taskAction}>
            <AiFillEdit size={23} />
          </a>
          <a className={classes.taskAction}>
            <i className="far fa-share-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Task;
