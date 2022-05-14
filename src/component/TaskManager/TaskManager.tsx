import { Typography, Stack, Card } from "@mui/material";
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
    <Stack spacing={2}>
      <Timer />
      <TaskConfig />
      <Card>
        <Typography variant="h2" align="center">
          {taskViewModel.task.name}
        </Typography>
      </Card>
      <TaskSummaryCard task={taskViewModel.task} />
      <TaskCreator taskId={taskId} />
      <ChildrenTaskList childrenIdList={taskViewModel.task.childrenIdList} />
    </Stack>
  );
};
export default TaskManager;
