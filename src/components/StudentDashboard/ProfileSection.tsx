import { Box, Button, Paper, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { selectedStudentAtom, studentFormAtom } from "../../recoil/studentAtoms";
import ManageStudent from "../Settings/ManageStudent";
import { useState } from "react";
import StudentCardProfile from "../Settings/StudentCardProfile";

function ProfileSection() {
  const organization = useRecoilValue(organizationAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const setStudentForm = useSetRecoilState(studentFormAtom);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClick = () => {
    if (!selectedStudent) return;
    setStudentForm(selectedStudent);
    setEditOpen(true);
  };

  return (
    <>
      {organization && selectedStudent && (
        <Paper sx={{ height: "95%" }}>
          <Box
            sx={{
              padding: 1,
              backgroundColor: organization.primaryColor,
              color: organization.primaryTextColor,
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Student Profile</Typography>
          </Box>
          <Box sx={{ padding: 2, height: 350, overflow: "scroll", textAlign: "center" }}>
            <StudentCardProfile student={selectedStudent} />
            <Button sx={{ mt: 2 }} variant="outlined" fullWidth onClick={handleEditClick}>
              Edit
            </Button>
          </Box>
        </Paper>
      )}
      <ManageStudent open={editOpen} setOpen={setEditOpen} />
    </>
  );
}

export default ProfileSection;
