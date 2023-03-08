import { Dialog, Box, Typography, DialogContent } from "@mui/material";
import ObservationForm from "./ObservationForm";
import { selectedStudentIdAtom, studentsObjAtom } from "../../recoil/studentAtoms";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ObservationFormDialog({ open, setOpen }: Props) {
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
          maxWidth="xl"
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
              New Observation For{" "}
              {studentObj
                ? `${studentObj[selectedStudentId].firstName} ${studentObj[selectedStudentId].lastName}`
                : "Student Not Found"}
            </Typography>
          </Box>
          <DialogContent sx={{ backgroundColor: "#f8f8f8" }}>
            <ObservationForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
