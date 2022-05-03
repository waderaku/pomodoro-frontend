import { Timer } from "@mui/icons-material";
import { Dayjs } from "dayjs";

export type UserId = string;
export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Second = number;
export type Notes = string;
export type Deadline = Dayjs | null;

export type Task = {
  id: TaskId;
  name: TaskName;
  childrenIdList: TaskId[];
  done: boolean;
  finishedWorkload: Minute;
  estimatedWorkload: Minute;
  deadline: Deadline;
  notes: Notes;
};

export type ChildrenTaskCount = {
  finishedTaskCount: number;
  unfinishedTaskCount: number;
};

export type TaskViewModel = {
  task: Task;
  createTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes
  ) => void;
  finishTask: () => void;
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes
  ) => void;
};

// export type Timer = {
//   task: TaskViewModel;
//   start: Dayjs;
//   length: Minute;
// };
export type Timer = {
  taskId: TaskId;
  start: Dayjs;
  isTask: boolean;
  setTime: Second;
  // remainTime: Second;
  timerWorking: string;
};

export type TimerViewModel = {
  timerState: Timer;
  seconds: Second;
  minutes: Minute;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void;
  setTime: (time: Second) => Date;
  startTask: (taskId: TaskId) => void;
  changeMiniWindow: () => void;
  changeFullWindow: () => void;
};
