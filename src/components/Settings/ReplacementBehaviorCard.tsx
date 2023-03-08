import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { ReplacementBehaviorRecord } from "../../types/types";
import { replacementBehaviorFormAtom } from "../../recoil/replacementBehaviorsAtoms";

type Props = {
  replacementBehavior: ReplacementBehaviorRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function ReplacementBehaviorCard({
  replacementBehavior,
  setManageOpen,
  setDeleteOpen,
  setDeleteId,
}: Props) {
  const setReplacementBehaviorForm = useSetRecoilState(replacementBehaviorFormAtom);
  const handleFieldEdit = (replacementBehavior: ReplacementBehaviorRecord) => {
    setReplacementBehaviorForm(replacementBehavior);
    setManageOpen(true);
  };

  const handleDeleteAntecedent = () => {
    setDeleteOpen(true);
    setDeleteId(replacementBehavior.id);
  };
  return (
    <>
      <Box sx={{ mt: 2, cursor: "pointer" }}>
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{`Replacement Behavior: ${replacementBehavior.label}`}</Typography>
          <Box>
            <Button
              sx={{ mr: 2 }}
              variant="outlined"
              onClick={() => handleFieldEdit(replacementBehavior)}
            >
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteAntecedent}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ReplacementBehaviorCard;
