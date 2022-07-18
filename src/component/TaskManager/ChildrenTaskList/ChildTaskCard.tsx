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
} from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";

const ChildTaskCard = (props: { taskId: TaskId; done: boolean }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const { startTask } = useTimerViewModel();
  const { handleOpen } = useTaskConfigViewModel();

  return (
    <Paper
      sx={{
        width: 1.0,
        backgroundColor: !props.done ? "#ffffff" : "#eeeeee",
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={9.5} onClick={taskViewModel.toManager}>
          <ListItemButton>
            <ListItemText primary={taskViewModel.task.name}></ListItemText>
          </ListItemButton>
        </Grid>
        <Grid item xs={2.5}>
          <Grid container alignItems="center" justifyContent="center">
            {/* タイマー開始ボタン */}
            <Grid item xs={4}>
              <IconButton
                color="primary"
                onClick={() => startTask(props.taskId)}
              >
                <PlayCircleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              {/* タスクコンフィグボタン */}
              <IconButton
                color="primary"
                onClick={() => handleOpen(props.taskId)}
              >
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              {/* タスク完了ボタン */}
              {!props.done ? (
                <IconButton
                  color="primary"
                  onClick={() => taskViewModel.finishTask()}
                >
                  <DoneOutlineIcon />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChildTaskCard;
