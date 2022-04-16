import { useState } from "react";
import { useTask } from "domain/hooks/task";
import { TaskId } from "domain/model";
import dayjs from "dayjs";
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
import AccessTimeIcon from "@mui/icons-material/AccountCircle";

const TaskConfig = (props: { taskId: TaskId; closeModal: () => void }) => {
  const { name, estimatedWorkload, deadline, notes, updateTask } = useTask(
    props.taskId
  );
  const [nameState, setNameState] = useState(name);
  const [estimatedWorkloadState, setEstimatedWorkloadState] =
    useState(estimatedWorkload);
  const [deadlineState, setDeadlineState] = useState(deadline.toDate());
  const [notesState, setNotesState] = useState(notes);
  const handleUpdateTask = () => {
    updateTask(
      nameState,
      estimatedWorkloadState,
      dayjs(deadlineState),
      notesState
    );
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
            <Grid item xs={8}>
              <TextField
                id="name"
                label="Task Name"
                onChange={(e) => setNameState(e.target.value)}
                defaultValue={nameState}
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
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
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <MobileDatePicker
                label="deadline"
                inputFormat="MM/dd/yyyy"
                value={deadlineState}
                onChange={(e) => {
                  if (e) {
                    setDeadlineState(e);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                id="notes"
                label="notes"
                multiline
                rows={4}
                defaultValue={notesState}
                onChange={(e) => setNotesState(e.target.value)}
              />
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
