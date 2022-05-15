import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const MainTaskCard = (props: { taskName: string }) => {
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
            <span style={{ fontSize: "8px", color: "#9e9e9e" }}>
              Selected Task Name
            </span>
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
        <Grid item>
          <Box sx={{ p: 1 }}>
            <Typography variant="h2" align="center">
              {props.taskName}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
export default MainTaskCard;
