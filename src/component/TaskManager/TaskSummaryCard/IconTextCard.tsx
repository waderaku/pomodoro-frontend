import { Grid, Typography, Paper } from "@mui/material";
import { FC } from "react";

const IconTextCard = (props: { Icon: FC; text: string }) => {
  const Icon = props.Icon;
  return (
    <Paper>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={1}>
          <Icon />
        </Grid>
        <Grid item xs={11}>
          <Typography align="center">{props.text}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IconTextCard;
