import IconTextCard from "./IconTextCard";
import { Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const EstimatedWorkloadIcon = () => <AccessTimeIcon fontSize="large" />;
const FinishedWorkloadIcon = () => <TimelapseIcon fontSize="large" />;
const RemainTaskIcon = () => <AssignmentIcon fontSize="large" />;
const FinishedTaskIcon = () => <AssignmentTurnedInIcon fontSize="large" />;

const TaskSummaryCard = () => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={2.5}>
        <IconTextCard Icon={EstimatedWorkloadIcon} text="2h" />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard Icon={FinishedWorkloadIcon} text="30m" />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard Icon={RemainTaskIcon} text="3" />
      </Grid>
      <Grid item xs={2.5}>
        <IconTextCard Icon={FinishedTaskIcon} text="1" />
      </Grid>
    </Grid>
  );
};

export default TaskSummaryCard;
