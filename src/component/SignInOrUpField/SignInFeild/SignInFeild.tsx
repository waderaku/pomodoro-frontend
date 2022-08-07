import {
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useUserViewModel } from "domain/hooks/userViewModel";
import { ChangeEvent } from "react";

const SignInFeild = () => {
  const { userData, handleUpdateUserId, handleUpdatePassword, createUser } =
    useUserViewModel();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={10}>
                <Box mt={1}>
                  <Typography variant="h4" align="center">
                    新規ユーザー登録
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    id="userId"
                    label="User Id"
                    onChange={(
                      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => handleUpdateUserId(e)}
                    defaultValue={userData.userId}
                    variant="standard"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={10}>
                <Box mt={1}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(
                      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => handleUpdatePassword(e)}
                    defaultValue={userData.userId}
                    variant="standard"
                  />
                </Box>
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
              <Button
                size="small"
                onClick={() => {
                  //signInButtonでき次第戻る
                }}
              >
                To SignUp Menu
              </Button>
              <Button size="small" onClick={createUser}>
                log in
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default SignInFeild;
