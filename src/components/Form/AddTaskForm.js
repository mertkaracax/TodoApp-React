import React, { useState, useRef } from "react";
import classes from "./AddTaskForm.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { getReduxState } from "../../store";

const AddTaskForm = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const addTaskHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const data = getReduxState();
    const userId = data.user.userId;
    // console.log(userId, title, description);

    fetch("http://localhost:8080/task/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        title: title,
        description: description,
      }),
    })
      .then((res) => {
        if (res.status === 404 || res.status === 401) {
          const error = new Error("Error occured.");
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        // props.onOpen();
        console.log(data);
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        props.trigger();
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.form} onSubmit={addTaskHandler}>
      <input
        ref={titleRef}
        placeholder="Task Title"
        className={classes.titleInput}
      ></input>
      <input
        ref={descriptionRef}
        placeholder="Task Description"
        className={classes.contentInput}
      ></input>
      <button type="submit" className={classes.button}>
        <AiOutlinePlus />
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
