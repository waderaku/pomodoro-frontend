import { Typography, Stack, Card } from "@mui/material";
import TaskSummaryCard from "./TaskSummaryCard";
import TaskCreator from "./TaskCreator";
import ChildrenTaskList from "./ChildrenTaskList";
import { useTaskViewModel } from "domain/hooks/task";
import { TaskId } from "domain/model";

const TaskManager = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  return (
    <Stack spacing={2}>
      <Card>
        <Typography variant="h2" align="center">
          {taskViewModel.task.name}
        </Typography>
      </Card>
      <TaskSummaryCard />
      <TaskCreator taskId={""} />
      <ChildrenTaskList />
    </Stack>
  );
};
export default TaskManager;
