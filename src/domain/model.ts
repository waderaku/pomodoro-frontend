import { Dayjs } from "dayjs";

export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Notes = string;

export type Task = {
  id: TaskId;
  name: TaskName;
  childrenIdList: TaskId[];
  finishedWorkload: Minute;
  estimatedWorkload: Minute;
  deadline: Dayjs;
  notes: Notes;
  createTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs
  ) => void;
  finishTask: (finishedWorkload: Minute) => void;
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs,
    notes: Notes
  ) => void;
};

export type Timer = {
  task: Task;
  start: Dayjs;
  length: Minute;
};

export type TaskView = {
  task: Task;
  toManager: () => void;
  startTimer: () => void;
  finishTask: () => void;
  deleteTask: () => void;
  updateTask: () => void;
};
