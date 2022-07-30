import AccessTimeIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  useTaskConfigViewModel,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
};

const TaskConfig = (props: { taskId: TaskId }) => {
  const {
    isModalOpen,
    updateTaskProps,
    setupdateTaskProps,
    handleConfigClose,
    handleUpdate,
    handleUpdateName,
    handleUpdateEstimatedWorkload,
    handleUpdateDeadline,
    handleUpdateShortcutFlg,
    handleUpdateNotes,
  } = useTaskConfigViewModel();
  const { task, updateTask } = useTaskViewModel(props.taskId);
  useEffect(() => {
    setupdateTaskProps({
      name: task.name,
      estimatedWorkload: task.estimatedWorkload,
      deadline: task.deadline,
      notes: task.notes,
      shortcutFlg: task.shortcutFlg,
    });
    // eslint-disable-next-line
  }, []);  

  return (
    <Modal
      open={isModalOpen}
      onClose={handleConfigClose}
      aria-labelledby="taskConfig"
      aria-describedby="taskConfig"
    >
      <Box m={1} sx={style}>
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
                    onChange={(e) => handleUpdateName(e)}
                    defaultValue={updateTaskProps.name}
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
                    label="Estimated Workload Num"
                    type="number"
                    onChange={(e) => handleUpdateEstimatedWorkload(e)}
                    defaultValue={updateTaskProps.estimatedWorkload}
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
                      value={updateTaskProps.deadline}
                      onChange={(e) => handleUpdateDeadline(e)}
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={updateTaskProps.shortcutFlg}
                        onChange={handleUpdateShortcutFlg}
                      />
                    }
                    label="Shortcut"
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
                    id="notes"
                    label="notes"
                    multiline
                    rows={4}
                    defaultValue={updateTaskProps.notes}
                    onChange={(e) => handleUpdateNotes(e)}
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
              <Button size="small" onClick={handleConfigClose}>
                close
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleUpdate(updateTask);
                }}
              >
                push
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default TaskConfig;
