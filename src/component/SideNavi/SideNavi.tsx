import { Box, Divider, List } from "@mui/material";
import { useShortcutTaskArray } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import RootTaskCard from "./RootTaskCard";
import { ROOT_TASK_ID } from "commonConstants";

const SideNavi = () => {
  const shortcutTaskArray = useShortcutTaskArray();
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <List>
        <RootTaskCard taskId={ROOT_TASK_ID} />
        <Divider
          sx={{
            fontSize: "8px",
            color: "#9e9e9e",
            marginTop: ".25rem",
            marginBottom: ".5rem",
          }}
        >
          shortcut Tasks
        </Divider>
        {shortcutTaskArray.map((taskId: TaskId, key: number) => {
          return <RootTaskCard taskId={taskId} key={key} />;
        })}
      </List>
    </Box>
  );
};
export default SideNavi;
