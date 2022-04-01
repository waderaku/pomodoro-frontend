import { List, ListItem, ListItemButton, Card } from "@mui/material";
import ChildTaskCard from "./ChildTaskCard";

const ChildrenTaskList = () => {
  return (
    <List>
      <ListItem>
        <ChildTaskCard />
      </ListItem>
      <ListItem>
        <ChildTaskCard />
      </ListItem>
      <ListItem>
        <ChildTaskCard />
      </ListItem>
      <ListItem>
        <ChildTaskCard />
      </ListItem>
    </List>
  );
};
export default ChildrenTaskList;
