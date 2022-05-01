import { List, ListItem } from "@mui/material";
import { TaskId } from "domain/model";
import ChildTaskCard from "./ChildTaskCard";

const ChildrenTaskList = (props: { childrenIdList: TaskId[] }) => {
  return (
    <List>
      {props.childrenIdList.map((taskId, key) => (
        <ListItem key={key}>
          <ChildTaskCard taskId={taskId} />
        </ListItem>
      ))}
    </List>
  );
};
export default ChildrenTaskList;
