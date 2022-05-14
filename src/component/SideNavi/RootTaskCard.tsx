import { ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useTaskViewModel, useToManager } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";

const RootTaskCard = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const toManager = useToManager();
  return (
    <ListItem disablePadding>
      <Paper
        sx={{
          width: 1.0,
        }}
      >
        <ListItemButton onClick={() => toManager(props.taskId)}>
          <ListItemText primary={taskViewModel.task.name}></ListItemText>
        </ListItemButton>
      </Paper>
    </ListItem>
  );
};

export default RootTaskCard;
