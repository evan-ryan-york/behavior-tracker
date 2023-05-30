import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, ReplacementBehaviorRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import {
  replacementBehaviorsAtom,
  replacementBehaviorsResetAtom,
} from "../../recoil/replacementBehaviorsAtoms";
import ReplacementBehaviorCard from "./ReplacementBehaviorCard";
import ManageReplacementBehavior from "./ManageReplacementBehavior";

function ReplacementBehaviorsContainer() {
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const [replacementBehaviorsForDisplay, setReplacementBehaviorsForDisplay] = useState<
    ReplacementBehaviorRecord[]
  >([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setReplacementBehaviorsReset = useSetRecoilState(replacementBehaviorsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!replacementBehaviors) return;
    setReplacementBehaviorsForDisplay(replacementBehaviors);
  }, [replacementBehaviors]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!replacementBehaviors) return;
      const result = updateDragArray<ReplacementBehaviorRecord>({
        dropResult,
        arr: replacementBehaviors,
      });
      if (!result) return;
      setReplacementBehaviorsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((replacementBehavior, index) => {
        promises.push(
          updateDoc({
            col: "replacementBehaviors",
            data: { order: index },
            id: replacementBehavior.id,
          })
        );
      });
      await Promise.all(promises);

      setReplacementBehaviorsReset((pV) => !pV);
    },
    [replacementBehaviors, setReplacementBehaviorsReset, updateDoc]
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
          Add New Replacement Behavior
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {replacementBehaviorsForDisplay &&
            replacementBehaviorsForDisplay.map((replacementBehavior) => (
              <Draggable key={replacementBehavior.id} className="overflowVisible">
                <ReplacementBehaviorCard
                  key={replacementBehavior.id}
                  replacementBehavior={replacementBehavior}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageReplacementBehavior open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={
            "Are you sure you want to delete this replacement behavior? This cannot be undone."
          }
          collection="replacementBehaviors"
          id={deleteId}
          setReset={setReplacementBehaviorsReset}
        />
      )}
    </>
  );
}

export default ReplacementBehaviorsContainer;
