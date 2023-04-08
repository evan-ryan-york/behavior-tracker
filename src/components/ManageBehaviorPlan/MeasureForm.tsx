import { Button, Typography } from "@mui/material";
import React from "react";

type Props = {
  handleSubmit: () => void;
};

function MeasureForm({ handleSubmit }: Props) {
  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Lastly, Define How You'll Measure If Your Plan Is Working
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ padding: 2, mb: 1, mt: 2 }}
        onClick={handleSubmit}
      >
        Create Behavior Plan
      </Button>
    </>
  );
}

export default MeasureForm;
