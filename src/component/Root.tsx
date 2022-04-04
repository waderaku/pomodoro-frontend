import { RecoilRoot } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";
import { useSelectedTaskId } from "domain/hooks/task";

const Root = () => {
  const taskId = useSelectedTaskId();
  return (
    <RecoilRoot>
      <ToolNavi />
      <SideNavi />
      <TaskManager taskId={taskId} />
    </RecoilRoot>
  );
};

export default Root;
