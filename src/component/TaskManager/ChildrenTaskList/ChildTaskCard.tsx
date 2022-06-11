import {
  ListItemButton,
  ListItemText,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { TaskId } from "domain/model";
import {
  useTaskConfigViewModel,
  useTaskViewModel,
  useToManager,
} from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import {} from "domain/hooks/taskViewModel";

const ChildTaskCard = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const toManager = useToManager();
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
            <ListItemText
              primary={taskViewModel.task.name}
              onClick={() => toManager(props.taskId)}
            ></ListItemText>
          </ListItemButton>
        </Grid>
        <Grid item xs={2.5}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <IconButton
                color="primary"
                onClick={() => startTask(props.taskId)}
              >
                <PlayCircleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                color="primary"
                onClick={() => handleOpen(props.taskId)}
              >
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                color="primary"
                onClick={() => taskViewModel.finishTask}
              >
                <DoneOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChildTaskCard;
