import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { studentFilesResetAtom } from "../../recoil/studentAtoms";
import { StudentFileRecord } from "../../types/types";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  selectedFile: StudentFileRecord | null;
  open: boolean;
  setOpen: (pV: boolean) => void;
};

function EditFileNameDialog({ selectedFile, open, setOpen }: Props) {
  const setStudentFilesReset = useSetRecoilState(studentFilesResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) return;
    setFileName(selectedFile.fileName);
  }, [selectedFile]);

  console.log(open);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!fileName || !selectedFile) return;

    await updateDoc({
      col: "studentFiles",
      data: { fileName: fileName },
      id: selectedFile.id,
    });
    setStudentFilesReset((pV) => !pV);
    handleClose();
  };
  return (
    <>
      {fileName && selectedFile && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Edit File Name</DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <TextField value={fileName} onChange={handleTextChange} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default EditFileNameDialog;
