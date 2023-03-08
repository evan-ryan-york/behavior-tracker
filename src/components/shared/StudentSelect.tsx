import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { studentsAtom, selectedStudentIdAtom } from "../../recoil/studentAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { StudentRecord } from "../../types/types";

const StudentSelect = () => {
  const students = useRecoilValue(studentsAtom);
  const [selectedStudentId, setSelectedStudentId] = useRecoilState(selectedStudentIdAtom);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null | undefined>(null);

  useEffect(() => {
    if (!students || students.length < 1) return;
    if (!selectedStudentId) {
      setSelectedStudentId(students[0].id);
      setSelectedStudent(students[0]);
    } else {
      setSelectedStudent(students.find((student) => student.id === selectedStudentId));
    }
  }, [students, selectedStudentId, setSelectedStudentId]);

  const handleSelectedStudentChange = (
    event: React.SyntheticEvent,
    value: StudentRecord | null
  ) => {
    if (!value) return;
    setSelectedStudentId(value.id);
  };
  return (
    <>
      {students && (
        <Autocomplete
          options={students}
          sx={{ minWidth: 300 }}
          getOptionLabel={(student) => `${student.firstName} ${student.lastName}`}
          onChange={handleSelectedStudentChange}
          filterSelectedOptions
          value={selectedStudent}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Select Student"
              placeholder="Select Student"
            />
          )}
        />
      )}
    </>
  );
};

export default StudentSelect;
