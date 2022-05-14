import { useTaskConfigViewModel } from "domain/hooks/taskViewModel";
import TaskConfig from "./TaskConfig";

const TaskConfigModal = () => {
  const { taskConfig } = useTaskConfigViewModel();
  if (taskConfig) {
    return <TaskConfig taskId={taskConfig} />;
  } else {
    return null;
  }
};

export default TaskConfigModal;
