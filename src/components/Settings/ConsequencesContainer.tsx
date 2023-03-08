import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { consequencesAtom, consequencesResetAtom } from "../../recoil/consequencesAtoms";
import ConsequenceCard from "./ConsequenceCard";
import ManageConsequence from "./ManageConsequence";
import DeleteDialog from "../shared/DeleteDialog";
import { ConsequenceRecord, DropResult } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";

function ConsequencesContainer() {
  const consequences = useRecoilValue(consequencesAtom);
  const [consequencesForDisplay, setConsequencesForDisplay] = useState<ConsequenceRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setConsequencesReset = useSetRecoilState(consequencesResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!consequences) return;
    setConsequencesForDisplay(consequences);
  }, [consequences]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!consequences) return;
      const result = updateDragArray<ConsequenceRecord>({ dropResult, arr: consequences });
      if (!result) return;
      setConsequencesForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((antecedent, index) => {
        promises.push(
          updateDoc({ col: "consequences", data: { order: index }, id: antecedent.id })
        );
      });
      await Promise.all(promises);

      setConsequencesReset((pV) => !pV);
    },
    [consequences, setConsequencesReset, updateDoc]
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
          Add New Consequence
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {consequencesForDisplay &&
            consequencesForDisplay.map((consequence) => (
              <Draggable key={consequence.id} className="overflowVisible">
                <ConsequenceCard
                  key={consequence.id}
                  consequence={consequence}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageConsequence open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this consequence? This can not be undone."}
          collection="consequences"
          id={deleteId}
          setReset={setConsequencesReset}
        />
      )}
    </>
  );
}

export default ConsequencesContainer;
