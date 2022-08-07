import { ComponentMeta, ComponentStory } from "@storybook/react";
import SignUpField from "component/SignInOrUpField/SignUpFeild";
import { RecoilRoot } from "recoil";

export default {
  title: "SignField/SignUpField",
  component: SignUpField,
} as ComponentMeta<typeof SignUpField>;

const Template: ComponentStory<typeof SignUpField> = () => {
  return (
    <RecoilRoot>
      <SignUpField />
    </RecoilRoot>
  );
};

export const sample = Template.bind({});
