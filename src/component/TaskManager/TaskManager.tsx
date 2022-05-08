import { Typography, Stack, Card } from "@mui/material";
import TaskSummaryCard from "./TaskSummaryCard";
import TaskCreator from "./TaskCreator";
import ChildrenTaskList from "./ChildrenTaskList";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import Timer from "./Timer";
import TaskConfig from "./TaskConfig";

const TaskManager = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);

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
      <TaskCreator taskId={props.taskId} />
      <ChildrenTaskList childrenIdList={taskViewModel.task.childrenIdList} />
    </Stack>
  );
};
export default TaskManager;
