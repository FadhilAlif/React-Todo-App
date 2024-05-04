import { useState } from "react";
import styles from "./task.module.css";
import { FaTrash, FaRegEdit, FaSave } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdEditOff } from "react-icons/md";
import { notify } from "../../utils/toastify";

const Task = ({ task, onCompleted, onDelete, onEdit }) => {
  const [editTask, setEditTask] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditClick = () => {
    if (!task.completed) {
      setEditTask(true);
    }
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() === "") {
      notify("Please provide a task title", { type: "error" });
      return;
    }

    if (editedTitle === task.title) {
      notify("Task is not modified", { type: "info" });
      return;
    }

    onEdit(task.id, editedTitle);
    setEditTask(false);
    notify("Task updated successfully", { type: "success" });
  };

  const handleCancelClick = () => {
    setEditedTitle(task.title);
    setEditTask(false);
  };

  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onCompleted(task.id)}
      >
        {task.completed ? <BsCheckCircleFill /> : <div />}
      </button>
      {editTask ? (
        <input
          type="text"
          className={styles.editInput}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <p className={task.completed ? styles.textCompleted : ""}>
          {task.title}
        </p>
      )}
      {!task.completed && !editTask && (
        <button className={styles.editBtn} onClick={handleEditClick}>
          <FaRegEdit size={20} />
        </button>
      )}
      {!task.completed && editTask && (
        <div className={styles.btnContainer}>
          <button className={styles.saveBtn} onClick={handleSaveClick}>
            <FaSave size={20} />
          </button>
          <button className={styles.cancelBtn} onClick={handleCancelClick}>
            <MdEditOff size={20} />
          </button>
        </div>
      )}
      {!editTask && (
        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          <FaTrash size={16} />
        </button>
      )}
    </div>
  );
};

export default Task;
