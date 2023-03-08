import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, SiteRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { sitesAtom, sitesResetAtom } from "../../recoil/sitesAtoms";
import SiteCard from "./SiteCard";
import ManageSite from "./MagageSite";

function SitesContainer() {
  const sites = useRecoilValue(sitesAtom);
  const [sitesForDisplay, setSitesForDisplay] = useState<SiteRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setSitesReset = useSetRecoilState(sitesResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!sites) return;
    setSitesForDisplay(sites);
  }, [sites]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!sites) return;
      const result = updateDragArray<SiteRecord>({ dropResult, arr: sites });
      if (!result) return;
      setSitesForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((antecedent, index) => {
        promises.push(updateDoc({ col: "sites", data: { order: index }, id: antecedent.id }));
      });
      await Promise.all(promises);

      setSitesReset((pV) => !pV);
    },
    [sites, setSitesReset, updateDoc]
  );

  const handleOnDrop = (dropResult: DropResult) => {
    handleDrop(dropResult);
  };
  return (
    <>
      <Box sx={{ mt: 2, ml: 4, mr: 4 }}>
        <Button
          onClick={handleManageClick}
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ padding: 1, fontSize: 16 }}
        >
          Add New Site
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {sitesForDisplay &&
            sitesForDisplay.map((site) => (
              <Draggable key={site.id} className="overflowVisible">
                <SiteCard
                  key={site.id}
                  site={site}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageSite open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this site? This can not be undone."}
          collection="sites"
          id={deleteId}
          setReset={setSitesReset}
        />
      )}
    </>
  );
}

export default SitesContainer;
