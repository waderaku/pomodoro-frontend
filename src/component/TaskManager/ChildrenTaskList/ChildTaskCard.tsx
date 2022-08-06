import { Grid, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import TaskActionList from "../TaskActionList.tsx";

const ChildTaskCard = (props: { taskId: TaskId; done: boolean }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const childIconColor = "secondary";
  const childIconSize = "medium";
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
          <TaskActionList
            taskId={props.taskId}
            done={props.done}
            finishTask={taskViewModel.finishTask}
            iconColor={childIconColor}
            iconSize={childIconSize}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChildTaskCard;
