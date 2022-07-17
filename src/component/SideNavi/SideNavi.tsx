import { Box, List } from "@mui/material";
import { useShortcutTaskArray } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import RootTaskCard from "./RootTaskCard";

const SideNavi = () => {
  const shortcutTaskArray = useShortcutTaskArray();
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <List>
        {shortcutTaskArray.map((taskId: TaskId, key: number) => {
          return <RootTaskCard taskId={taskId} key={key} />;
        })}
      </List>
    </Box>
  );
};
export default SideNavi;
