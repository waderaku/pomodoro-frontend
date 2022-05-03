import { registerEventAPI } from "backendApi";
import dayjs from "dayjs";
import { Second, TaskId, Timer, TimerViewModel } from "domain/model";
import { useTimer } from "react-timer-hook";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { userIdState } from "./taskViewModel";

export const timerState = atom<Timer>({
  key: "timer",
  default: {
    taskId: "",
    start: dayjs(),
    isTask: false,
    setTime: 1,
    timerWorking: "none",
  },
});

export const useTimerViewModel = (): TimerViewModel => {
  const [timer, setTimer] = useRecoilState(timerState);
  const userId = useRecoilValue(userIdState);

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

  const updateTimer = (newTimerState: Timer, restartFlg: boolean) => {
    setTimer(newTimerState);
    const resetTime = setTime(newTimerState.setTime);
    restart(resetTime, restartFlg);
  };

  const startTask = (taskId: TaskId) => {
    if (timer.taskId !== taskId && timer.taskId) {
      registerEventAPI(
        userId,
        timer.taskId,
        timer.start.toDate(),
        dayjs().toDate()
      ).catch((e) => {
        throw new Error(`Event Creation Failed with error: ${e}`);
      });
    }
    updateTimer(
      {
        taskId: taskId,
        start: dayjs(),
        isTask: true,
        // TODO ユーザー設定から1clockの時間取得
        setTime: 25 * 60,
        timerWorking: "Full",
      },
      true
    );
  };

  const changeTaskBreak = () => {
    if (timer.isTask && timer.taskId) {
      registerEventAPI(
        userId,
        timer.taskId,
        timer.start.toDate(),
        dayjs().toDate()
      ).catch((e) => {
        throw new Error(`Event Creation Failed with error: ${e}`);
      });
    }
    updateTimer(
      {
        taskId: timer.taskId,
        start: dayjs(),
        isTask: !timer.isTask,
        // TODO ユーザー設定から1clockの時間取得
        setTime: !timer.isTask ? 25 * 60 : 5 * 60,
        timerWorking: timer.timerWorking,
      },
      true
    );
  };

  const changeMiniWindow = () => {
    updateTimer(
      {
        taskId: timer.taskId,
        start: timer.start,
        isTask: timer.isTask,
        setTime: seconds + minutes * 60,
        timerWorking: "Mini",
      },
      isRunning
    );
  };

  const changeFullWindow = () => {
    updateTimer(
      {
        taskId: timer.taskId,
        start: timer.start,
        isTask: timer.isTask,
        setTime: seconds + minutes * 60,
        timerWorking: "Full",
      },
      isRunning
    );
  };

  return {
    timerState: timer,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
    setTime,
    startTask,
    changeMiniWindow,
    changeFullWindow,
  };
};
