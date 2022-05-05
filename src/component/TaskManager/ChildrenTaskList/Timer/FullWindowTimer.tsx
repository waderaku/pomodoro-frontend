import { Card, Box, Grid, IconButton, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useTimer } from "react-timer-hook";
import { FC } from "react";
import { Second, Task } from "domain/model";

const FullwindowTimer = (props: {
  expiryTime: Second;
  isTask: boolean;
  task: Task;
  closeWindow: (time: Second) => void;
}) => {
  // 下記3行:本番用コード
  // const { name } = useTask(
  //   props.taskId
  // );

  // 下記1行:テスト用コード
  const { name } = props.task;
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
                const resetTime = setTime(expiryTime);
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
              props.closeWindow(minutes * 60 + seconds);
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
              {props.isTask ? "TaskTime" : "Break time"}
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
            <Typography variant="body1">{name}</Typography>
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
