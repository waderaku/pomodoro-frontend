import { Box, Divider, Stack } from "@mui/material";
import {
  useSelectedTaskId,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import ChildrenTaskList from "./ChildrenTaskList";
import DoneSwitcher from "./DoneSwitcher";
import MainTaskCard from "./MainTaskCard";
import TaskConfig from "./TaskConfig";
import TaskCreator from "./TaskCreator";
import TaskSummaryCard from "./TaskSummaryCard";

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
        <MainTaskCard taskViewModel={taskViewModel} />
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
