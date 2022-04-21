import { ComponentStory, ComponentMeta } from "@storybook/react";
import TaskConfig from "../component/TaskManager/TaskConfig/TaskConfig";
import { Minute, Notes, Task, TaskId, TaskName } from "domain/model";
import { RecoilRoot } from "recoil";
import dayjs, { Dayjs } from "dayjs";

export default {
  title: "TaskManager/TaskConfig",
  component: TaskConfig,
} as ComponentMeta<typeof TaskConfig>;

const RecoilTaskConfig = (props: {
  taskId: TaskId;
  closeModal: () => void;
  tasks: Task;
}) => {
  return (
    // Recoilの値はココで与える
    <TaskConfig
      taskId={props.taskId}
      closeModal={props.closeModal}
      tasks={props.tasks}
    />
  );
};

const Template: ComponentStory<typeof TaskConfig> = (args) => (
  <RecoilRoot>
    <RecoilTaskConfig {...args} />
  </RecoilRoot>
);

const tasks: Task = {
  id: "1",
  name: "テストタスク",
  childrenIdList: ["2", "3", "4"],
  finishedWorkload: 2,
  estimatedWorkload: 2,
  deadline: dayjs(new Date()),
  notes:
    "テストテストテスト \r\nテストテストテスト \r\nテストテストテスト \r\n",
  createTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs
  ) => {},
  finishTask: (finishedWorkload: Minute) => {},
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Dayjs,
    notes: Notes
  ) => {
    console.log({
      taskName: taskName,
      estimatedWorkload: estimatedWorkload,
      deadline: deadline,
      notes: notes,
    });
  },
};

export const Default = Template.bind({});
Default.args = {
  taskId: "1",
  closeModal: () => {},
  tasks: tasks,
};
