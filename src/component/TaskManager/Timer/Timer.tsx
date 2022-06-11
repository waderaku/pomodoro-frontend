import { Box, Grid } from "@mui/material";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import FullwindowTimer from "./FullWindowTimer";
import MiniTimer from "./MiniTimer";
import { useWindowDimensions } from "domain/hooks/windowDemention";

const Timer = () => {
  const { newTimer } = useTimerViewModel();
  const windowDimensions = useWindowDimensions();

  if (newTimer.timerWorking === "Full") {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1101,
        }}
      >
        <FullwindowTimer />
      </Box>
    );
  }
  if (newTimer.timerWorking === "Mini") {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          width: (windowDimensions.width / 10) * 3,
          zIndex: 2,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          columns={{ xs: 10 }}
        >
          <Grid item xs={10}>
            <MiniTimer />
          </Grid>
        </Grid>
      </Box>
    );
  }
  return null;
};

export default Timer;
