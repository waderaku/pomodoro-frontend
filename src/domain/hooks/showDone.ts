import { TaskId } from "domain/model";
import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { taskState } from "./taskViewModel";

const doneListState = selectorFamily<boolean[], TaskId[]>({
  key: "doneList",
  get:
    (taskIdList) =>
    ({ get }) => {
      return taskIdList.map((taskId) => get(taskState(taskId)).done);
    },
});

const showDoneState = atom<boolean>({
  key: "showDone",
  default: false,
});

export const useSetShowDone = () => {
  return useSetRecoilState(showDoneState);
};

export const useShowDone = () => {
  return useRecoilValue(showDoneState);
};

// TaskIdのリストからそれらのdoneフラグのリストをリターン
export const useDoneList = (taskIdList: TaskId[]) => {
  return useRecoilValue(doneListState(taskIdList));
};
