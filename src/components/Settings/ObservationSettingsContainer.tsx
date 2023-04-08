import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, SettingRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import ManageGroup from "./ManageGroup";
import { settingsAtom, settingsResetAtom } from "../../recoil/settingsAtoms";
import SettingCard from "./SettingCard";
import ManageSetting from "./ManageSetting";

function ObservationSettingsContainer() {
  const settings = useRecoilValue(settingsAtom);
  const [settingsForDisplay, setSettingsForDisplay] = useState<SettingRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setSettingsReset = useSetRecoilState(settingsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!settings) return;
    setSettingsForDisplay(settings);
  }, [settings]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!settings) return;
      const result = updateDragArray<SettingRecord>({ dropResult, arr: settings });
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
          message={"Are you sure you want to delete this Setting? This can not be undone."}
          collection="groups"
          id={deleteId}
          setReset={setSettingsReset}
        />
      )}
    </>
  );
}

export default ObservationSettingsContainer;
