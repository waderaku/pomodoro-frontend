import { Task, TaskId, TaskView } from "../model";

const NOT_IMPLEMENTED_ERROR = new Error("Not Implemented");

export const useTask = (taskId: TaskId): Task => {
  throw NOT_IMPLEMENTED_ERROR;
};

// SideNaviやTaskManager用のTaskId[]からTaskView[]を返すHook
export const useTaskViewArray = (taskIdArray: TaskId[]): TaskView[] => {
  throw NOT_IMPLEMENTED_ERROR;
};

// 現在選択されているTaskManagerに表示するべきTaskのIdを返す
export const useSelectedTaskId = (): TaskId => {
  throw NOT_IMPLEMENTED_ERROR;
};
