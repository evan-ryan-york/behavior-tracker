import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { antecedentsAtom, antecedentsResetAtom } from "../../recoil/antecedentsAtoms";
import AntecedentCard from "./AntecedentCard";
import ManageAntecedent from "./ManageAntecedent";
import DeleteDialog from "../shared/DeleteDialog";
import { AntecedentRecord, DropResult } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";

function AntecedentsContainer() {
  const antecedents = useRecoilValue(antecedentsAtom);
  const [antecedentsForDisplay, setAntecedentsForDisplay] = useState<AntecedentRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setAntecedentsReset = useSetRecoilState(antecedentsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!antecedents) return;
    setAntecedentsForDisplay(antecedents);
  }, [antecedents]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!antecedents) return;
      const result = updateDragArray<AntecedentRecord>({ dropResult, arr: antecedents });
      if (!result) return;
      setAntecedentsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((antecedent, index) => {
        promises.push(updateDoc({ col: "antecedents", data: { order: index }, id: antecedent.id }));
      });
      await Promise.all(promises);

      setAntecedentsReset((pV) => !pV);
    },
    [antecedents, setAntecedentsReset, updateDoc]
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
          Add New Antecedent
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {antecedentsForDisplay &&
            antecedentsForDisplay.map((antecedent) => (
              <Draggable key={antecedent.id} className="overflowVisible">
                <AntecedentCard
                  key={antecedent.id}
                  antecedent={antecedent}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageAntecedent open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this antecedent? This cannot be undone."}
          collection="antecedents"
          id={deleteId}
          setReset={setAntecedentsReset}
        />
      )}
    </>
  );
}

export default AntecedentsContainer;
