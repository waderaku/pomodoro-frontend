import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
} from "@mui/material";
import {
  useTaskDeleteViewModel,
  useTaskViewModel,
} from "domain/hooks/taskViewModel";
import { TaskId } from "domain/model";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
};

const TaskDelete = (props: { taskId: TaskId }) => {
  const { isDeleteModalOpen, handleDeleteScreenClose, handleDelete } =
    useTaskDeleteViewModel();
  const { deleteTask } = useTaskViewModel(props.taskId);
  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={handleDeleteScreenClose}
      aria-labelledby="taskDelete"
      aria-describedby="taskDelete"
    >
      <Box m={1} sx={style}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={10}>
                <Box mt={1}>削除したタスクは元に戻すことは出来ません。</Box>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={10}>
                <Box mt={1}>対象タスクの子タスクも含めて全て削除します。</Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Button size="small" onClick={handleDeleteScreenClose}>
                close
              </Button>
              <Button
                size="small"
                onClick={() => {
                  handleDelete(deleteTask);
                }}
              >
                delete
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default TaskDelete;
