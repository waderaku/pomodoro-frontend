import axios from "axios";
import dayjs from "dayjs";
import {
  Deadline,
  Minute,
  Notes,
  Task,
  TaskId,
  TaskName,
  UserId,
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
  task: Task;
}

interface FetchTaskResponse {
  task: APITask[];
  rootTaskId: TaskId[];
}

const intoDomainTask = (apitask: APITask): TaskTuple => {
  const taskData = apitask.taskData;
  const taskId = apitask.id;
  const task = {
    ...taskData,
    id: taskId,
    deadline: dayjs(taskData.deadline),
    // コンパイルエラーになるため一旦代入
    // Get側で対応した時に削除
    shortcutFlg: true,
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
        taskPool.set(tuple.id, tuple.task);
      });
      return {
        taskPool: taskPool,
        rootTaskArray: res.data.rootTaskId,
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
  console.log(taskData);
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
  notes: Notes
) => {
  const endpoint = BACKEND_URI + "task";
  const idHeader = {
    userId: userId,
  };
  const headers = {
    headers: idHeader,
  };
  const updateData = {
    parentId,
    name,
    estimatedWorkload,
    deadline: deadline.toDate(),
    notes,
  };
  return await axios
    .post<null>(endpoint, updateData, headers)
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
