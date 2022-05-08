import { Timer } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

export type UserId = string;
export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Second = number;
export type Notes = string;
export type Deadline = Dayjs | null;
export type TimerWorking = "none" | "Full" | "Mini";

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

export type Timer = {
  taskId: TaskId;
  start: Dayjs;
  isTask: boolean;
  setTime: Second;
  timerWorking: TimerWorking;
};

export type TimerViewModel = {
  newTimer: Timer;
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

export type TaskConfigModel = {
  taskId: TaskId;
  isModalOpen: boolean;
};

export type UpdateTaskModel = {
  name: TaskName;
  estimatedWorkload: Minute;
  deadline: Deadline;
  notes: Notes;
};

export type TaskConfigViewModel = {
  taskConfig: TaskConfigModel;
  updateTaskProps: UpdateTaskModel;
  setupdateTaskProps: Dispatch<
    SetStateAction<{
      name: TaskName;
      estimatedWorkload: Minute;
      deadline: any;
      notes: Notes;
    }>
  >;
  handleOpen: (taskId: TaskId) => void;
  handleClose: () => void;
  handleUpdate: (
    updateTask: (
      taskName: TaskName,
      estimatedWorkload: Minute,
      deadline: Deadline,
      notes: Notes
    ) => void
  ) => void;
};
