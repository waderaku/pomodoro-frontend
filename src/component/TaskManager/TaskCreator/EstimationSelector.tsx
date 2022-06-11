import {
  Grid,
  Autocomplete,
  TextField,
  Typography,
  styled,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useState } from "react";
import { mySelectInputStyle } from "styles/inputStyles";

let options: Array<number | null> = Array.from(Array(100).keys());
options.push(null);

const MySelectField = styled(TextField)(mySelectInputStyle);

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
        <Grid item>
          <Box sx={{ pr: 1 }}>
            <AccessTimeIcon color="primary" fontSize="large" />
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ pl: 1 }}>
            <Typography variant="h4">{props.numClock}</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={11}>
        {numClockDisplay}
      </Grid>
      <Grid item xs={1}>
        <Autocomplete
          value={props.numClock}
          getOptionLabel={(option) => (option ? option.toString() : "")}
          onChange={(_: any, newValue: number | null) => {
            if (newValue) {
              props.setNumClock(newValue as number);
            }
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <MySelectField {...params} />}
          options={options}
        />
      </Grid>
    </Grid>
  );
};
export default EstimationSelector;
