import { Dialog, Box, Typography, Grid } from "@mui/material";
import { selectedStudentIdAtom, studentsObjAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import PlanForm from "./PlanForm";
import PlanFormSideMenu from "./PlanFormSideMenu";
import { BEHAVIOR_PLAN_STEPS } from "../../libraries/objects";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ManageBehaviorPlanDialog({ open, setOpen }: Props) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(BEHAVIOR_PLAN_STEPS.STEP_ONE);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const studentObj = useRecoilValue(studentsObjAtom);
  const organization = useRecoilValue(organizationAtom);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {selectedStudentId && open && organization && (
        <Dialog
          maxWidth="lg"
          fullWidth={true}
          open={open}
          sx={{ margin: window.innerWidth * 0.004 }}
          onClose={handleClose}
        >
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: organization.primaryColor,
              padding: 1,
              color: "white",
            }}
          >
            <Typography variant="h5" sx={{ padding: 1 }}>
              New Behavior Plan For{" "}
              {studentObj
                ? `${studentObj[selectedStudentId].firstName} ${studentObj[selectedStudentId].lastName}`
                : "Student Not Found"}
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4} sm={2}>
              <Box sx={{ height: "75VH", backgroundColor: "#eee" }}>
                <PlanFormSideMenu setSelectedMenuItem={setSelectedMenuItem} />
              </Box>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Box sx={{ pl: 4, pr: 4, pt: 4, height: "70vh", overflow: "scroll" }}>
                <PlanForm selectedMenuItem={selectedMenuItem} setOpen={setOpen} />
              </Box>
            </Grid>
          </Grid>
        </Dialog>
      )}
    </>
  );
}
