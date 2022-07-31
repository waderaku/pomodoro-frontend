import {
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { useUserViewModel } from "domain/hooks/userViewModel";
/**
 * 導線としてはRootでログインされてるか(userIdを持ってるか)で
 * SignInFeildを表示するか、通常画面を表示するかが変わる想定
 * さらに、このSignUpFeildはSignInFeildから遷移される想定
 */
const SignUpFeild = () => {
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
                  <TextField
                    fullWidth
                    id="userId"
                    label="User Id"
                    onChange={(e) => handleUpdateUserId(e)}
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
                    onChange={(e) => handleUpdatePassword(e)}
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
                return
              </Button>
              <Button size="small" onClick={createUser}>
                register
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default SignUpFeild;
