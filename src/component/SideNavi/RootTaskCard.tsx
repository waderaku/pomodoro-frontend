import { ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";

const RootTaskCard = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  return (
    <ListItem disablePadding>
      <Paper
        sx={{
          width: 1.0,
        }}
      >
        <ListItemButton onClick={taskViewModel.toManager}>
          <ListItemText primary={taskViewModel.task.name}></ListItemText>
        </ListItemButton>
      </Paper>
    </ListItem>
  );
};

export default RootTaskCard;
