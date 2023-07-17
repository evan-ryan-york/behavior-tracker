import {
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Box,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import ShowPrimaryFunctionOfBehavior from "./ShowPrimaryFunctionOfBehavior";
import { BehaviorRecord } from "../../types/types";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { validateCurrentStage } from "../../libraries/functions";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import DataSelectDialog from "./DataSelectDialog";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";
import LibrarySection from "./LibrarySection";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";

type Props = {
  setOpen: (value: boolean) => void;
  behaviorsForForm: BehaviorRecord[];
  behaviorPlanStage: number;
  setBehaviorPlanStage: (pV: number) => void;
};

function BehaviorSelectSection({
  setOpen,
  behaviorsForForm,
  behaviorPlanStage,
  setBehaviorPlanStage,
}: Props) {
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);
  const [sourceDataOpen, setSourceDataOpen] = useState(false);
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);

  useEffect(() => {
    validateCurrentStage({ planForm, setBehaviorPlanStage });
  }, [planForm, setBehaviorPlanStage]);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPlanForm((pV) => ({ ...pV, [event.target.name]: event.target.value }));
  };

  const handleSourceDataClick = () => {
    setSourceDataOpen(true);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">Stage 1: Behaviors</Typography>
        <Divider />
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mt: 2 }} variant="h5">
            First, Define The Behavior You Want To Change:
          </Typography>
          <Button onClick={handleSourceDataClick}>Modify Source Data Date Range</Button>
        </Box>
        <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
          When you click the drop down below, you'll see each targetable behavior with the number of
          times that behavior has been recorded in your data. By default you'll only see data for
          the past month. If you want to see longer or shorter range of data, click the button above
          that says "Modify Source Data Date Range"
        </Alert>
        <Select
          name="targetBehavior"
          fullWidth
          onChange={handleSelectChange}
          value={planForm.targetBehavior}
          sx={{ mt: 1 }}
        >
          {behaviorsForForm &&
            behaviorsForForm.map((behavior) => (
              <MenuItem key={behavior.id} value={behavior.id}>
                {behavior.label}
              </MenuItem>
            ))}
        </Select>
        {behaviorPlanStage > 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">{`Then, In Your Own Words, What Does This Behavior Look Like For ${selectedStudent?.firstName}:`}</Typography>
            <TextField
              onChange={handleTextFieldChange}
              name="behaviorDefinition"
              value={planForm.behaviorDefinition}
              multiline
              fullWidth
              sx={{ mt: 1 }}
            />
            <Box sx={{ mt: 2 }}>
              <ShowPrimaryFunctionOfBehavior
                behaviorId={planForm.targetBehavior}
                setPlanForm={setPlanForm}
              />
            </Box>
          </Box>
        )}
        {behaviorsObj && behaviorPlanStage > 1 && (
          <Box sx={{ mt: 2 }}>
            <LibrarySection
              title="Replacement Behaviors"
              library="replacementBehaviors"
              libraryItems={replacementBehaviors}
            />
          </Box>
        )}
      </Box>
      <DataSelectDialog open={sourceDataOpen} setOpen={setSourceDataOpen} />
    </>
  );
}

export default BehaviorSelectSection;
