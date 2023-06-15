import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid-pro";
import React from "react";

function InstructionsAccordion() {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant="h4">Instructions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Each observation must happen during an observation session. The observation session helps
          people understand how frequently a behavior is happening. For example, a child who has 3
          observations of eloping over the course of a 7 hour school day is very different than a
          child who has 3 observations of eloping during a 45 minute math lesson.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="h5">
          To Create an Observation Session
        </Typography>
        <Typography>
          To create an observation session, you can either click{" "}
          {
            <Button color="secondary" variant="contained">
              New Observation Session
            </Button>
          }{" "}
          in the lower right corner, or you can start a timed session using the{" "}
          {
            <Button color="secondary" variant="contained">
              Start Timed Observation Session
            </Button>
          }{" "}
          button below.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="h5">
          To Create an Observation
        </Typography>
        <Typography>
          To add a new observation to an observation session, expand the observation session you wish
          to add an observation to and then select{" "}
          {
            <Button color="primary" variant="contained">
              New Observation
            </Button>
          }
          .
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default InstructionsAccordion;
