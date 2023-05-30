import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BehaviorPlan, StrategyRecord } from "../../types/types";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { replaceKeywords } from "../../libraries/functions";
import { useRecoilValue } from "recoil";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
  filteredStrategies: StrategyRecord[];
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
  setText: (pV: ReactQuill.Value) => void;
  type: "preventionStrategies" | "reinforcementStrategies" | "extinguishStrategies";
};
function StrategyPreview({
  open,
  setOpen,
  filteredStrategies,
  setPlanForm,
  planForm,
  type,
  setText,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);

  const selectStrategyHandle = (strategy: ReactQuill.Value) => {
    if (!selectedStudent || !planForm.targetBehavior) return;
    const keywordsUpdated = replaceKeywords({
      selectedStudent,
      planForm,
      text: strategy,
      behaviorsObj,
    });
    setText(keywordsUpdated);
    handleClose();
  };

  const showWithReplacedKeywords = (strategy: ReactQuill.Value) => {
    if (!selectedStudent || !planForm.targetBehavior) return "";
    const stringWithReplacedKeywords = replaceKeywords({
      selectedStudent,
      planForm,
      text: strategy,
      behaviorsObj,
    });
    return stringWithReplacedKeywords;
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Select Strategy</DialogTitle>
        <DialogContent>
          {filteredStrategies.map((strategy) => (
            <Card sx={{ mt: 2 }} key={strategy.id}>
              <CardContent>{parse(showWithReplacedKeywords(strategy.content))}</CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "right" }}>
                <Button onClick={() => selectStrategyHandle(strategy.content)} variant="outlined">
                  Use Strategy
                </Button>
              </CardActions>
            </Card>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StrategyPreview;
