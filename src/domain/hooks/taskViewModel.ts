import { fetchTaskAPI, registerTaskAPI, updateTaskAPI } from "backendApi";
import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
} from "recoil";
import {
  TaskViewModel,
  TaskId,
  Task,
  UserId,
  TaskName,
  Minute,
  Notes,
  Deadline,
  ChildrenTaskCount,
} from "../model";

const taskState = selectorFamily<Task, TaskId>({
  key: "task",
  get:
    (taskId) =>
    ({ get }) => {
      const taskPool = get(taskPoolState);
      const task = taskPool.get(taskId);
      if (task) {
        return task;
      } else {
        throw new Error("Unexpected TaskId");
      }
    },
});

const childrenTaskCountState = selectorFamily<ChildrenTaskCount, TaskId>({
  key: "childrenTaskCount",
  get:
    (taskId) =>
    ({ get }) => {
      const task = get(taskState(taskId));
      const finishedTaskCount = task.childrenIdList.filter(
        (taskId) => get(taskState(taskId)).done
      ).length;
      const unfinishedTaskCount = task.childrenIdList.filter(
        (taskId) => !get(taskState(taskId)).done
      ).length;
      return {
        finishedTaskCount,
        unfinishedTaskCount,
      };
    },
});

export const useFinishedChildrenTaskCount = (taskId: TaskId) => {
  return useRecoilValue(childrenTaskCountState(taskId));
};

// 現在選択されているTaskManagerに表示するべきTaskのIdを返す
export const useSelectedTaskId = (): TaskId => {
  return "task1";
  // throw NOT_IMPLEMENTED_ERROR;
};

export const userIdState = atom<UserId>({
  key: "userId",
});

export const taskPoolState = selector<Map<TaskId, Task>>({
  key: "taskPool",
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) {
      throw Error("User is not yet logged in");
    }
    const taskPool = await fetchTaskAPI(userId);
    return taskPool;
  },
});

export const useIsTaskLoaded = () => {
  return useRecoilValueLoadable(taskPoolState).state === "hasValue";
};

export const useTaskViewModel = (taskId: TaskId): TaskViewModel => {
  const task = useRecoilValue(taskState(taskId));
  const userId = useRecoilValue(userIdState);
  // TaskCreatorとサイドバーのプロジェクトの追加で使われるタスク追加
  const refresh = useRecoilRefresher_UNSTABLE(taskPoolState);
  const createTask = (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes
  ) => {
    registerTaskAPI(
      userId,
      task.id,
      taskName,
      estimatedWorkload,
      deadline,
      notes
    );
    refresh();
  };
  // TaskSummaryCardでfinishタスクが押下されたとき
  const finishTask = () => {
    if (task.done) {
      throw new Error("This task is already done");
    }
    const newTask = { ...task, done: true };
    updateTaskAPI(userId, newTask);
    refresh();
  };
  // Configモーダルでtaskの編集がなされた時
  const updateTask = (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes
  ) => {
    const newTask = {
      ...task,
      name: taskName,
      estimatedWorkload,
      deadline,
      notes,
    };
    updateTaskAPI(userId, newTask);
    refresh();
  };

  return {
    task,
    createTask,
    finishTask,
    updateTask,
  };
};
