import { Stack, Box, Divider } from "@mui/material";
import MainTaskCard from "./MainTaskCard";
import TaskSummaryCard from "./TaskSummaryCard";
import TaskCreator from "./TaskCreator";
import ChildrenTaskList from "./ChildrenTaskList";
import {
  useSelectedTaskId,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import TaskConfig from "./TaskConfig";
import DoneSwitcher from "./DoneSwitcher";

import TaskDelete from "./TaskDelete";
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
        <DoneSwitcher />
      </Stack>
    </Box>
  );
};
export default TaskManager;
