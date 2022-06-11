import { TextField, Grid, Paper, styled, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EstimationSelector from "./EstimationSelector";
import { useRef, useState } from "react";
import { Deadline, TaskId } from "domain/model";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { myDatePickerStyle, myInputStyle } from "styles/inputStyles";
import dayjs from "dayjs";

const MyTextField = styled(TextField)(myInputStyle);
const MyDatePicker = styled(TextField)(myDatePickerStyle);

const TaskCreator = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const createTask = taskViewModel.createTask;
  const [numClock, setNumClock] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState<Deadline>(dayjs());
  const [taskName, setTaskName] = useState("");
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      createTask(taskName, numClock * 25, deadlineDate, "");
    }
  };
  const onClick = () => {
    createTask(taskName, numClock * 25, deadlineDate, "");
  };

  return (
    <Paper>
      <Grid
        container
        justifyContent="space-between"
        sx={{ alignItems: "center" }}
        onKeyDown={onKeyDown}
        columns={12}
      >
        <Grid item xs={8}>
          <Grid
            container
            justifyContent="flex-start"
            sx={{ alignItems: "center" }}
            onKeyDown={onKeyDown}
            columns={12}
          >
            <Grid item xs={1}>
              <IconButton color="primary">
                <AddBoxIcon fontSize="medium" onClick={onClick} />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <MyTextField
                fullWidth
                id="taskName"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                label="please input task name"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <EstimationSelector numClock={numClock} setNumClock={setNumClock} />
        </Grid>
        <Grid item xs={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={deadlineDate}
              onChange={(newValue) => {
                newValue && setDeadlineDate(newValue);
              }}
              renderInput={(params) => <MyDatePicker {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskCreator;
