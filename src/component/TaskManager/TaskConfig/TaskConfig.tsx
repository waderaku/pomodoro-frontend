import { useState } from "react";
import { TaskId, TaskViewModel } from "domain/model";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AccessTimeIcon from "@mui/icons-material/AccountCircle";

// テスト用に一旦propsでtasksを与える。これはuseTaskで置き換わる想定
const TaskConfig = (props: {
  taskId: TaskId;
  closeModal: () => void;
  taskViewModel: TaskViewModel;
}) => {
  // 下記3行:本番用コード
  // const { name, estimatedWorkload, deadline, notes, updateTask } = useTask(
  //   props.taskId
  // );

  // 下記1行:テスト用コード
  const updateTask = props.taskViewModel.updateTask;
  const { name, estimatedWorkload, deadline, notes } = props.taskViewModel.task;

  const [nameState, setNameState] = useState(name);
  const [estimatedWorkloadState, setEstimatedWorkloadState] =
    useState(estimatedWorkload);
  const [deadlineState, setDeadlineState] = useState(deadline);
  const [notesState, setNotesState] = useState(notes);
  const handleUpdateTask = () => {
    updateTask(nameState, estimatedWorkloadState, deadlineState, notesState);
  };
  return (
    <Box m={1}>
      <Card variant="outlined">
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <TextField
                  fullWidth
                  id="name"
                  label="Task Name"
                  onChange={(e) => setNameState(e.target.value)}
                  defaultValue={nameState}
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <TextField
                  fullWidth
                  id="estimatedWorkload"
                  label="pomodor Num"
                  type="number"
                  onChange={(e) =>
                    setEstimatedWorkloadState(Number(e.target.value))
                  }
                  defaultValue={estimatedWorkloadState}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label="deadline"
                    inputFormat="yyyy/MM/dd"
                    value={deadlineState}
                    onChange={(e) => {
                      if (e) {
                        setDeadlineState(e);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Box mt={1}>
                <TextField
                  fullWidth
                  id="notes"
                  label="notes"
                  multiline
                  rows={4}
                  defaultValue={notesState}
                  onChange={(e) => setNotesState(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button size="small" onClick={props.closeModal}>
              close
            </Button>
            <Button size="small" onClick={handleUpdateTask}>
              push
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskConfig;
