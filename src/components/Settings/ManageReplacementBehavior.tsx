import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { Button, Dialog, DialogActions, DialogContent, Typography, TextField } from "@mui/material";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import useAddDoc from "../../hooks/useAddDoc";
import { BLANK_LIBRARY_ITEM_FORM } from "../../libraries/blankForms";
import DialogTitle from "@mui/material/DialogTitle";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import {
  replacementBehaviorFormAtom,
  replacementBehaviorsResetAtom,
} from "../../recoil/replacementBehaviorsAtoms";
import ReactQuill from "react-quill";
import { toolbarOptions } from "../../libraries/objects";
import ReplacementBehaviorFunctionSelect from "./ReplacementBehaviorFunctionSelect";
import ReplacementBehaviorTargetSelect from "./ReplacementBehaviorTargetSelect";
import { ChangeEvent } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean | ((pV: boolean) => boolean)) => void;
};

export default function ManageReplacementBehavior({ open, setOpen }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const { sendRequest: addDoc } = useAddDoc();
  const [replacementBehaviorForm, setReplacementBehaviorForm] = useRecoilState(
    replacementBehaviorFormAtom
  );
  const setReplacementBehaviorReset = useSetRecoilState(replacementBehaviorsResetAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  const handleChange = (value: ReactQuill.Value) => {
    setReplacementBehaviorForm((pV) => {
      return { ...pV, content: value };
    });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReplacementBehaviorForm((pV) => ({ ...pV, title: event.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
    setReplacementBehaviorForm(BLANK_LIBRARY_ITEM_FORM);
  };

  const handleSave = async () => {
    if (!loggedInStaff) return;
    const formToSubmit = {
      ...replacementBehaviorForm,
      organizationId: loggedInStaff.organizationId,
    };
    if ("id" in replacementBehaviorForm) {
      await updateDoc({
        col: "replacementBehaviors",
        data: formToSubmit,
        id: replacementBehaviorForm.id,
      });
    } else {
      await addDoc({ col: "replacementBehaviors", data: formToSubmit });
    }
    handleClose();
    setReplacementBehaviorForm(BLANK_LIBRARY_ITEM_FORM);
    setReplacementBehaviorReset((pV) => !pV);
  };

  return (
    <>
      {replacementBehaviorForm && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>{`${
            "id" in replacementBehaviorForm ? "Edit" : "New"
          } Replacement Behavior`}</DialogTitle>
          <DialogContent>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Replacement Behavior Description
            </Typography>
            <ReactQuill
              theme="snow"
              style={{ marginTop: "8px" }}
              value={replacementBehaviorForm.content}
              onChange={handleChange}
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
            <Typography sx={{ mt: 2 }}>Target Behaviors</Typography>
            <ReplacementBehaviorTargetSelect />
            <Typography sx={{ mt: 2 }}>Functions Of Behavior</Typography>
            <ReplacementBehaviorFunctionSelect />
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
