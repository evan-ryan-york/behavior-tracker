import { Box, Paper, Typography, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { SiteRecord } from "../../types/types";
import { siteFormAtom } from "../../recoil/sitesAtoms";

type Props = {
  site: SiteRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function SiteCard({ site, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setSiteForm = useSetRecoilState(siteFormAtom);
  const handleFieldEdit = (antecedent: SiteRecord) => {
    setSiteForm(site);
    setManageOpen(true);
  };

  const handleDeleteSite = () => {
    setDeleteOpen(true);
    setDeleteId(site.id);
  };
  return (
    <>
      <Box sx={{ mt: 2, cursor: "pointer" }}>
        <Paper sx={{ padding: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>{`Site: ${site.name}`}</Typography>
          <Box>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(site)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteSite}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default SiteCard;
