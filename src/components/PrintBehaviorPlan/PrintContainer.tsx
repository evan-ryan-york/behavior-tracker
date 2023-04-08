import { useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PrintTable from "./PrintTable";
import { BehaviorPlanRecord } from "../../types/types";

type Props = {
  behaviorPlan: BehaviorPlanRecord;
};

function PrintContainer({ behaviorPlan }: Props) {
  const componentRef = useRef(null);

  const loading = Boolean(behaviorPlan);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 3 }}>
        <Box>
          <Typography variant="h2">Print Behavior Plan</Typography>
        </Box>
        <Button onClick={handlePrint} variant="contained" sx={{ mb: 2 }}>
          Print
        </Button>
      </Box>
      {!loading && (
        <Box
          ref={componentRef}
          sx={{ width: "8.5in", margin: "0px auto", backgroundColor: "#ffffff", padding: 4 }}
        >
          <PrintTable behaviorPlan={behaviorPlan} />
        </Box>
      )}
    </>
  );
}

export default PrintContainer;
