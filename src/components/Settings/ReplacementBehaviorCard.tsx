import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { ReplacementBehaviorRecord } from "../../types/types";
import parse from "html-react-parser";
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
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item lg={9} md={8} sm={12} xs={12}>
              <Box>{parse(replacementBehavior.content as string)}</Box>
            </Grid>
            <Grid item lg={3} md={4} sm={12} xs={12} sx={{ textAlign: "right" }}>
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
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default ReplacementBehaviorCard;
