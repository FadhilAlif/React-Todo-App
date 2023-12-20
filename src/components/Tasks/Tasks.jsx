import Task from "../Task/Task";
import styles from "./tasks.module.css";

const Tasks = ({ tasks, onCompleted, onDelete, onEdit }) => {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <section className={styles.tasks}>
      <div className={styles.header}>
        <div>
          <p>My Tasks</p>
          <span>{tasksQuantity}</span>
        </div>
        <div>
          <p>Completed</p>
          <span>
            {completedTasks} of {tasksQuantity}
          </span>
        </div>
      </div>
      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onCompleted={onCompleted}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
};

export default Tasks;
