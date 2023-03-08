import { Box, Paper, Typography, Button, Chip, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PeriodRecord } from "../../types/types";
import { periodFormAtom } from "../../recoil/periodsAtoms";
import { sitesObjAtom } from "../../recoil/sitesAtoms";

type Props = {
  period: PeriodRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function PeriodCard({ period, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setPeriodForm = useSetRecoilState(periodFormAtom);
  const sitesObj = useRecoilValue(sitesObjAtom);
  const handleFieldEdit = (antecedent: PeriodRecord) => {
    setPeriodForm(period);
    setManageOpen(true);
  };

  console.log(period);

  const handleDeleteGroup = () => {
    setDeleteOpen(true);
    setDeleteId(period.id);
  };
  return (
    <>
      {sitesObj && (
        <Box sx={{ mt: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{`Group: ${period.name}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  {period.siteIds.map((siteId) => (
                    <Chip key={siteId} label={sitesObj[siteId].name} />
                  ))}
                  <Button
                    sx={{ mr: 2, ml: 2 }}
                    variant="outlined"
                    onClick={() => handleFieldEdit(period)}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleDeleteGroup}>
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default PeriodCard;
