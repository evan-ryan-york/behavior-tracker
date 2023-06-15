import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { timestampToDisplay } from "../../libraries/functions";
import { BehaviorPlanRecord } from "../../types/types";
import { selectedStudentAtom, studentsResetAtom } from "../../recoil/studentAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MouseEvent, useEffect, useState } from "react";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  behaviorPlan: BehaviorPlanRecord;
  setSelectedBehaviorPlan: (pV: BehaviorPlanRecord) => void;
};

function BehaviorPlanCard({ behaviorPlan, setSelectedBehaviorPlan }: Props) {
  const [selected, setSelected] = useState(false);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const setStudentsReset = useSetRecoilState(studentsResetAtom);

  useEffect(() => {
    if (!selectedStudent) return;
    selectedStudent.activeBehaviorPlan === behaviorPlan.id ? setSelected(true) : setSelected(false);
  }, [selectedStudent, behaviorPlan]);

  const handleOpenBehaviorPlan = () => {
    setSelectedBehaviorPlan(behaviorPlan);
  };

  const handleSetSelected = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!selectedStudent) return;
    setSelected(true);
    updateDoc({
      col: "students",
      id: selectedStudent.id,
      data: { activeBehaviorPlan: behaviorPlan.id },
    });
    setStudentsReset((pV) => !pV);
  };
  return (
    <Paper
      sx={{
        padding: 1,
        mt: 2,
        mb: 1,
        ":hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ cursor: "pointer" }} onClick={handleOpenBehaviorPlan}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h4">Behavior Plan</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {behaviorPlan.createdAt && (
              <Typography variant="body2">{`Created On ${timestampToDisplay(
                behaviorPlan.createdAt
              )}`}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: "right" }}>
            {selected ? (
              <Chip label="Active" color="secondary" />
            ) : (
              <Button variant="outlined" color="secondary" onClick={handleSetSelected}>
                Set as Active
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default BehaviorPlanCard;
