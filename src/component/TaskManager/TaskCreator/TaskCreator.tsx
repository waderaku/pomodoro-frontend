import { TextField, Grid, Paper } from "@mui/material";
import EstimationSelector from "./EstimationSelector";
import { useState } from "react";
import { TaskId } from "domain/model";
import { useTask } from "domain/hooks/task";

const TaskCreator = (props: { taskId: TaskId }) => {
  const task = useTask(props.taskId);
  const createTask = task.createTask;
  const [numClock, setNumClock] = useState(0);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const element = e.target as HTMLInputElement;
      const taskName = element.value;
      createTask(taskName, numClock);
    }
  };
  return (
    <Paper>
      <Grid
        container
        justifyContent="space-around"
        sx={{ alignItems: "center" }}
        onKeyDown={onKeyDown}
      >
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="taskName"
            label="TaskName"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <EstimationSelector numClock={numClock} setNumClock={setNumClock} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskCreator;
