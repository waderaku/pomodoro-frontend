import { Drawer, List } from "@mui/material";
import { useRootTaskArray } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import RootTaskCard from "./RootTaskCard";

const drawerWidth = 240;
const SideNavi = () => {
  const rootTaskArray = useRootTaskArray();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {rootTaskArray.map((taskId: TaskId) => {
          return <RootTaskCard taskId={taskId} />;
        })}
      </List>
    </Drawer>
  );
};
export default SideNavi;
