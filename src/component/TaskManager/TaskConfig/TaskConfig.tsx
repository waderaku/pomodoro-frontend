import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Modal,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AccessTimeIcon from "@mui/icons-material/AccountCircle";
import {
  useTaskConfigViewModel,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
};

const TaskConfig = () => {
  const {
    taskConfig,
    updateTaskProps,
    setupdateTaskProps,
    handleClose,
    handleUpdate,
  } = useTaskConfigViewModel();
  const { task, updateTask } = useTaskViewModel(taskConfig.taskId);
  useEffect(() => {
    setupdateTaskProps({
      name: task.name,
      estimatedWorkload: task.estimatedWorkload,
      deadline: task.deadline,
      notes: task.notes,
    });
  }, []);

  return (
    <Modal
      open={taskConfig.isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
                    onChange={(e) =>
                      setupdateTaskProps({
                        ...updateTaskProps,
                        name: e.target.value,
                      })
                    }
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
                    label="pomodor Num"
                    type="number"
                    onChange={(e) =>
                      setupdateTaskProps({
                        ...updateTaskProps,
                        estimatedWorkload: Number(e.target.value),
                      })
                    }
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
                      onChange={(e) => {
                        if (e) {
                          setupdateTaskProps({
                            ...updateTaskProps,
                            deadline: e,
                          });
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
                    defaultValue={updateTaskProps.notes}
                    onChange={(e) =>
                      setupdateTaskProps({
                        ...updateTaskProps,
                        notes: e.target.value,
                      })
                    }
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
              <Button size="small" onClick={handleClose}>
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
