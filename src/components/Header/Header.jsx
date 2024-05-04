import { useState } from "react";
import styles from "./header.module.css";
import { IoMdAdd } from "react-icons/io";
import { notify } from "../../utils/toastify";

const Header = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return notify("Please provide a task title", { type: "error" });
    }
    onAddTask(title);
    notify(`Task "${title}" added`, { type: "success" });
    setTitle("");
  };

  return (
    <header className={styles.header}>
      <h1>My Todo List</h1>
      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <input
          placeholder="Add your task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>
          Create Task
          <IoMdAdd size={24} />
        </button>
      </form>
    </header>
  );
};

export default Header;
