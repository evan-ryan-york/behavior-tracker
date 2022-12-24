import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type FIREBASE_ID = string;

type Props = {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  message: string;
  collection: string;
  id: FIREBASE_ID;
  setReset: (pV: any) => void;
};

export default function DeleteDialog({ open, setOpen, message, collection, id, setReset }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await updateDoc({ col: collection, data: { active: false }, id: id });
    setOpen(false);
    setReset((pV: boolean) => !pV);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
