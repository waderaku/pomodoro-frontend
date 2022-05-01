import { useSetRecoilState } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";
import {
  useIsTaskLoaded,
  userIdState,
  useSelectedTaskId,
} from "domain/hooks/taskViewModel";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const Root = () => {
  const taskId = useSelectedTaskId();
  const testUserId = "testUser";
  const setUserId = useSetRecoilState(userIdState);
  useEffect(() => setUserId(testUserId), []);
  const loaded = useIsTaskLoaded();
  if (loaded) {
    return (
      <div>
        <ToolNavi />
        <SideNavi />
        <TaskManager taskId={taskId} />
      </div>
    );
  } else {
    return <Typography>NotLoaded</Typography>;
  }
};

export default Root;
