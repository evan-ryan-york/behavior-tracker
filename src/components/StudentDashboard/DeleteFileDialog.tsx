import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useSetRecoilState } from "recoil";
import { studentFilesResetAtom } from "../../recoil/studentAtoms";
import { StudentFileRecord } from "../../types/types";

type Props = {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  selectedStudentFile: StudentFileRecord | null;
};

export default function DeleteFileDialog({ open, setOpen, selectedStudentFile }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const setStudentFilesReset = useSetRecoilState(studentFilesResetAtom);
  const storage = getStorage();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedStudentFile) return;
    await updateDoc({ col: "studentFiles", data: { active: false }, id: selectedStudentFile.id });
    const fileRef = ref(storage, selectedStudentFile.filePath);
    deleteObject(fileRef);
    setOpen(false);
    setStudentFilesReset((pV) => !pV);
  };

  return (
    <>
      {selectedStudentFile && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this file? This action cannot be undone?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
