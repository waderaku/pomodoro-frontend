import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import TaskConfig from "../component/TaskManager/TaskConfig/TaskConfig";
import { TaskId } from "domain/model";
import { RecoilRoot } from "recoil";

const RecoilTaskConfig = (props: { taskId: TaskId }) => {
  return (
    // Recoilの値はココで与える
    <RecoilRoot>
      <TaskConfig taskId={props.taskId} />
    </RecoilRoot>
  );
};

export default {
  title: "TaskManager/TaskConfig",
  component: RecoilTaskConfig,
} as ComponentMeta<typeof TaskConfig>;

export const Index: ComponentStoryObj<typeof RecoilTaskConfig> = {
  args: {
    taskId: "task2",
  },
};
