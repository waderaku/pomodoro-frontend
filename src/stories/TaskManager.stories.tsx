import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import TaskManager from "component/TaskManager";
import {
  selectedTaskIdState,
  useIsTaskLoaded,
  userIdState,
} from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";

export default {
  title: "TaskManager/TaskManager",
  component: TaskManager,
} as ComponentMeta<typeof TaskManager>;

const RecoilTaskManager = (props: { taskId: TaskId }) => {
  const testUserId = "testUser";
  const setUserId = useSetRecoilState(userIdState);
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdState);
  useEffect(() => {
    setUserId(testUserId);
    setSelectedTaskId(props.taskId);
  }, []);
  const loaded = useIsTaskLoaded();
  if (loaded) {
    return <TaskManager />;
  } else {
    return <Typography>Not Loaded</Typography>;
  }
};

const Template: ComponentStory<typeof RecoilTaskManager> = (props: {
  taskId: TaskId;
}) => {
  return (
    <RecoilRoot>
      <RecoilTaskManager taskId={props.taskId} />
    </RecoilRoot>
  );
};
export const task1 = Template.bind({});
task1.args = { taskId: "task1" };

export const task2 = Template.bind({});
task2.args = { taskId: "task2" };
