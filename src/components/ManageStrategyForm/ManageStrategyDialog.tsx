import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import ManageStrategyForm from "./ManageStrategyForm";
import useAddDoc from "../../hooks/useAddDoc";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ManageStrategyDialog({ open, setOpen }: Props) {
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const organization = useRecoilValue(organizationAtom);
  const { sendRequest: addDoc } = useAddDoc();
  const { sendRequest: updateDoc } = useUpdateDoc();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!loggedInStaff || !organization) return;
    const data = { ...strategyForm, authorId: loggedInStaff.id, organizationId: organization.id };
    if ("id" in data) {
      await updateDoc({ col: "strategies", data: data, id: data.id });
    } else {
      await addDoc({ col: "strategies", data: data });
    }
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
          {"id" in strategyForm ? "Edit" : "New"}
        </DialogTitle>
        <DialogContent>
          <ManageStrategyForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
