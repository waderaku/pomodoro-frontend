export const myInputStyle = {
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
};

export const mySelectInputStyle = {
  "& .MuiAutocomplete-inputRoot": {
    paddingLeft: "0!important",
    paddingRight: "0!important",
  },
  "& .MuiAutocomplete-clearIndicator": {
    display: "none",
  },
  "& .MuiAutocomplete-input": {
    display: "none",
  },
  ...myInputStyle,
};
export const myDatePickerStyle = {
  "& .MuiOutlinedInput-input": {
    width: 0,
    padding: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    display: "none",
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
};
