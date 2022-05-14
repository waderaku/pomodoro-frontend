import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SideNavi from "component/SideNavi/SideNavi";
import { useIsTaskLoaded, userIdState } from "domain/hooks/taskViewModel";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";

export default {
  title: "SideNavi/SideNavi",
  component: SideNavi,
} as ComponentMeta<typeof SideNavi>;

const RecoilSideNavi = () => {
  const testUserId = "testUser";
  const setUserId = useSetRecoilState(userIdState);
  useEffect(() => {
    setUserId(testUserId);
  }, []);
  const loaded = useIsTaskLoaded();
  if (loaded) {
    return <SideNavi />;
  } else {
    return <Typography>Not Loaded</Typography>;
  }
};

const Template: ComponentStory<typeof RecoilSideNavi> = () => {
  return (
    <RecoilRoot>
      <RecoilSideNavi />
    </RecoilRoot>
  );
};

export const sample = Template.bind({});
