import { useTaskConfigViewModel } from "domain/hooks/taskViewModel";
import TaskConfig from "./TaskConfig";

const TaskConfigModal = () => {
  const { taskConfig } = useTaskConfigViewModel();
  if (taskConfig.isModalOpen) {
    return <TaskConfig />;
  } else {
    return null;
  }
};

export default TaskConfigModal;
