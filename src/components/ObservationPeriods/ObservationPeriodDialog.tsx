import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import TimerContainer from "../Timer/TimerContainer";
import ObservationPeriodContainer from "./ObservationPeriodContainer";
import ManageObservationPeriod from "./ManageObservationPeriod";
import { useSetRecoilState } from "recoil";
import {
  manageObservationPeriodOpenAtom,
  observationPeriodForEditAtom,
} from "../../recoil/observationAtoms";
import InstructionsAccordion from "./InstructionsAccordion";
import ObservationFormDialog from "../ObservationForm/ObservationFormDialog";

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
};

function ObservationPeriodDialog({ open, setOpen }: Props) {
  const setObservationPeriodForEdit = useSetRecoilState(observationPeriodForEditAtom);
  const setManageObservationPeriodOpen = useSetRecoilState(manageObservationPeriodOpenAtom);
  const handleClose = () => {
    setOpen(false);
  };

  const handleNewObservationPeriodClick = () => {
    setObservationPeriodForEdit(null);
    setManageObservationPeriodOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <Box sx={{ backgroundColor: "#fafafa", padding: 1 }}>
          <DialogTitle sx={{ fontSize: 44 }}>Observation Session</DialogTitle>

          <DialogContent>
            <InstructionsAccordion />
            <TimerContainer />
            <ObservationPeriodContainer />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button
              color="secondary"
              variant="contained"
              sx={{ padding: 2 }}
              onClick={handleNewObservationPeriodClick}
            >
              New Observation Session
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <ManageObservationPeriod />
      <ObservationFormDialog />
    </>
  );
}

export default ObservationPeriodDialog;
