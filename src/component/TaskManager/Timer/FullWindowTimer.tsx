import { Card, Box, Grid, IconButton, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { FC } from "react";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import { useTaskViewModel } from "domain/hooks/taskViewModel";

const FullwindowTimer = () => {
  const {
    timerState,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
    setTime,
    changeMiniWindow,
  } = useTimerViewModel();
  const { task } = useTaskViewModel(timerState.taskId);
  const color = timerState.isTask ? "#FF8A80" : "#82B1FF";

  const Buttons: FC = () => {
    if (isRunning) {
      return (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <IconButton color="primary" size="large" onClick={pause}>
              <PauseCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <IconButton color="primary" size="large" onClick={start}>
              <PlayCircleFilledWhiteIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton
              color="primary"
              size="large"
              onClick={() => {
                // TODO ユーザー設定から1clockの時間取得
                const resetTime = setTime(timerState.isTask ? 25 * 60 : 5 * 60);
                restart(resetTime, false);
              }}
            >
              <StopCircleIcon sx={{ fontSize: 50 }} />
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
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs="auto">
          <IconButton
            color="primary"
            size="large"
            onClick={() => {
              changeMiniWindow();
            }}
          >
            <BrandingWatermarkIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box m={1} mt={8}>
            <Typography variant="h3">
              {timerState.isTask ? "TaskTime" : "Break time"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box m={1}>
            <Typography variant="body1">{task.name}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <div style={{ fontSize: "100px" }}>
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Box m={1} mb={10}>
            <Buttons />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FullwindowTimer;
