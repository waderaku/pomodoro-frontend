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
const NOT_IMPLEMENTED_ERROR = new Error("Not Implemented");

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
  rootTaskId: TaskId[];
}

interface TaskTuple {
  id: TaskId;
  task: Task;
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
  const endpoint = BACKEND_URI + "/task";
  const idHeader = {
    userId: userId,
  };
  return await axios
    .get<APITask[]>(endpoint, {
      headers: idHeader,
    })
    .then((res) => {
      const tupleArray = res.data.map(intoDomainTask);
      const taskPool: Map<TaskId, Task> = new Map();
      tupleArray.map((tuple) => {
        return taskPool.set(tuple.id, tuple.task);
      });
      return taskPool;
    })
    .catch((err) => {
      throw new Error(
        `Unexpected API Response from ${endpoint}.\nError: ${err}`
      );
    });
};

export const updateTaskAPI = (userId: UserId, task: Task) => {
  throw NOT_IMPLEMENTED_ERROR;
};

export const registerTaskAPI = (
  userId: UserId,
  parentId: TaskId,
  name: TaskName,
  estimatedWorkload: Minute,
  deadline: Deadline,
  notes: Notes
) => {
  throw NOT_IMPLEMENTED_ERROR;
};
