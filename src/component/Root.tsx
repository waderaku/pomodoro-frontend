import { useSetRecoilState } from "recoil";
import TaskManager from "./TaskManager";
import ToolNavi from "./ToolNavi";
import SideNavi from "./SideNavi";
import { selectedTaskIdState, userIdState } from "domain/hooks/taskViewModel";
import { useEffect, Suspense } from "react";
import { Grid, Toolbar, Typography } from "@mui/material";

const Root = () => {
  // テスト用
  const testUserId = "1";
  const setUserId = useSetRecoilState(userIdState);
  const defaultSelectedTaskId = "root";
  const setSelectedTaskId = useSetRecoilState(selectedTaskIdState);
  useEffect(() => {
    setUserId(testUserId);
    setSelectedTaskId(defaultSelectedTaskId);
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <ToolNavi />
      <Toolbar />
      <Grid container>
        <Grid item xs={2}>
          <SideNavi />
        </Grid>
        <Grid item xs={10}>
          <TaskManager />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Root;
