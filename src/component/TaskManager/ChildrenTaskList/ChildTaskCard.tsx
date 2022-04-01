import { ListItemButton, ListItemText, Grid, Paper } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
const ChildTaskCard = () => {
  return (
    <Paper
      sx={{
        width: 1.0,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={10.5}>
          <ListItemButton>
            <ListItemText primary="TaskName"></ListItemText>
          </ListItemButton>
        </Grid>
        <Grid item xs={1.5}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={4}>
              <ListItemButton>
                <PlayCircleIcon color="primary" />
              </ListItemButton>
            </Grid>
            <Grid item xs={4}>
              <ListItemButton>
                <DoneOutlineIcon color="primary" />
              </ListItemButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChildTaskCard;
