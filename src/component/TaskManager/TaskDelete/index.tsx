import { useTaskDeleteViewModel } from "domain/hooks/taskViewModel";
import TaskDelete from "./TaskDelete";

const TaskDeleteModal = () => {
  const { deleteTaskId } = useTaskDeleteViewModel();
  if (deleteTaskId) {
    return <TaskDelete taskId={deleteTaskId} />;
  } else {
    return null;
  }
};

export default TaskDeleteModal;
