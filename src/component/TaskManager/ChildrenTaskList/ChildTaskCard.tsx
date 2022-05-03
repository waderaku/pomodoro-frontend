import { ListItemButton, ListItemText, Grid, Paper } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { TaskId } from "domain/model";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
const ChildTaskCard = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const { startTask } = useTimerViewModel();

  return (
    <Paper
      sx={{
        width: 1.0,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={10.5}>
          <ListItemButton>
            <ListItemText primary={taskViewModel.task.name}></ListItemText>
          </ListItemButton>
        </Grid>
        <Grid item xs={1.5}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <ListItemButton>
                <PlayCircleIcon
                  color="primary"
                  onClick={() => {
                    startTask(props.taskId);
                  }}
                />
              </ListItemButton>
            </Grid>
            <Grid item xs={4}>
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
