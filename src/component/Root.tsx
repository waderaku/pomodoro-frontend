import { useSetRecoilState } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";
import { userIdState, useSelectedTaskId } from "domain/hooks/task";
import { useEffect } from "react";

const Root = () => {
  const taskId = useSelectedTaskId();
  const testUserId = "testUser";
  const setUserId = useSetRecoilState(userIdState);
  useEffect(() => setUserId(testUserId), []);
  return (
    <div>
      <ToolNavi />
      <SideNavi />
      <TaskManager taskId={taskId} />
    </div>
  );
};

export default Root;
