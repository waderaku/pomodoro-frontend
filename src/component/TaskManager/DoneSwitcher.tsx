import { Button } from "@mui/material";
import { useSetShowDone, useShowDone } from "domain/hooks/showDone";

const DoneSwitcher = () => {
  const showDone = useShowDone();
  const setShowDone = useSetShowDone();
  const switchShowDone = () => setShowDone(!showDone);
  const message = showDone ? "Hide Completed Task" : "Show Completed Task";
  return (
    <Button variant="outlined" onClick={switchShowDone}>
      {message}
    </Button>
  );
};

export default DoneSwitcher;
