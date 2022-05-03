import { Card, Box, Grid, IconButton } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { useTimer } from "react-timer-hook";
import { FC, useEffect } from "react";
import { Second } from "domain/model";
import { useTimerState } from "domain/hooks/timerViewModels";

const MiniTimer = () => {
  const { timer, changeFullWindow, updateRemainTime, changeTaskBreak } =
    useTimerState();
  const color = timer.isTask ? "#FF8A80" : "#82B1FF";

  const setTime = (time: Second): Date => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);
    return expiryTimestamp;
  };

  const expiryTimestamp = setTime(timer.setTime);

  const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => changeTaskBreak,
    autoStart: true,
  });

  // useEffect(() => {
  //   updateRemainTime(minutes * 60 + seconds);
  // }, [seconds, minutes]);

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
                // TODO ユーザー設定から1clockの時間取得
                const resetTime = setTime(timer.isTask ? 25 * 60 : 5 * 60);
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
              changeFullWindow();
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
