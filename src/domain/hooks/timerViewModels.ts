import { NoEncryption } from "@mui/icons-material";
import { registerEventAPI } from "backendApi";
import dayjs from "dayjs";
import { Second, TaskId, Timer, TimerViewModel } from "domain/model";
import { atom, useRecoilValue, useRecoilState, selector } from "recoil";
import { userIdState } from "./taskViewModel";

export const timerState = atom<Timer>({
  key: "timer",
  default: {
    taskId: "",
    start: dayjs(),
    isTask: true,
    setTime: 0,
    remainTime: 0,
    timerWorking: "none",
  },
});

export const useTimerState = (): TimerViewModel => {
  const [preTimer, setTimer] = useRecoilState(timerState);
  const userId = useRecoilValue(userIdState);
  const updateTimer = (timer: Timer) => {
    if (preTimer.taskId !== timer.taskId && preTimer.taskId) {
      registerEventAPI(
        userId,
        preTimer.taskId,
        preTimer.start.toDate(),
        dayjs().toDate()
      ).catch((e) => {
        throw new Error(`Event Creation Failed with error: ${e}`);
      });
    }
    setTimer(timer);
  };
  const startTask = (taskId: TaskId) => {
    updateTimer({
      taskId: taskId,
      start: dayjs(),
      isTask: true,
      // TODO ユーザー設定から1clockの時間取得
      setTime: 25 * 60,
      remainTime: 0,
      timerWorking: "Full",
    });
  };
  const updateRemainTime = (remainTime: Second) => {
    updateTimer({
      taskId: preTimer.taskId,
      start: preTimer.start,
      isTask: preTimer.isTask,
      setTime: preTimer.setTime,
      remainTime: remainTime,
      timerWorking: preTimer.timerWorking,
    });
  };
  const changeTaskBreak = () => {
    if (preTimer.isTask) {
      registerEventAPI(
        userId,
        preTimer.taskId,
        preTimer.start.toDate(),
        dayjs().toDate()
      ).catch((e) => {
        throw new Error(`Event Creation Failed with error: ${e}`);
      });
    }
    updateTimer({
      taskId: preTimer.taskId,
      start: dayjs(),
      isTask: !preTimer.isTask,
      // TODO ユーザー設定から1clockの時間取得
      setTime: !preTimer.isTask ? 25 * 60 : 5 * 60,
      remainTime: 0,
      timerWorking: preTimer.timerWorking,
    });
  };
  const changeMiniWindow = () => {
    updateTimer({
      taskId: preTimer.taskId,
      start: preTimer.start,
      isTask: preTimer.isTask,
      setTime: preTimer.remainTime,
      remainTime: 0,
      timerWorking: "Mini",
    });
  };
  const changeFullWindow = () => {
    updateTimer({
      taskId: preTimer.taskId,
      start: preTimer.start,
      isTask: preTimer.isTask,
      setTime: preTimer.remainTime,
      remainTime: 0,
      timerWorking: "Full",
    });
  };
  return {
    timer: preTimer,
    startTask,
    updateRemainTime,
    changeTaskBreak,
    changeMiniWindow,
    changeFullWindow,
  };
};
