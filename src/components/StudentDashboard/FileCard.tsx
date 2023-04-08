import React, { useEffect, useState } from "react";
import { StudentFileRecord } from "../../types/types";
import EditIcon from "@mui/icons-material/Edit";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";

type Props = {
  studentFile: StudentFileRecord | null;
  setDeleteOpen: (pV: boolean) => void;
  setSelectedStudentFile: (pV: StudentFileRecord | null) => void;
  setEditNameOpen: (pV: boolean) => void;
};

const IMAGE_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

function FileCard({ studentFile, setDeleteOpen, setSelectedStudentFile, setEditNameOpen }: Props) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const storage = getStorage();

  useEffect(() => {
    if (!studentFile) return;
    const getImageURL = async () => {
      let url = await getDownloadURL(ref(storage, studentFile.filePath));
      setFileURL(url);
      if (IMAGE_FILE_TYPES.includes(studentFile.fileType)) {
        setPreviewURL(url + "_200x200");
      } else if (studentFile.fileType === "application/pdf") {
        setPreviewURL("/pdf.png");
      }
    };
    getImageURL();
  }, [storage, studentFile]);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    setSelectedStudentFile(studentFile);
  };

  const handleViewClick = () => {
    if (!fileURL) return;
    window.open(fileURL, "_blank");
  };

  const handleEditClick = () => {
    setEditNameOpen(true);
    setSelectedStudentFile(studentFile);
  };
  return (
    <>
      {studentFile && (
        <>
          <Box>
            <Paper sx={{ padding: 2, minHeight: 100 }}>
              {previewURL && (
                <Box sx={{textAlign: "center"}}>
                  <img style={{ maxWidth: "100%", maxHeight: 150 }} src={previewURL} alt={studentFile.fileName} />
                </Box>
              )}
              <Box sx={{ textAlign: "center" }}>
                <Typography component="span">{studentFile.fileName}</Typography>
                <IconButton size="small" onClick={handleEditClick} sx={{ mb: 1 }}>
                  <EditIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <Button color="primary" variant="contained" fullWidth onClick={handleViewClick}>
                    View
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Button onClick={handleDeleteOpen} color="error" variant="contained" fullWidth>
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button color="secondary" variant="contained" fullWidth>
                    Download
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}

export default FileCard;
