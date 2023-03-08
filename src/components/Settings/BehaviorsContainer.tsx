import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { behaviorsAtom, behaviorsResetAtom } from "../../recoil/behaviorsAtoms";
import BehaviorCard from "./BehaviorCard";
import ManageBehavior from "./ManageBehavior";
import DeleteDialog from "../shared/DeleteDialog";
import { BehaviorRecord, DropResult } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";

function BehaviorsContainer() {
  const behaviors = useRecoilValue(behaviorsAtom);
  const [behaviorsForDisplay, setBehaviorsForDisplay] = useState<BehaviorRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setBehaviorsReset = useSetRecoilState(behaviorsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!behaviors) return;
    setBehaviorsForDisplay(behaviors);
  }, [behaviors]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!behaviors) return;
      const result = updateDragArray<BehaviorRecord>({ dropResult, arr: behaviors });
      if (!result) return;
      setBehaviorsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((antecedent, index) => {
        promises.push(updateDoc({ col: "behaviors", data: { order: index }, id: antecedent.id }));
      });
      await Promise.all(promises);

      setBehaviorsReset((pV) => !pV);
    },
    [behaviors, setBehaviorsReset, updateDoc]
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
          Add New Behavior
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {behaviorsForDisplay &&
            behaviorsForDisplay.map((behavior) => (
              <Draggable key={behavior.id} className="overflowVisible">
                <BehaviorCard
                  key={behavior.id}
                  behavior={behavior}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageBehavior open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this behavior? This can not be undone."}
          collection="behaviors"
          id={deleteId}
          setReset={setBehaviorsReset}
        />
      )}
    </>
  );
}

export default BehaviorsContainer;
