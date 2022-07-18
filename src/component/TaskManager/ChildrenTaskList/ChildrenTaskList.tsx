import { List, ListItem } from "@mui/material";
import { useDoneList, useShowDone } from "domain/hooks/showDone";
import { TaskId } from "domain/model";
import ChildTaskCard from "./ChildTaskCard";

const ChildrenTaskList = (props: { childrenIdList: TaskId[] }) => {
  const doneList = useDoneList(props.childrenIdList);
  const showDone = useShowDone();
  return (
    <List sx={{ paddingTop: "0" }}>
      {/* 未完了タスクを表示 */}
      {props.childrenIdList.map((taskId, key) => {
        const done = doneList[key];
        if (!done) {
          return (
            <ListItem key={key} sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <ChildTaskCard taskId={taskId} done={done} />
            </ListItem>
          );
        }
        return null;
      })}
      {/* もしshowDoneフラグが立っていれば未完了タスクを表示 */}
      {props.childrenIdList.map((taskId, key) => {
        const done = doneList[key];
        if (showDone && done) {
          return (
            <ListItem key={key} sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <ChildTaskCard taskId={taskId} done={done} />
            </ListItem>
          );
        }
        return null;
      })}
    </List>
  );
};
export default ChildrenTaskList;
