import axios from "axios";
import { Minute, Notes, Task, TaskId, UserId } from "domain/model";

const BACKEND_URI = "";
const NOT_IMPLEMENTED_ERROR = new Error("Not Implemented");

interface TaskData {
  name: string;
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

const intoDomainTask = (apitask: APITask): TaskTuple => {
  throw NOT_IMPLEMENTED_ERROR;
};

export const fetchTask = async (userId: UserId) => {
  const endpoint = BACKEND_URI + "/task";
  return await axios
    .get<APITask[]>(endpoint)
    .then((res) => {
      const tupleArray = res.data.map(intoDomainTask);
      const taskPool: Map<TaskId, Task> = new Map();
      tupleArray.map((tuple) => {
        taskPool.set(tuple.id, tuple.task);
      });
      return taskPool;
    })
    .catch((err) => {
      throw new Error(`Unexpected API Response: ${endpoint}.\n${err}`);
    });
};
