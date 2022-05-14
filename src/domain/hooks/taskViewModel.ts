import { fetchTaskAPI, registerTaskAPI, updateTaskAPI } from "backendApi";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilState,
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
  TaskConfigModel,
  TaskConfigViewModel,
  TaskResponse,
} from "../model";

const taskResponseState = selector<TaskResponse>({
  key: "taskResponse",
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) {
      throw Error("User is not yet logged in");
    }
    const taskResponse = await fetchTaskAPI(userId);
    return taskResponse;
  },
});

const taskPoolState = selector<Map<TaskId, Task>>({
  key: "taskPool",
  get: ({ get }) => {
    return get(taskResponseState).taskPool;
  },
});

const rootTaskArrayState = selector<TaskId[]>({
  key: "rootTaskArray",
  get: ({ get }) => {
    return get(taskResponseState).rootTaskArray;
  },
});

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

// 現在のTaskManagerに表示されるべきTaskのId
export const selectedTaskIdState = atom<TaskId>({
  key: "selectedTaskId",
});

// 現在選択されているTaskManagerに表示するべきTaskのIdを返す
export const useSelectedTaskId = (): TaskId => {
  return useRecoilValue(selectedTaskIdState);
};

export const userIdState = atom<UserId>({
  key: "userId",
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
    )
      .then(() => {
        refresh();
      })
      .catch((e) => {
        throw new Error(`Task Creation Failed with error: ${e}`);
      });
  };
  // TaskSummaryCardでfinishタスクが押下されたとき
  const finishTask = () => {
    if (task.done) {
      throw new Error("This task is already done");
    }
    const newTask = { ...task, done: true };
    updateTaskAPI(userId, newTask)
      .then(() => {
        refresh();
      })
      .catch((e) => {
        throw new Error(`Task Creation Failed with error: ${e}`);
      });
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
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdState);
  const toManager = () => setSelectedTaskId(task.id);

  return {
    task,
    createTask,
    finishTask,
    updateTask,
    toManager,
  };
};

export const useRootTaskArray = () => {
  return useRecoilValue(rootTaskArrayState);
};

const taskConfigState = atom<TaskConfigModel>({
  key: "taskConfig",
  default: null,
});

export const useTaskConfigViewModel = (): TaskConfigViewModel => {
  const [taskConfig, setTaskConfig] = useRecoilState(taskConfigState);
  const isModalOpen = taskConfig ? true : false;
  const [updateTaskProps, setupdateTaskProps] = useState({
    name: "",
    estimatedWorkload: 0,
    deadline: dayjs(),
    notes: "",
  });
  const handleOpen = (taskId: TaskId) => {
    setTaskConfig(taskId);
  };
  const handleClose = () => {
    setTaskConfig(null);
  };
  const handleUpdate = (
    updateTask: (
      taskName: TaskName,
      estimatedWorkload: Minute,
      deadline: Deadline,
      notes: Notes
    ) => void
  ) => {
    updateTask(
      updateTaskProps.name,
      updateTaskProps.estimatedWorkload,
      updateTaskProps.deadline,
      updateTaskProps.notes
    );
    handleClose();
  };
  const handleUpdateName = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setupdateTaskProps({
      ...updateTaskProps,
      name: e.target.value,
    });
  };
  const handleUpdateEstimatedWorkload = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setupdateTaskProps({
      ...updateTaskProps,
      estimatedWorkload: Number(e.target.value),
    });
  };
  const handleUpdateDeadline = (e: Deadline) => {
    if (e) {
      setupdateTaskProps({
        ...updateTaskProps,
        deadline: e,
      });
    }
  };
  const handleUpdateNotes = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setupdateTaskProps({
      ...updateTaskProps,
      notes: e.target.value,
    });
  };
  return {
    taskConfig,
    isModalOpen,
    updateTaskProps,
    setupdateTaskProps,
    handleOpen,
    handleClose,
    handleUpdate,
    handleUpdateName,
    handleUpdateEstimatedWorkload,
    handleUpdateDeadline,
    handleUpdateNotes,
  };
};
