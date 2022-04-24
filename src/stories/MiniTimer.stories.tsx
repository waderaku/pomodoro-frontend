import { Grid } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MiniTimer from "component/TaskManager/ChildrenTaskList/Timer/MiniTimer";
import dayjs, { Dayjs } from "dayjs";
import { Minute, Notes, Second, Task, TaskName } from "domain/model";
import { RecoilRoot } from "recoil";

export default {
  title: "TaskManager/MiniTimer",
  component: MiniTimer,
} as ComponentMeta<typeof MiniTimer>;

const RecoilMiniTimer = (props: {
  expiryTime: Second;
  isTask: Boolean;
  openWindow: (time: Second) => void;
}) => {
  return (
    // Recoilの値はココで与える
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      columns={{ xs: 10 }}
    >
      <Grid item xs={3}>
        <MiniTimer
          expiryTime={props.expiryTime}
          isTask={props.isTask}
          openWindow={props.openWindow}
        />
      </Grid>
    </Grid>
  );
};

const Template: ComponentStory<typeof MiniTimer> = (args) => (
  <RecoilRoot>
    <RecoilMiniTimer {...args} />
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
};
export const breakTime = Template.bind({});
breakTime.args = {
  expiryTime: 5 * 60,
  isTask: false,
};
