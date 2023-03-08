import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, PeriodRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import ManageGroup from "./ManageGroup";
import { periodsAtom, periodsResetAtom } from "../../recoil/periodsAtoms";
import PeriodCard from "./PeriodCard";
import ManagePeriod from "./ManagePeriod";

function PeriodsContainer() {
  const periods = useRecoilValue(periodsAtom);
  const [periodsForDisplay, setPeriodsForDisplay] = useState<PeriodRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setPeriodsReset = useSetRecoilState(periodsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!periods) return;
    setPeriodsForDisplay(periods);
  }, [periods]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!periods) return;
      const result = updateDragArray<PeriodRecord>({ dropResult, arr: periods });
      if (!result) return;
      setPeriodsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((group, index) => {
        promises.push(updateDoc({ col: "periods", data: { order: index }, id: group.id }));
      });
      await Promise.all(promises);

      setPeriodsReset((pV) => !pV);
    },
    [periods, setPeriodsReset, updateDoc]
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
          Add New Period
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {periodsForDisplay &&
            periodsForDisplay.map((period) => (
              <Draggable key={period.id} className="overflowVisible">
                <PeriodCard
                  key={period.id}
                  period={period}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManagePeriod open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this Period? This can not be undone."}
          collection="groups"
          id={deleteId}
          setReset={setPeriodsReset}
        />
      )}
    </>
  );
}

export default PeriodsContainer;
