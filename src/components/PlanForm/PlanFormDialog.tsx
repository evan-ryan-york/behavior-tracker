import { Dialog, Box, Typography, DialogContent } from "@mui/material";
import { selectedStudentIdAtom, studentsObjAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import PlanForm from "./PlanForm";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function PlanFormDialog({ open, setOpen }: Props) {
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
          maxWidth="md"
          fullWidth={true}
          open={open}
          sx={{ margin: window.innerWidth * 0.004 }}
          PaperProps={{ sx: { height: "90vh" } }}
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
            <Typography variant="h5">
              New Behavior Plan For{" "}
              {studentObj
                ? `${studentObj[selectedStudentId].firstName} ${studentObj[selectedStudentId].lastName}`
                : "Student Not Found"}
            </Typography>
          </Box>
          <DialogContent sx={{ backgroundColor: "#f8f8f8" }}>
            <PlanForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
