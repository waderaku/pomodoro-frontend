import { DeleteForever } from "@mui/icons-material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  useTaskConfigViewModel,
  useTaskDeleteViewModel,
  useTaskViewModel,
  useHasChildTask,
} from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import { TaskId } from "domain/model";

const ChildTaskCard = (props: { taskId: TaskId; done: boolean }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const hasChildTask = useHasChildTask(props.taskId);
  const { startTask } = useTimerViewModel();
  const { handleConfigOpen } = useTaskConfigViewModel();
  const { handleDeleteScreenOpen } = useTaskDeleteViewModel();

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
            {!hasChildTask ? (
              <Grid item xs={3}>
                <IconButton
                  color="primary"
                  onClick={() => startTask(props.taskId)}
                >
                  <PlayCircleIcon />
                </IconButton>
              </Grid>
            ) : null}
            <Grid item xs={3}>
              <IconButton
                color="primary"
                onClick={() => handleDeleteScreenOpen(props.taskId)}
              >
                <DeleteForever />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton
                color="primary"
                onClick={() => handleConfigOpen(props.taskId)}
              >
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
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
