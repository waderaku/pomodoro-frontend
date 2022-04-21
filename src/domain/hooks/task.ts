import { fetchTask } from "backend_api";
import { atom, selector } from "recoil";
import { TaskViewModel, TaskId, Task, UserId } from "../model";

const NOT_IMPLEMENTED_ERROR = new Error("Not Implemented");

export const useTaskViewModel = (taskId: TaskId): TaskViewModel => {
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

// 現在選択されているTaskManagerに表示するべきTaskのIdを返す
export const useSelectedTaskId = (): TaskId => {
  throw NOT_IMPLEMENTED_ERROR;
};

export const userIdState = atom<UserId | null>({
  key: "userId",
  default: null,
});

export const taskPoolState = selector<Map<TaskId, Task>>({
  key: "taskPool",
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) {
      throw Error("User is not yet logged in");
    }
    const taskPool = await fetchTask(userId);
    return taskPool;
  },
});
