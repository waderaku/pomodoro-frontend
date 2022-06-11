import { Box, List } from "@mui/material";
import { useRootTaskArray } from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import RootTaskCard from "./RootTaskCard";

const SideNavi = () => {
  const rootTaskArray = useRootTaskArray();
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <List>
        {rootTaskArray.map((taskId: TaskId, key: number) => {
          return <RootTaskCard taskId={taskId} key={key} />;
        })}
      </List>
    </Box>
  );
};
export default SideNavi;
