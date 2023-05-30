import { useState } from "react";
import { Box, Button } from "@mui/material";
import ManageStrategyDialog from "../ManageStrategyForm/ManageStrategyDialog";
import { strategiesAtom, strategiesResetAtom } from "../../recoil/strategiesAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import StrategyCard from "./StrategyCard";
import DeleteDialog from "../shared/DeleteDialog";

function StrategiesContainer() {
  const [manageOpen, setManageOpen] = useState(false);
  const strategies = useRecoilValue(strategiesAtom);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const setStrategiesReset = useSetRecoilState(strategiesResetAtom);

  const handleManageClick = () => {
    setManageOpen(true);
  };
  return (
    <>
      <Button
        onClick={handleManageClick}
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ padding: 1, fontSize: 16 }}
      >
        Add New Strategy
      </Button>
      <Box>
        {strategies &&
          strategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              manageOpen={manageOpen}
              setManageOpen={setManageOpen}
              setDeleteOpen={setDeleteOpen}
              setDeleteId={setDeleteId}
            />
          ))}
      </Box>
      <ManageStrategyDialog open={manageOpen} setOpen={setManageOpen} />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        message="Are you sure you want to delete this strategy? This cannot be undone"
        collection="strategies"
        id={deleteId}
        setReset={setStrategiesReset}
      />
    </>
  );
}

export default StrategiesContainer;
