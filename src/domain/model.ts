import { Dayjs } from "dayjs";

export type UserId = string;
export type TaskId = string;
export type TaskName = string;
export type Minute = number;
export type Notes = string;

export type Task = {
  id: TaskId;
  name: TaskName;
  childrenIdList: TaskId[];
  done: boolean;
  finishedWorkload: Minute;
  estimatedWorkload: Minute;
  deadline: Dayjs | null;
  notes: Notes;
};

export type TaskViewModel = {
  task: Task;
  createTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs | null
  ) => void;
  finishTask: (finishedWorkload: Minute) => void;
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs | null,
    notes: Notes
  ) => void;
};

export type Timer = {
  task: TaskViewModel;
  start: Dayjs;
  length: Minute;
};
