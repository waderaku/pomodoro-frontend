import {
  deleteTaskAPI,
  fetchTaskAPI,
  registerTaskAPI,
  updateTaskAPI,
} from "backendApi";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import {
  atom,
  selector,
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  ChildrenTaskCount,
  Deadline,
  Minute,
  Notes,
  ShortcutFlg,
  Task,
  TaskConfigModel,
  TaskConfigViewModel,
  TaskDeleteModel,
  TaskDeleteViewModel,
  TaskId,
  TaskName,
  TaskResponse,
  TaskViewModel,
  UserId,
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

// ショートカットタスクのうち未完了のものの配列をリターン
const shortcutTaskArrayState = selector<TaskId[]>({
  key: "shortcutTaskArray",
  get: ({ get }) =>
    get(taskResponseState).shortcutTaskArray.filter(
      (taskId) => !get(taskState(taskId)).done
    ),
});

export const taskState = selectorFamily<Task, TaskId>({
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
  const createTask = async (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes,
    shortcutFlg: ShortcutFlg
  ) => {
    await registerTaskAPI(
      userId,
      task.id,
      taskName,
      estimatedWorkload,
      deadline,
      notes,
      shortcutFlg
    );
    refresh();
  };
  // TaskSummaryCardでfinishタスクが押下されたとき
  const finishTask = async () => {
    if (task.done) {
      throw new Error("This task is already done");
    }
    const newTask = { ...task, done: true };
    await updateTaskAPI(userId, newTask);
    refresh();
  };
  // Configモーダルでtaskの編集がなされた時
  const updateTask = (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
    notes: Notes,
    shortcutFlg: ShortcutFlg
  ) => {
    const newTask = {
      ...task,
      name: taskName,
      estimatedWorkload,
      deadline,
      notes,
      shortcutFlg,
    };
    updateTaskAPI(userId, newTask);
    refresh();
  };
  const deleteTask = () => {
    deleteTaskAPI(userId, taskId);
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
    deleteTask,
  };
};

export const useShortcutTaskArray = () => {
  return useRecoilValue(shortcutTaskArrayState);
};

const taskConfigState = atom<TaskConfigModel>({
  key: "taskConfig",
  default: null,
});

const taskDeleteState = atom<TaskDeleteModel>({
  key: "taskDelete",
  default: "",
});

export const useTaskConfigViewModel = (): TaskConfigViewModel => {
  const [taskConfig, setTaskConfig] = useRecoilState(taskConfigState);
  const isModalOpen = taskConfig ? true : false;
  const [updateTaskProps, setupdateTaskProps] = useState({
    name: "",
    estimatedWorkload: 0,
    deadline: dayjs(),
    notes: "",
    shortcutFlg: false,
  });
  const handleConfigOpen = (taskId: TaskId) => {
    setTaskConfig(taskId);
  };
  const handleConfigClose = () => {
    setTaskConfig(null);
  };
  const handleUpdate = (
    updateTask: (
      taskName: TaskName,
      estimatedWorkload: Minute,
      deadline: Deadline,
      notes: Notes,
      shortcutFlg: ShortcutFlg
    ) => void
  ) => {
    updateTask(
      updateTaskProps.name,
      updateTaskProps.estimatedWorkload,
      updateTaskProps.deadline,
      updateTaskProps.notes,
      updateTaskProps.shortcutFlg
    );
    handleConfigClose();
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
  const handleUpdateShortcutFlg = (e: ChangeEvent<HTMLInputElement>) => {
    setupdateTaskProps({
      ...updateTaskProps,
      shortcutFlg: e.target.checked,
    });
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
    handleConfigOpen,
    handleConfigClose,
    handleUpdate,
    handleUpdateName,
    handleUpdateEstimatedWorkload,
    handleUpdateDeadline,
    handleUpdateShortcutFlg,
    handleUpdateNotes,
  };
};

export const useTaskDeleteViewModel = (): TaskDeleteViewModel => {
  const [deleteTaskId, setDeleteTaskId] = useRecoilState(taskDeleteState);
  const handleDeleteScreenOpen = (taskId: TaskId) => {
    setDeleteTaskId(taskId);
  };
  const handleDeleteScreenClose = () => {
    setDeleteTaskId("");
  };
  const isDeleteModalOpen = deleteTaskId ? true : false;

  const handleDelete = (deleteTask: () => void) => {
    deleteTask();
    handleDeleteScreenClose();
  };

  return {
    deleteTaskId,
    handleDeleteScreenOpen,
    handleDeleteScreenClose,
    handleDelete,
    isDeleteModalOpen,
  };
};
