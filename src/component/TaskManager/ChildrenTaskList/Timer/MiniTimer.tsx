import { Card, Box, Grid, IconButton } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { useTimer } from "react-timer-hook";
import { FC } from "react";
import { Second, Task } from "domain/model";

const MiniTimer = (props: {
  expiryTime: Second;
  isTask: Boolean;
  openWindow: (time: Second) => void;
}) => {
  const { expiryTime } = props;
  const color = props.isTask ? "#FF8A80" : "#82B1FF";

  const setTime = (time: Second): Date => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);
    return expiryTimestamp;
  };

  const expiryTimestamp = setTime(expiryTime);

  const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });

  const Buttons: FC = () => {
    if (isRunning) {
      return (
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          columns={{ xs: 2 }}
        >
          <Grid item xs={1}>
            <IconButton color="primary" size="large" onClick={pause}>
              <PauseCircleIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          columns={{ xs: 2 }}
        >
          <Grid item xs={1}>
            <IconButton color="primary" size="large" onClick={start}>
              <PlayCircleFilledWhiteIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="primary"
              size="large"
              onClick={() => {
                const resetTime = setTime(expiryTime);
                restart(resetTime, false);
              }}
            >
              <StopCircleIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      );
    }
  };
  return (
    <Card style={{ backgroundColor: color }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        columns={{ xs: 12 }}
      >
        <Grid item xs={2}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => {
              props.openWindow(minutes * 60 + seconds);
            }}
          >
            <BrandingWatermarkIcon fontSize="medium" />
          </IconButton>
        </Grid>
        <Grid item xs={5}>
          <Box ml={2}>
            <div style={{ fontSize: "medium" }}>
              <span>{minutes}</span>:<span>{seconds}</span>
            </div>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Buttons />
        </Grid>
      </Grid>
    </Card>
  );
};

export default MiniTimer;
