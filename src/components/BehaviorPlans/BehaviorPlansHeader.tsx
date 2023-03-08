import { Typography, Box, Button } from "@mui/material";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import StudentSelect from "../shared/StudentSelect";

type Props = {
  setNewPlanOpen: (value: boolean) => void;
};

function BehaviorPlansHeader({ setNewPlanOpen }: Props) {
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);

  const handleNewBehaviorPlanOpen = () => {
    setNewPlanOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="h2">Behavior Plans</Typography>
        <StudentSelect />
        <Button
          disabled={!Boolean(selectedStudentId)}
          variant="contained"
          sx={{ padding: 2 }}
          onClick={handleNewBehaviorPlanOpen}
        >
          New Behavior Plan
        </Button>
      </Box>
    </>
  );
}

export default BehaviorPlansHeader;
