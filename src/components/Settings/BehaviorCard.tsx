import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { BehaviorRecord } from "../../types/types";
import { behaviorFormAtom } from "../../recoil/behaviorsAtoms";

type Props = {
  behavior: BehaviorRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function BehaviorCard({ behavior, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setBehaviorForm = useSetRecoilState(behaviorFormAtom);
  const handleFieldEdit = (antecedent: BehaviorRecord) => {
    setBehaviorForm(antecedent);
    setManageOpen(true);
  };

  const handleDeleteBehavior = () => {
    setDeleteOpen(true);
    setDeleteId(behavior.id);
  };
  return (
    <>
      <Box sx={{ mt: 2, cursor: "pointer" }}>
        <Paper sx={{ padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>{`Behavior: ${behavior.label}`}</Typography>
          <Box>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(behavior)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteBehavior}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default BehaviorCard;
