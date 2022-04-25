import { ComponentStory, ComponentMeta } from "@storybook/react";
import TaskConfig from "../component/TaskManager/TaskConfig/TaskConfig";
import {
  Deadline,
  Minute,
  Notes,
  TaskId,
  TaskName,
  TaskViewModel,
} from "domain/model";
import { RecoilRoot } from "recoil";
import dayjs from "dayjs";

export default {
  title: "TaskManager/TaskConfig",
  component: TaskConfig,
} as ComponentMeta<typeof TaskConfig>;

const RecoilTaskConfig = (props: {
  taskId: TaskId;
  closeModal: () => void;
  taskViewModel: TaskViewModel;
}) => {
  return (
    // Recoilの値はココで与える
    <TaskConfig
      taskId={props.taskId}
      closeModal={props.closeModal}
      taskViewModel={props.taskViewModel}
    />
  );
};

const Template: ComponentStory<typeof TaskConfig> = (args: {
  taskId: TaskId;
  closeModal: () => void;
  taskViewModel: TaskViewModel;
}) => (
  <RecoilRoot>
    <RecoilTaskConfig {...args} />
  </RecoilRoot>
);

const taskViewModel: TaskViewModel = {
  task: {
    id: "1",
    name: "テストタスク",
    childrenIdList: ["2", "3", "4"],
    done: false,
    finishedWorkload: 2,
    estimatedWorkload: 2,
    deadline: dayjs(new Date()),
    notes:
      "テストテストテスト \r\nテストテストテスト \r\nテストテストテスト \r\n",
  },
  createTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline
  ) => {},
  finishTask: () => {},
  updateTask: (
    taskName: TaskName,
    estimatedWorkload: Minute,
    deadline: Deadline,
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
  taskViewModel: taskViewModel,
};
