import { useState } from "react";
import styles from "./header.module.css";
import { IoMdAdd } from "react-icons/io";

const Header = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddTask(title);
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
