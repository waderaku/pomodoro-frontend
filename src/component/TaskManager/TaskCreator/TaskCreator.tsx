import { TextField, Grid, Paper, styled, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EstimationSelector from "./EstimationSelector";
import { useState } from "react";
import { TaskId } from "domain/model";
import { useTaskViewModel } from "domain/hooks/taskViewModel";

const TaskCreator = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const createTask = taskViewModel.createTask;
  const [numClock, setNumClock] = useState(0);
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const element = e.target as HTMLInputElement;
      const taskName = element.value;
      // TODO Initial Notes
      createTask(taskName, numClock * 25, null, "");
    }
  };
  const myInputStyle = {
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  };
  const MyTextField = styled(TextField)(myInputStyle);
  return (
    <Paper>
      <Grid
        container
        justifyContent="space-between"
        sx={{ alignItems: "center" }}
        onKeyDown={onKeyDown}
        columns={12}
      >
        <Grid item xs={9}>
          <Grid
            container
            justifyContent="flex-start"
            sx={{ alignItems: "center" }}
            onKeyDown={onKeyDown}
            columns={12}
          >
            <Grid item xs={1}>
              <IconButton color="primary">
                <AddBoxIcon fontSize="medium" />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <MyTextField
                fullWidth
                id="taskName"
                label="please input task name"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <EstimationSelector numClock={numClock} setNumClock={setNumClock} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskCreator;
