import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { ConsequenceRecord } from "../../types/types";
import { consequenceFormAtom } from "../../recoil/consequencesAtoms";

type Props = {
  consequence: ConsequenceRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function ConsequenceCard({ consequence, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setConsequenceForm = useSetRecoilState(consequenceFormAtom);
  const handleFieldEdit = (antecedent: ConsequenceRecord) => {
    setConsequenceForm(antecedent);
    setManageOpen(true);
  };

  const handleDeleteConsequence = () => {
    setDeleteOpen(true);
    setDeleteId(consequence.id);
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
          <Typography>{`Consequence: ${consequence.label}`}</Typography>
          <Box>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(consequence)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteConsequence}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default ConsequenceCard;
