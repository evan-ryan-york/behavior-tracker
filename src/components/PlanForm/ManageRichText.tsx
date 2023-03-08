import { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import ReactQuill from "react-quill";
import "quill-paste-smart";
import "react-quill/dist/quill.snow.css";
import { BehaviorPlan } from "../../types/types";
import { toolbarOptions } from "../../libraries/objects";

type FormSetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setPlanForm: (pV: FormSetterFunction) => void;
  index: number;
  arrayOfOptions: ReactQuill.Value[];
  key: string;
};

export default function ManageRichText({
  open,
  setOpen,
  index,
  arrayOfOptions,
  setPlanForm,
  key,
}: Props) {
  const [text, setText] = useState<ReactQuill.Value>(arrayOfOptions[index]);

  useEffect(() => {
    setText(arrayOfOptions[index]);
  }, [index, arrayOfOptions]);

  const handleTextChange = useCallback((newValue: ReactQuill.Value) => {
    setText(newValue);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    arrayOfOptions[index] = text;
    setPlanForm((pV) => ({ ...pV, [key]: arrayOfOptions }));
    setOpen(false);
  };

  return (
    <>
      {text && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Edit</DialogTitle>
          <DialogContent>
            <ReactQuill
              theme="snow"
              value={text}
              onChange={handleTextChange}
              modules={{
                toolbar: toolbarOptions,
                clipboard: {
                  allowed: {
                    tags: ["a", "u", "s", "i", "p", "br", "ul", "ol", "li", "span"],
                    attributes: ["href"],
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
