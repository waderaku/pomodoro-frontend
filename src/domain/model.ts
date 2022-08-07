import { Dayjs } from "dayjs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type UserId = string;
export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Second = number;
export type Notes = string;
export type Deadline = Dayjs;
export type ShortcutFlg = boolean;
export type TimerWorking = "none" | "Full" | "Mini";
export type Password = string;
export type AouthToken = string;
export type SignInOrUpFlag = boolean;

export type Task = {
  id: TaskId;
  name: TaskName;
  childrenIdList: TaskId[];
  done: boolean;
  finishedWorkload: Minute;
  estimatedWorkload: Minute;
  deadline: Deadline;
  notes: Notes;
  shortcutFlg: boolean;
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
    notes: Notes,
    shortcutFlg: ShortcutFlg
  ) => void;
  deleteTask: () => void;
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
export type TaskDeleteModel = TaskId;

export type UpdateTaskModel = {
  name: TaskName;
  estimatedWorkload: Minute;
  deadline: Deadline;
  notes: Notes;
  shortcutFlg: ShortcutFlg;
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
      shortcutFlg: ShortcutFlg;
    }>
  >;
  handleConfigOpen: (taskId: TaskId) => void;
  handleConfigClose: () => void;
  handleUpdate: (
    updateTask: (
      taskName: TaskName,
      estimatedWorkload: Minute,
      deadline: Deadline,
      notes: Notes,
      shortcutFlg: ShortcutFlg
    ) => void
  ) => void;
  handleUpdateName: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleUpdateEstimatedWorkload: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleUpdateDeadline: (e: any) => void;
  handleUpdateShortcutFlg: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateNotes: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

export type TaskDeleteViewModel = {
  deleteTaskId: TaskId;
  handleDeleteScreenOpen: (taskId: TaskId) => void;
  handleDeleteScreenClose: () => void;
  handleDelete: (deleteTask: () => void) => void;
  isDeleteModalOpen: boolean;
};

export type TaskResponse = {
  taskPool: Map<TaskId, Task>;
  shortcutTaskArray: TaskId[];
};

export type UserData = {
  userId: UserId;
  password: Password;
};
