import { Dayjs } from "dayjs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type UserId = string;
export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Second = number;
export type Notes = string;
export type Deadline = Dayjs;
export type ShortcutFlg = Boolean;
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
    notes: Notes,
    shortcutFlg: ShortcutFlg
  ) => void;
  finishTask: () => void;
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes
  ) => void;
  toManager: () => void;
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

export type TaskConfigModel = TaskId | null;

export type UpdateTaskModel = {
  name: TaskName;
  estimatedWorkload: Minute;
  deadline: Deadline;
  notes: Notes;
};

export type TaskConfigViewModel = {
  taskConfig: TaskConfigModel;
  isModalOpen: boolean;
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
  handleUpdateName: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleUpdateEstimatedWorkload: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleUpdateDeadline: (e: any) => void;
  handleUpdateNotes: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

export type TaskResponse = {
  taskPool: Map<TaskId, Task>;
  rootTaskArray: TaskId[];
};
