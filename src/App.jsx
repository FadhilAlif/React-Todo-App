import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadSaveTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    console.log("saved tasks", savedTasks);
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
          return { ...task, completed: !task.completed };
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
    setTasksAndSave(tasks.filter((task) => task.id !== taskId));
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
    </div>
  );
}

export default App;
