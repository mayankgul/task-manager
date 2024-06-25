import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Task = ({
  task,
  onDelete,
  onToggle,
}: {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => {
  return (
    <ListItem sx={{ alignItems: "center", width: 500 }}>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <ListItemText
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </ListItemText>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDelete(task.id)}
      >
        <DeleteIcon sx={{ color: "red" }} />
      </IconButton>
    </ListItem>
  );
};

export default Task;
