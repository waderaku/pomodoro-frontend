import axios from "axios";
import dayjs from "dayjs";
import {
  Deadline,
  Minute,
  Notes,
  ShortcutFlg,
  Task,
  TaskId,
  TaskName,
  UserId,
  UserData,
  AouthToken,
} from "domain/model";

const BACKEND_URI = process.env.REACT_APP_BACKEND_URL;
const DATE_FORMAT = "YYYY-MM-DD";

interface TaskData {
  name: TaskName;
  childrenIdList: string[];
  done: boolean;
  finishedWorkload: Minute;
  estimatedWorkload: Minute;
  deadline: string;
  notes: Notes;
}

interface APITask {
  id: TaskId;
  taskData: TaskData;
}

interface TaskTuple {
  id: TaskId;
  task: {
    //shortcutFlg無し
    id: TaskId;
    name: TaskName;
    childrenIdList: TaskId[];
    done: boolean;
    finishedWorkload: Minute;
    estimatedWorkload: Minute;
    deadline: Deadline;
    notes: Notes;
  };
}

interface FetchTaskResponse {
  task: APITask[];
  shortcutTaskId: TaskId[];
}

const intoDomainTask = (apitask: APITask): TaskTuple => {
  const taskData = apitask.taskData;
  const taskId = apitask.id;
  const task = {
    ...taskData,
    id: taskId,
    deadline: dayjs(taskData.deadline),
  };
  return {
    id: taskId,
    task: task,
  };
};

export const fetchTaskAPI = async (userId: UserId) => {
  const endpoint = BACKEND_URI + "task";
  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  return await axios
    .get<FetchTaskResponse>(endpoint, headers)
    .then((res) => {
      const tupleArray = res.data.task.map(intoDomainTask);
      const taskPool: Map<TaskId, Task> = new Map();
      tupleArray.forEach((tuple) => {
        const task = {
          ...tuple.task,
          shortcutFlg: res.data.shortcutTaskId.includes(tuple.id),
        };
        taskPool.set(tuple.id, task);
      });
      return {
        taskPool: taskPool,
        shortcutTaskArray: res.data.shortcutTaskId,
      };
    })
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const updateTaskAPI = async (userId: UserId, task: Task) => {
  const endpoint = BACKEND_URI + "task/" + task.id;

  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  const taskData = {
    name: task.name,
    deadline: task.deadline.format(DATE_FORMAT),
    estimatedWorkload: task.estimatedWorkload,
    notes: task.notes,
    done: task.done,
    shortcutFlg: task.shortcutFlg,
  };
  return await axios
    .put<null>(endpoint, taskData, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const registerTaskAPI = async (
  userId: UserId,
  parentId: TaskId,
  name: TaskName,
  estimatedWorkload: Minute,
  deadline: Deadline,
  notes: Notes,
  shortcutFlg: ShortcutFlg
) => {
  const endpoint = BACKEND_URI + "task";
  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  const registerData = {
    parentId,
    name,
    estimatedWorkload,
    deadline: deadline.format(DATE_FORMAT),
    notes,
    shortcutFlg,
  };
  return await axios
    .post<null>(endpoint, registerData, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const deleteTaskAPI = async (userId: UserId, taskId: TaskId) => {
  const endpoint = BACKEND_URI + "task/" + taskId;
  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  return await axios
    .delete<null>(endpoint, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const registerEventAPI = async (
  userId: UserId,
  taskId: TaskId,
  start: Date,
  end: Date
) => {
  const endpoint = BACKEND_URI + "event";
  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  const eventData = {
    taskId,
    start,
    end,
  };
  return await axios
    .post<null>(endpoint, eventData, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const signInUserAPI = async (userData: UserData) => {
  const endpoint = BACKEND_URI + "logIn/";
  const headers = {
    headers: { "Content-Type": "application/json" },
  };
  const eventData = {
    userId: userData.userId,
    password: userData.password,
  };
  return await axios
    .post<AouthToken>(endpoint, eventData, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const registerUserAPI = async (userData: UserData) => {
  const endpoint = BACKEND_URI + "user/";
  const headers = {
    headers: { "Content-Type": "application/json" },
  };
  const eventData = {
    userId: userData.userId,
    password: userData.password,
  };
  return await axios
    .post<null>(endpoint, eventData, headers)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};
