import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./utils/toastify";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadSaveTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  useEffect(() => {
    loadSaveTasks();
  }, []);

  const setTasksAndSave = (tasksToSave) => {
    setTasks(tasksToSave);
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
  };

  const addTask = (taskTitle) => {
    setTasksAndSave([
      ...tasks,
      {
        id: Math.floor(Math.random() * 69696969),
        title: taskTitle,
        completed: false,
      },
    ]);
  };

  const toggleTaskCompleted = (taskId) => {
    setTasksAndSave(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };

          // Show toast notification based on task completion status
          if (updatedTask.completed) {
            notify(`Task "${task.title}" completed`, {
              type: "success",
            });
          } else {
            notify(`Task "${task.title}" incomplete`, {
              type: "info",
            });
          }

          return updatedTask;
        }
        return task;
      })
    );
  };

  const editTask = (taskId, editedTitle) => {
    setTasksAndSave(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: editedTitle };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      setTasksAndSave(tasks.filter((task) => task.id !== taskId));
      notify(`Task "${taskToDelete.title}" deleted`, { type: "error" });
    }
  };

  return (
    <div>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onCompleted={toggleTaskCompleted}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
