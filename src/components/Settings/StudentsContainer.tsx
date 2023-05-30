import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";

import { studentsAtom, studentsResetAtom } from "../../recoil/studentAtoms";
import ManageStudent from "./ManageStudent";
import StudentCard from "./StudentCard";

function StudentsContainer() {
  const students = useRecoilValue(studentsAtom);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setStudentsReset = useSetRecoilState(studentsResetAtom);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  return (
    <>
      <Box sx={{ mt: 2, ml: 4, mr: 4 }}>
        <Button
          onClick={handleManageClick}
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ padding: 1, fontSize: 16 }}
        >
          Add New Student
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {students &&
          students.map((student) => (
            <StudentCard
              key={student.id}
              setManageOpen={setManageOpen}
              setDeleteOpen={setDeleteOpen}
              setDeleteId={setDeleteId}
              student={student}
            />
          ))}
      </Grid>
      <ManageStudent open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this Student? This cannot be undone."}
          collection="students"
          id={deleteId}
          setReset={setStudentsReset}
        />
      )}
    </>
  );
}

export default StudentsContainer;
