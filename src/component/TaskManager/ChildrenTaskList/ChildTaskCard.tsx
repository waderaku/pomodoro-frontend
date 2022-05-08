import { ListItemButton, ListItemText, Grid, Paper } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { TaskId } from "domain/model";
import {
  useTaskConfigViewModel,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
const ChildTaskCard = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const { startTask } = useTimerViewModel();
  const { handleOpen } = useTaskConfigViewModel();

  return (
    <Paper
      sx={{
        width: 1.0,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9.5}>
          <ListItemButton>
            <ListItemText primary={taskViewModel.task.name}></ListItemText>
          </ListItemButton>
        </Grid>
        <Grid item xs={2.5}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <ListItemButton>
                <PlayCircleIcon
                  color="primary"
                  onClick={() => {
                    startTask(props.taskId);
                  }}
                />
              </ListItemButton>
            </Grid>
            <Grid item xs={3}>
              <ListItemButton>
                <SettingsIcon
                  color="primary"
                  onClick={() => {
                    handleOpen(props.taskId);
                  }}
                />
              </ListItemButton>
            </Grid>
            <Grid item xs={3}>
              <ListItemButton>
                <DoneOutlineIcon color="primary" />
              </ListItemButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChildTaskCard;
