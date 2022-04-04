import { Grid, Autocomplete, TextField, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";

let options: Array<number | null> = Array.from(Array(15).keys());
options.push(null);

const EstimationSelector = (props: {
  numClock: number;
  setNumClock: (numClock: number) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const numbers = Array.from(Array(5).keys());
  let numClockDisplay;
  if (props.numClock <= 5) {
    const icons = numbers.map((i) => {
      const color = i < props.numClock ? "primary" : "disabled";
      const onClick = () => props.setNumClock(i + 1);
      return (
        <Grid key={i} item xs={2}>
          <AccessTimeIcon color={color} onClick={onClick} />
        </Grid>
      );
    });
    numClockDisplay = (
      <Grid container alignItems="center" justifyContent="center">
        {icons}
      </Grid>
    );
  } else {
    numClockDisplay = (
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={2}>
          <AccessTimeIcon color="primary" fontSize="large" />
        </Grid>
        <Grid item xs={1}>
          <Typography variant="h4">{props.numClock}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={9}>
        {numClockDisplay}
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          value={props.numClock}
          getOptionLabel={(option) => (option ? option.toString() : "")}
          onChange={(_: any, newValue: number | null) => {
            if (newValue) {
              console.log(newValue);
              props.setNumClock(newValue as number);
            }
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Clock数" />}
          options={options}
        />
      </Grid>
    </Grid>
  );
};
export default EstimationSelector;
