import { Typography, Box, Button } from "@mui/material";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import StudentSelect from "../shared/StudentSelect";
import { observationPeriodIsActiveAtom } from "../../recoil/observationAtoms";

type Props = {
  setNewObservationOpen: (value: boolean) => void;
};

function StudentReportsHeader({ setNewObservationOpen }: Props) {
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const observationPeriodIsActive = useRecoilValue(observationPeriodIsActiveAtom);

  const disabled = !(Boolean(selectedStudentId) && observationPeriodIsActive);
  console.log(disabled)

  const handleNewObservationOpen = () => {
    setNewObservationOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="h2">Student Reports</Typography>
        <StudentSelect />
        <Button
          disabled={disabled}
          variant="contained"
          sx={{ padding: 2 }}
          onClick={handleNewObservationOpen}
        >
          New Observation
        </Button>
      </Box>
    </>
  );
}

export default StudentReportsHeader;
