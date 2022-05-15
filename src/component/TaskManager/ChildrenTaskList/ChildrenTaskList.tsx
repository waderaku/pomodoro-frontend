import { List, ListItem } from "@mui/material";
import { TaskId } from "domain/model";
import ChildTaskCard from "./ChildTaskCard";

const ChildrenTaskList = (props: { childrenIdList: TaskId[] }) => {
  return (
    <List style={{ paddingTop: "0" }}>
      {props.childrenIdList.map((taskId, key) => (
        <ListItem key={key} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <ChildTaskCard taskId={taskId} />
        </ListItem>
      ))}
    </List>
  );
};
export default ChildrenTaskList;
