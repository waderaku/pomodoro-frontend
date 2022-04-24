import { ComponentStory, ComponentMeta } from "@storybook/react";
import FullwindowTimer from "component/TaskManager/ChildrenTaskList/Timer/FullWindowTimer";
import dayjs, { Dayjs } from "dayjs";
import { Minute, Notes, Second, Task, TaskName } from "domain/model";
import { RecoilRoot } from "recoil";

export default {
  title: "TaskManager/FullWindowTimer",
  component: FullwindowTimer,
} as ComponentMeta<typeof FullwindowTimer>;

const RecoilFullwindowTimer = (props: {
  expiryTime: Second;
  isTask: Boolean;
  tasks: Task;
  closeWindow: (time: Second) => void;
}) => {
  return (
    // Recoilの値はココで与える
    <FullwindowTimer
      expiryTime={props.expiryTime}
      isTask={props.isTask}
      tasks={props.tasks}
      closeWindow={props.closeWindow}
    />
  );
};

const Template: ComponentStory<typeof FullwindowTimer> = (args) => (
  <RecoilRoot>
    <RecoilFullwindowTimer {...args} />
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
export const taskTime = Template.bind({});
taskTime.args = {
  expiryTime: 25 * 60,
  isTask: true,
  tasks: tasks,
};
export const breakTime = Template.bind({});
breakTime.args = {
  expiryTime: 5 * 60,
  isTask: false,
  tasks: tasks,
};
