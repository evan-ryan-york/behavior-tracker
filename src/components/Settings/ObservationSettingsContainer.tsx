import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, SettingRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { settingsAtom, settingsResetAtom } from "../../recoil/settingsAtoms";
import SettingCard from "./SettingCard";
import ManageSetting from "./ManageSetting";
import { selectedSiteIdAtom, sitesAtom } from "../../recoil/sitesAtoms";

function ObservationSettingsContainer() {
  const settings = useRecoilValue(settingsAtom);
  const [settingsForDisplay, setSettingsForDisplay] = useState<SettingRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setSettingsReset = useSetRecoilState(settingsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const sites = useRecoilValue(sitesAtom);
  const [selectedSiteId, setSelectedSiteId] = useRecoilState(selectedSiteIdAtom);

  useEffect(() => {
    if (!settings || !selectedSiteId) return;
    const filteredSettings = settings.filter((setting) => setting.siteId === selectedSiteId);
    setSettingsForDisplay(filteredSettings);
  }, [selectedSiteId, settings]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!settingsForDisplay) return;
      const result = updateDragArray<SettingRecord>({ dropResult, arr: settingsForDisplay });
      if (!result) return;
      setSettingsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((group, index) => {
        promises.push(updateDoc({ col: "settings", data: { order: index }, id: group.id }));
      });
      await Promise.all(promises);

      setSettingsReset((pV) => !pV);
    },
    [settings, setSettingsReset, updateDoc]
  );

  const handleOnDrop = (dropResult: DropResult) => {
    handleDrop(dropResult);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedSiteId(event.target.value);
  };
  return (
    <>
      <Box sx={{ mt: 2, ml: 4, mr: 4 }}>
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel id="site-select-label">Select Site</InputLabel>
          <Select
            id="site-select"
            value={selectedSiteId}
            label="Select Site"
            onChange={handleSelectChange}
            fullWidth
          >
            {sites &&
              sites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleManageClick}
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ padding: 1, fontSize: 16, mt: 2 }}
        >
          Add New Setting
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {settingsForDisplay &&
            settingsForDisplay.map((setting) => (
              <Draggable key={setting.id} className="overflowVisible">
                <SettingCard
                  key={setting.id}
                  setting={setting}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageSetting open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this Setting? This cannot be undone."}
          collection="groups"
          id={deleteId}
          setReset={setSettingsReset}
        />
      )}
    </>
  );
}

export default ObservationSettingsContainer;
