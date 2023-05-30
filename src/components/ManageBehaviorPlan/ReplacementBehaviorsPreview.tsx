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
import { BehaviorPlan, ReplacementBehaviorRecord } from "../../types/types";
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
  filteredReplacementBehaviors: ReplacementBehaviorRecord[];
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
  setText: (pV: ReactQuill.Value) => void;
};
function ReplacementBehaviorsPreview({
  open,
  setOpen,
  filteredReplacementBehaviors,
  setPlanForm,
  planForm,
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
          {filteredReplacementBehaviors.map((replacementBehavior) => (
            <Card sx={{ mt: 2 }} key={replacementBehavior.id}>
              <CardContent>
                {parse(showWithReplacedKeywords(replacementBehavior.content))}
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  onClick={() => selectStrategyHandle(replacementBehavior.content)}
                  variant="outlined"
                >
                  Use Behavior
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

export default ReplacementBehaviorsPreview;
