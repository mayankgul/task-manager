import { Divider, List, Typography } from "@mui/material";
import Task, { Task as TaskType } from "./Task";

const TaskList = ({
  tasks,
  onDelete,
  onToggle,
}: {
  tasks: TaskType[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => {
  // Render the tasks in two different sections according to their `completed` status
  return (
    <>
      <List sx={{ alignItems: "center", justifyContent: "center" }}>
        {tasks.map((task) =>
          !task.completed ? (
            <Task
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ) : null
        )}
      </List>
      {tasks.find((task) => task.completed) !== undefined && (
        <>
          <Divider sx={{ width: 500 }} />
          <Typography sx={{ marginTop: 2, color: "#343434" }} variant="body1">
            Completed Tasks
          </Typography>
          <List sx={{ alignItems: "center", justifyContent: "center" }}>
            {tasks.map((task) =>
              task.completed ? (
                <Task
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              ) : null
            )}
          </List>
        </>
      )}
    </>
  );
};

export default TaskList;
