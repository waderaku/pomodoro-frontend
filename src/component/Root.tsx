import { RecoilRoot } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";

const Root = () => {
  return (
    <RecoilRoot>
      <ToolNavi />
      <SideNavi />
      <TaskManager />
    </RecoilRoot>
  );
};

export default Root;
