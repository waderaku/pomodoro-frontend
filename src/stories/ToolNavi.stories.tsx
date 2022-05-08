import { ComponentMeta, ComponentStory } from "@storybook/react";
import ToolNavi from "component/ToolNavi";

export default {
  title: "TaskManager/ToolNavi",
  component: ToolNavi,
} as ComponentMeta<typeof ToolNavi>;

export const toolNavi: ComponentStory<typeof ToolNavi> = () => <ToolNavi />;
