import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import TaskList, { Task } from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from local storage when component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  /**
   * Adds a new task to the task list.
   *
   * @param {string} text - The text description of the new task.
   *
   * This function creates a new task object with a unique `id`, the provided `text`,
   * and a `completed` status set to `false`. It then updates the state to include the
   * new task and persists the updated task list in local storage.
   */
  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, newTask];

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  /**
   * Deletes a task from the task list.
   *
   * @param {number} id - The unique identifier of the task to be deleted.
   *
   * This function filters out the task with the specified `id` from the task list,
   * updates the state with the remaining tasks, and persists the updated task list
   * in local storage.
   */
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  /**
   * Toggles the completion status of a task.
   *
   * @param {number} id - The unique identifier of the task to be toggled.
   *
   * This function toggles the `completed` status of the task with the specified `id`,
   * updates the state with the modified task list, sorts the tasks so that incomplete
   * tasks are listed before completed tasks, and persists the updated task list in
   * local storage.
   */
  const toggleTask = (id: number) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      newTasks.sort(
        (taskA, taskB) => Number(taskA.completed) - Number(taskB.completed)
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <center style={{ marginBottom: 20, marginRight: 20 }}>
        <Typography variant="h4" gutterBottom>
          Task Manager
        </Typography>
      </center>

      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </Container>
  );
};

export default App;
