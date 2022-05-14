import { Grid } from "@mui/material";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import { useWindowDimensions } from "domain/hooks/windowDemention";
import FullwindowTimer from "./FullWindowTimer";
import MiniTimer from "./MiniTimer";

const Timer = () => {
  const { newTimer } = useTimerViewModel();
  const windowDimensions = useWindowDimensions();
  if (newTimer.timerWorking === "Full") {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: windowDimensions.width,
          height: windowDimensions.height,
          zIndex: 2,
        }}
      >
        <FullwindowTimer />
      </div>
    );
  }
  if (newTimer.timerWorking === "Mini") {
    return (
      <div
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          width: windowDimensions.width,
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
          <Grid item xs={3}>
            <MiniTimer />
          </Grid>
        </Grid>
      </div>
    );
  }
  return null;
};

export default Timer;
