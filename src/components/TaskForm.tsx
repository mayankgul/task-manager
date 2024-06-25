import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

interface TaskFormProps {
  onAdd: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="New Task"
            value={text}
            onChange={(e) => {
              setHasInteracted(true);
              setText(e.target.value);
            }}
            error={hasInteracted && text.trim() === ""}
            helperText={
              hasInteracted && text.trim() === ""
                ? "Task name cannot be empty"
                : ""
            }
            sx={{
              // "& .MuiInputLabel-root": { color: "rgba(23, 43, 77, 1)" },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "rgba(23, 43, 77, 1)",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(23, 43, 77, 1)",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            variant="contained"
            sx={[
              { backgroundColor: "rgba(23, 43, 77, 1)" },
              hasInteracted && text.trim() === "" ? { marginBottom: 3 } : {},
            ]}
            disabled={text.trim() === ""}
            onClick={() => setHasInteracted(false)}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
