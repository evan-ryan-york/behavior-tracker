import React from "react";
import ReactQuill from "react-quill";
import { BehaviorPlan } from "../../types/types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type FormSetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setPlanForm: (pV: FormSetterFunction) => void;
  index: number;
  arrayOfOptions: ReactQuill.Value[];
  key: string;
};

function DeleteConfirmation({ open, setOpen, index, arrayOfOptions, key, setPlanForm }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    arrayOfOptions.splice(index, 1);
    setPlanForm((pV) => ({ ...pV, [key]: arrayOfOptions }));
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this strategy? This can not be undone.
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteConfirmation;
