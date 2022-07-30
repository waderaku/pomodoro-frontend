import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Checkbox,
  Grid,
  IconButton,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { Deadline, TaskId } from "domain/model";
import { useState } from "react";
import { myDatePickerStyle, myInputStyle } from "styles/inputStyles";
import EstimationSelector from "./EstimationSelector";

const MyTextField = styled(TextField)(myInputStyle);
const MyDatePicker = styled(TextField)(myDatePickerStyle);

const TaskCreator = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const createTask = taskViewModel.createTask;
  const [numClock, setNumClock] = useState(0);
  const [deadlineDate, setDeadlineDate] = useState<Deadline>(dayjs());
  const [taskName, setTaskName] = useState("");
  const [shortcutFlg, setShortcutFlg] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShortcutFlg(event.target.checked);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      createTask(taskName, numClock * 25, deadlineDate, "", shortcutFlg);
    }
  };
  const onClick = () => {
    createTask(taskName, numClock * 25, deadlineDate, "", shortcutFlg);
  };

  return (
    <Paper onKeyDown={onKeyDown}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ alignItems: "center" }}
        columns={12}
      >
        <Grid item xs={8}>
          <Grid
            container
            justifyContent="flex-start"
            sx={{ alignItems: "center" }}
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
        <Grid item xs={2}>
          <EstimationSelector numClock={numClock} setNumClock={setNumClock} />
        </Grid>
        <Grid item xs={1}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle2">shortcut</Typography>
            </Grid>
            <Grid item>
              <Checkbox
                checked={shortcutFlg}
                onChange={handleChange}
                sx={{ padding: 0 }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={deadlineDate}
              onChange={(newValue) => {
                newValue && setDeadlineDate(dayjs(newValue));
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
