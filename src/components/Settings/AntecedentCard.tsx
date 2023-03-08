import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { AntecedentRecord } from "../../types/types";
import { antecedentFormAtom } from "../../recoil/antecedentsAtoms";

type Props = {
  antecedent: AntecedentRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function AntecedentCard({ antecedent, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setAntecedentForm = useSetRecoilState(antecedentFormAtom);
  const handleFieldEdit = (antecedent: AntecedentRecord) => {
    setAntecedentForm(antecedent);
    setManageOpen(true);
  };

  const handleDeleteAntecedent = () => {
    setDeleteOpen(true);
    setDeleteId(antecedent.id);
  };
  return (
    <>
      <Box sx={{ mt: 2, cursor: "pointer" }}>
        <Paper sx={{ padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>{`Antecedent: ${antecedent.label}`}</Typography>
          <Box>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(antecedent)}>
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

export default AntecedentCard;
