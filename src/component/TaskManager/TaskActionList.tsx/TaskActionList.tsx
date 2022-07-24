import { DeleteForever } from "@mui/icons-material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, IconButton } from "@mui/material";
import { ROOT_TASK_ID } from "commonConstants";
import {
  useTaskConfigViewModel,
  useTaskDeleteViewModel,
} from "domain/hooks/taskViewModel";
import { useTimerViewModel } from "domain/hooks/timerViewModels";
import { TaskId } from "domain/model";
type sizeType = "medium" | "large";
type colorType = "primary" | "secondary";

/**
 * タスクができるアクションのコンポーネント
 * タイマーの再生、タスクの削除、変更、完了ができる
 * 完了済みのタスクは完了ボタンを表示しない
 * rootタスクは任意のボタンが存在しない
 *
 * @param taskId: 対象タスクのID
 * @param done: 対象タスクが完了か否か
 * @param finishTask: 対象タスク完了関数（将来的にはuse~ViewModelから取得するように変更されると推測）
 * @param iconColor: 画面に表示する各アイコンの色を指定
 * @param iconSize: 画面に表示する各アイコンの大きさを指定
 */
const TaskActionList = (props: {
  taskId: TaskId;
  done: boolean;
  finishTask: () => void;
  iconColor: colorType;
  iconSize: sizeType;
}) => {
  const { startTask } = useTimerViewModel();
  const { handleConfigOpen } = useTaskConfigViewModel();
  const { handleDeleteScreenOpen } = useTaskDeleteViewModel();
  if (props.taskId === ROOT_TASK_ID) return null;
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        <IconButton
          color={props.iconColor}
          onClick={() => startTask(props.taskId)}
        >
          <PlayCircleIcon fontSize={props.iconSize} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton
          color={props.iconColor}
          onClick={() => handleDeleteScreenOpen(props.taskId)}
        >
          <DeleteForever fontSize={props.iconSize} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        <IconButton
          color={props.iconColor}
          onClick={() => handleConfigOpen(props.taskId)}
        >
          <SettingsIcon fontSize={props.iconSize} />
        </IconButton>
      </Grid>
      <Grid item xs={3}>
        {/* タスク完了ボタン */}
        {!props.done ? (
          <IconButton
            color={props.iconColor}
            onClick={() => props.finishTask()}
          >
            <DoneOutlineIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TaskActionList;
