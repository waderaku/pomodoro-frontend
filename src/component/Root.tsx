import { useSetRecoilState } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";
import {
  selectedTaskIdState,
  useIsTaskLoaded,
  userIdState,
} from "domain/hooks/taskViewModel";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const Root = () => {
  // テスト用
  const testUserId = "testUser";
  const setUserId = useSetRecoilState(userIdState);
  const defaultSelectedTaskId = "task1";
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdState);
  useEffect(() => {
    setUserId(testUserId);
    setSelectedTaskId(defaultSelectedTaskId);
  }, []);

  const loaded = useIsTaskLoaded();
  if (loaded) {
    return (
      <div>
        <ToolNavi />
        <SideNavi />
        <TaskManager />
      </div>
    );
  } else {
    return <Typography>NotLoaded</Typography>;
  }
};

export default Root;
