import { Typography, Stack, Card, Box, Divider } from "@mui/material";
import MainTaskCard from "./MainTaskCard";
import TaskSummaryCard from "./TaskSummaryCard";
import TaskCreator from "./TaskCreator";
import ChildrenTaskList from "./ChildrenTaskList";
import {
  useSelectedTaskId,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import Timer from "./Timer";
import TaskConfig from "./TaskConfig";
const TaskManager = () => {
  const taskId = useSelectedTaskId();
  const taskViewModel = useTaskViewModel(taskId);

  return (
    <Box sx={{ m: 1 }}>
      <Stack spacing={2}>
        <Timer />
        <TaskConfig />
        <MainTaskCard taskName={taskViewModel.task.name} />
        <TaskSummaryCard task={taskViewModel.task} />
        <TaskCreator taskId={taskId} />
        <Divider sx={{ fontSize: "8px", color: "#9e9e9e" }}>
          Child Tasks
        </Divider>
        <ChildrenTaskList childrenIdList={taskViewModel.task.childrenIdList} />
      </Stack>
    </Box>
  );
};
export default TaskManager;
