import { Box, Divider, Stack } from "@mui/material";
import {
  useSelectedTaskId,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import ChildrenTaskList from "./ChildrenTaskList";
import MainTaskCard from "./MainTaskCard";
import TaskConfig from "./TaskConfig";
import TaskCreator from "./TaskCreator";
import TaskDelete from "./TaskDelete";
import TaskSummaryCard from "./TaskSummaryCard";
import Timer from "./Timer";
const TaskManager = () => {
  const taskId = useSelectedTaskId();
  const taskViewModel = useTaskViewModel(taskId);

  return (
    <Box sx={{ m: 1 }}>
      <Stack spacing={2}>
        <Timer />
        <TaskConfig />
        <TaskDelete />
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
