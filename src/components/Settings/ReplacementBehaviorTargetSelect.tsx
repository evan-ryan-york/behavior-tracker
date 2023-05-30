import { useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { BehaviorRecord } from "../../types/types";
import { behaviorsAtom, behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { replacementBehaviorFormAtom } from "../../recoil/replacementBehaviorsAtoms";

function ReplacementBehaviorTargetSelect() {
  const [replacementBehaviorForm, setReplacementBehaviorForm] = useRecoilState(
    replacementBehaviorFormAtom
  );
  const targetBehaviors = useRecoilValue(behaviorsAtom);
  const targetBehaviorObj = useRecoilValue(behaviorsObjAtom);
  const [selectedTargetBehaviors, setSelectedTargetBehaviors] = useState<BehaviorRecord[]>([]);

  useEffect(() => {
    if (!replacementBehaviorForm || !targetBehaviorObj) return;
    const tempTargetBehaviors: BehaviorRecord[] = [];
    replacementBehaviorForm.targetBehaviorIds.forEach((targetBehaviorId) => {
      tempTargetBehaviors.push(targetBehaviorObj[targetBehaviorId]);
    });
    setSelectedTargetBehaviors(tempTargetBehaviors);
  }, [targetBehaviorObj, replacementBehaviorForm]);

  const handleTargetBehaviorSelect = useCallback(
    (event: any, values: BehaviorRecord[]) => {
      const currentSelectedTargetBehaviors: BehaviorRecord[] = [];
      const targetBehaviorIds: string[] = [];
      values.forEach((s) => {
        currentSelectedTargetBehaviors.push(s);
        targetBehaviorIds.push(s.id);
      });
      setSelectedTargetBehaviors(currentSelectedTargetBehaviors);
      setReplacementBehaviorForm((pV) => ({ ...pV, targetBehaviorIds: targetBehaviorIds }));
    },
    [setReplacementBehaviorForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 1 }}
        options={targetBehaviors}
        getOptionLabel={(targetBehavior) => targetBehavior.label}
        onChange={handleTargetBehaviorSelect}
        value={selectedTargetBehaviors}
        filterSelectedOptions
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {`${option.label}`}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Selected Target Behaviors"
            placeholder="Select Target Behaviors"
          />
        )}
      />
    </>
  );
}

export default ReplacementBehaviorTargetSelect;
