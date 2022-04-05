import { useRecoilValue, useRecoilCallback } from "recoil";
import { Task, TaskId, TaskView } from "../model";

const NOT_IMPLEMENTED_ERROR = new Error("Not Implemented");

export const useTask = (taskId: TaskId): Task => {
  // const taskPropertys = useRecoilValue(/* recoil設計後 */);

  // TaskCreatorとサイドバーのプロジェクトの追加で使われるタスク追加
  // const createTask = useRecoilCallback(
  //   ({ set }) =>
  //     (taskName, estimatedWorkload) => {
  //       set(/* recoil設計後 */, {
  //         taskName: taskName,
  //         estimatedWorkload: estimatedWorkload,
  //       });
  //     }
  // );

  // TaskSummaryCardでfinishタスクが押下されたとき
  // const finishTask = useRecoilCallback(
  //   ({ set }) =>
  //     (finishedWorkload) => {
  //       set(/* recoil設計後　*/,{
  //         id: taskId,
  //         finishedWorkload: finishedWorkload,
  //       });
  //     }
  // );

  // 恐らくConfigモーダルでtaskの編集がなされた時
  // const updateTask = useRecoilCallback(
  //   ({ set }) =>
  //     (taskName, estimatedWorkload, deadline, notes) => {
  //       set(/* recoil設計後　*/, {
  //         id: taskId,
  //         taskName: taskName,
  //         deadline: deadline,
  //         notes: notes,
  //       });
  //     }
  // );

  // return ({...taskPropertys},createTask,finishTask)
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
