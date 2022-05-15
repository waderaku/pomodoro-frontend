import { Grid, Typography, Paper, Box, Divider } from "@mui/material";
import { FC } from "react";

const IconTextCard = (props: { Icon: FC; title: string; text: string }) => {
  const Icon = props.Icon;
  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Icon />
        </Grid>
        <Grid item>
          <Box sx={{ pl: 1, pt: 1, pb: 1 }}>
            <span style={{ fontSize: "8px", color: "#9e9e9e" }}>
              {props.title}
            </span>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columns={12}
      >
        <Grid item>
          <Box sx={{ p: 1 }}>
            <Typography variant={"h5"} align="center">
              {props.text}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IconTextCard;
