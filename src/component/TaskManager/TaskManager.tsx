import { Typography, Stack, Card, Grid } from "@mui/material";
import TaskSummaryCard from "./TaskSummaryCard";
import TaskCreator from "./TaskCreator";
import ChildrenTaskList from "./ChildrenTaskList";
import { useTaskViewModel } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import { FC } from "react";
import { useTimerState } from "domain/hooks/timerViewModels";
import FullwindowTimer from "./Timer/FullWindowTimer";
import MiniTimer from "./Timer/MiniTimer";
import { useWindowDimensions } from "domain/hooks/windowDemention";

const TaskManager = (props: { taskId: TaskId }) => {
  const taskViewModel = useTaskViewModel(props.taskId);
  const { timer } = useTimerState();
  // const windowDimensions = useWindowDimensions();
  const Timer: FC = () => {
    const { innerWidth: width, innerHeight: height } = window;
    if (timer.timerWorking === "Full") {
      return (
        <div
          style={{
            display: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height,
          }}
        >
          <FullwindowTimer />
        </div>
      );
    }
    if (timer.timerWorking === "Mini") {
      return (
        <div
          style={{
            display: "absolute",
            top: "80%",
            left: "50%",
            width: width,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            columns={{ xs: 10 }}
          >
            <Grid item xs={3}>
              <MiniTimer />
            </Grid>
          </Grid>
        </div>
      );
    }
    return <div />;
  };

  return (
    <Stack spacing={2}>
      <Timer />
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
