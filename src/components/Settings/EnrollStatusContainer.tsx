import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, EnrollStatusRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { enrollStatusesAtom, enrollStatusesResetAtom } from "../../recoil/enrollStatusAtoms";
import EnrollStatusCard from "./EnrollStatusCard";
import ManageEnrollStatus from "./ManageEnrollStatus";

function EnrollStatusContainer() {
  const enrollStatuses = useRecoilValue(enrollStatusesAtom);
  const [enrollStatusesForDisplay, setEnrollStatusesForDisplay] = useState<EnrollStatusRecord[]>(
    []
  );
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setEnrollStatusesReset = useSetRecoilState(enrollStatusesResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!enrollStatuses) return;
    setEnrollStatusesForDisplay(enrollStatuses);
  }, [enrollStatuses]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!enrollStatuses) return;
      const result = updateDragArray<EnrollStatusRecord>({ dropResult, arr: enrollStatuses });
      if (!result) return;
      setEnrollStatusesForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((enrollStatus, index) => {
        promises.push(
          updateDoc({ col: "enrollStatuses", data: { order: index }, id: enrollStatus.id })
        );
      });
      await Promise.all(promises);

      setEnrollStatusesReset((pV) => !pV);
    },
    [enrollStatuses, setEnrollStatusesReset, updateDoc]
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
          Add New Enroll Status
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {enrollStatusesForDisplay &&
            enrollStatusesForDisplay.map((enrollStatus) => (
              <Draggable key={enrollStatus.id} className="overflowVisible">
                <EnrollStatusCard
                  key={enrollStatus.id}
                  enrollStatus={enrollStatus}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageEnrollStatus open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={
            "Are you sure you want to delete this Enrollment Status? This can not be undone and all students assigned this enrollment status will lose their enrollment status."
          }
          collection="enrollStatuses"
          id={deleteId}
          setReset={setEnrollStatusesReset}
        />
      )}
    </>
  );
}

export default EnrollStatusContainer;
