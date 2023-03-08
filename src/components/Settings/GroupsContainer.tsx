import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { DropResult, GroupRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { groupsAtom, groupsResetAtom } from "../../recoil/groupAtoms";
import GroupCard from "./GroupCard";
import ManageGroup from "./ManageGroup";

function GroupsContainer() {
  const groups = useRecoilValue(groupsAtom);
  const [groupsForDisplay, setGroupsForDisplay] = useState<GroupRecord[]>([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setGroupsReset = useSetRecoilState(groupsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!groups) return;
    setGroupsForDisplay(groups);
  }, [groups]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!groups) return;
      const result = updateDragArray<GroupRecord>({ dropResult, arr: groups });
      if (!result) return;
      setGroupsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((group, index) => {
        promises.push(updateDoc({ col: "groups", data: { order: index }, id: group.id }));
      });
      await Promise.all(promises);

      setGroupsReset((pV) => !pV);
    },
    [groups, setGroupsReset, updateDoc]
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
          Add New Group
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {groupsForDisplay &&
            groupsForDisplay.map((group) => (
              <Draggable key={group.id} className="overflowVisible">
                <GroupCard
                  key={group.id}
                  group={group}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageGroup open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this Group? This can not be undone."}
          collection="groups"
          id={deleteId}
          setReset={setGroupsReset}
        />
      )}
    </>
  );
}

export default GroupsContainer;
