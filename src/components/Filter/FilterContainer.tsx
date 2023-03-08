import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRange from "./DateRange";

function FilterContainer() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DateRange />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FilterContainer;
