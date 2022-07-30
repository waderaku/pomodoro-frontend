import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { TaskViewModel } from "domain/model";
import TaskActionList from "../TaskActionList.tsx";
const MainTaskCard = (props: { taskViewModel: TaskViewModel }) => {
  const mainTask = props.taskViewModel.task;
  const mainIconColor = "primary";
  const mainIconSize = "large";
  return (
    <Card>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <TaskAltIcon fontSize="medium" />
        </Grid>
        <Grid item>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="body2"
              component="span"
              sx={{ fontSize: "8px", color: "#9e9e9e" }}
            >
              Selected Task Name
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3.5}></Grid>
        <Grid item xs={5}>
          <Box sx={{ p: 1 }}>
            <Typography variant="h2" align="center">
              {mainTask.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3.5}>
          <TaskActionList
            taskId={mainTask.id}
            done={mainTask.done}
            finishTask={props.taskViewModel.finishTask}
            iconColor={mainIconColor}
            iconSize={mainIconSize}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
export default MainTaskCard;
