import { Grid } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MiniTimer from "component/TaskManager/ChildrenTaskList/Timer/MiniTimer";
import { Second } from "domain/model";
import { RecoilRoot } from "recoil";

export default {
  title: "TaskManager/MiniTimer",
  component: MiniTimer,
} as ComponentMeta<typeof MiniTimer>;

const RecoilMiniTimer = (props: {
  expiryTime: Second;
  isTask: boolean;
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

const Template: ComponentStory<typeof MiniTimer> = (args: {
  expiryTime: Second;
  isTask: boolean;
  openWindow: (time: Second) => void;
}) => (
  <RecoilRoot>
    <RecoilMiniTimer {...args} />
  </RecoilRoot>
);

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
