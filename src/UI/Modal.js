import classes from "./Modal.module.css";
import { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={classes.modal}>
        <div className={classes.modalHeader}>
          <span className={classes.modalHeaderText}>{props.title}</span>
          <FaTimes
            onClick={props.onClose}
            color="white"
            className={classes.modalHeaderButton}
            size={25}
          />
        </div>
        <div className={classes.modalContent}>
          <span>{props.content}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
