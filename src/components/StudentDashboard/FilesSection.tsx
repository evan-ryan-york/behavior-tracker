import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useUploadFile from "../../hooks/useUploadFile";
import { studentFilesAtom, studentFilesResetAtom } from "../../recoil/studentAtoms";
import FileCard from "./FileCard";
import { StudentFileRecord } from "../../types/types";
import DeleteFileDialog from "./DeleteFileDialog";
import EditFileNameDialog from "./EditFileNameDialog";

function FilesSection() {
  const organization = useRecoilValue(organizationAtom);
  const studentFiles = useRecoilValue(studentFilesAtom);
  const setStudentFilesReset = useSetRecoilState(studentFilesResetAtom);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [selectedStudentFile, setSelectedStudentFile] = useState<StudentFileRecord | null>(null);
  const { uploadFile } = useUploadFile();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      await uploadFile({
        file: file,
        col: "studentFiles",
      });
      setStudentFilesReset((pV) => !pV);
    }
  };

  return (
    <>
      {organization && (
        <Paper>
          <Box
            sx={{
              padding: 1,
              backgroundColor: organization.primaryColor,
              color: organization.primaryTextColor,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Files</Typography>
            <Button variant="contained" color="secondary" component="label">
              Upload
              <input hidden accept="file/*" multiple type="file" onChange={handleFileChange} />
            </Button>
          </Box>
          <Box sx={{ padding: 2, maxHeight: 800, overflow: "scroll" }}>
            <Grid container spacing={2}>
              {studentFiles &&
                studentFiles.map((studentFile) => (
                  <Grid key={studentFile.id} item xs={12} sm={6} md={4} lg={3}>
                    <FileCard
                      studentFile={studentFile}
                      setSelectedStudentFile={setSelectedStudentFile}
                      setDeleteOpen={setDeleteOpen}
                      setEditNameOpen={setEditNameOpen}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Paper>
      )}
      <DeleteFileDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedStudentFile={selectedStudentFile}
      />
      <EditFileNameDialog
        open={editNameOpen}
        setOpen={setEditNameOpen}
        selectedFile={selectedStudentFile}
      />
    </>
  );
}

export default FilesSection;
