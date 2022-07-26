import { registerEventAPI } from "backendApi";
import dayjs from "dayjs";
import { Second, TaskId, Timer, TimerViewModel } from "domain/model";
import { useTimer } from "react-timer-hook";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "./taskViewModel";

export const timerState = atom<Timer>({
  key: "timer",
  default: {
    taskId: "",
    start: dayjs(),
    isTask: false,
    setTime: 1,
    timerWorking: "none",
    isRunning: true,
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
    // TODO：現仕様ではStart→Stop→Startした場合、Stopしていた時間もTimerが進んでいる
    // 今の状態の場合、Full→Start→Stop→Mini→Startの手順を踏んだ場合、Stopしていた時間はTimerが進まない
    // 基本的には後者が仕様として正しそうだが、その場合バックエンドに繋げるAPIの仕様を考慮する必要がある
    autoStart: timer.isRunning,
  });

  const updateTimer = (newTimerState: Timer, restartFlg: boolean) => {
    setTimer(newTimerState);
    const expiryTimestamp = setTime(newTimerState.setTime);
    restart(expiryTimestamp, restartFlg);
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
        isRunning: true,
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
        isRunning: true,
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
        isRunning: isRunning,
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
        isRunning: isRunning,
      },
      isRunning
    );
  };

  return {
    newTimer: timer,
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
