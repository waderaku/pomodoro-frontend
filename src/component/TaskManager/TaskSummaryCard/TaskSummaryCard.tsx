import IconTextCard from "./IconTextCard";
import { Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Minute, Task } from "domain/model";
import { useFinishedChildrenTaskCount } from "domain/hooks/taskViewModel";

const EstimatedWorkloadIcon = () => <AccessTimeIcon fontSize="large" />;
const FinishedWorkloadIcon = () => <TimelapseIcon fontSize="large" />;
const RemainTaskIcon = () => <AssignmentIcon fontSize="large" />;
const FinishedTaskIcon = () => <AssignmentTurnedInIcon fontSize="large" />;

const minuteToHourMinute = (time: Minute) => {
  const hour = Math.floor(time / 60);
  const minute = Math.floor(time - hour * 60);
  return { hour: hour, minute: minute };
};

const exprMinute = (time: Minute) => {
  const { hour, minute } = minuteToHourMinute(time);
  let expr = "";
  if (hour > 0) {
    expr += hour + "h";
  }
  expr += minute + "m";
  return expr;
};

const TaskSummaryCard = (props: { task: Task }) => {
  const { finishedTaskCount, unfinishedTaskCount } =
    useFinishedChildrenTaskCount(props.task.id);
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={2.5}>
        <IconTextCard
          Icon={EstimatedWorkloadIcon}
          text={exprMinute(props.task.estimatedWorkload)}
        />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard
          Icon={FinishedWorkloadIcon}
          text={exprMinute(props.task.finishedWorkload)}
        />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard
          Icon={RemainTaskIcon}
          text={unfinishedTaskCount.toString()}
        />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard
          Icon={FinishedTaskIcon}
          text={finishedTaskCount.toString()}
        />
      </Grid>
    </Grid>
  );
};

export default TaskSummaryCard;
