import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { EnrollStatusRecord } from "../../types/types";
import { enrollStatusFormAtom } from "../../recoil/enrollStatusAtoms";

type Props = {
  enrollStatus: EnrollStatusRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function EnrollStatusCard({ enrollStatus, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setEnrollStatusForm = useSetRecoilState(enrollStatusFormAtom);
  const handleFieldEdit = (antecedent: EnrollStatusRecord) => {
    setEnrollStatusForm(enrollStatus);
    setManageOpen(true);
  };

  const handleDeleteEnrollStatus = () => {
    setDeleteOpen(true);
    setDeleteId(enrollStatus.id);
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
          <Typography>{`Status: ${enrollStatus.name}`}</Typography>
          <Box>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(enrollStatus)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteEnrollStatus}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default EnrollStatusCard;
