import { Card, Box, Grid, IconButton, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { FC } from "react";
import { useTimerViewModel } from "domain/hooks/timerViewModels";

const MiniTimer = () => {
  const {
    newTimer,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
    setTime,
    changeFullWindow,
  } = useTimerViewModel();
  const color = newTimer.isTask ? "#FF8A80" : "#82B1FF";

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
                const resetTime = setTime(newTimer.isTask ? 25 * 60 : 5 * 60);
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
            <Typography variant="inherit" style={{ fontSize: "medium" }}>
              {minutes}:{seconds}
            </Typography>
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
