import { useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { BehaviorRecord } from "../../types/types";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import { behaviorsAtom, behaviorsObjAtom } from "../../recoil/behaviorsAtoms";

function TargetBehaviorsSelect() {
  const targetBehaviors = useRecoilValue(behaviorsAtom);
  const targetBehaviorObj = useRecoilValue(behaviorsObjAtom);
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const [selectedTargetBehaviors, setSelectedTargetBehaviors] = useState<BehaviorRecord[]>([]);

  useEffect(() => {
    if (!strategyForm || !targetBehaviorObj) return;
    const tempTargetBehaviors: BehaviorRecord[] = [];
    strategyForm.targetBehaviorsIds.forEach((targetBehaviorsId) => {
      tempTargetBehaviors.push(targetBehaviorObj[targetBehaviorsId]);
    });
    setSelectedTargetBehaviors(tempTargetBehaviors);
  }, [targetBehaviorObj, strategyForm]);

  const handleTargetBehaviorSelect = useCallback(
    (event: any, values: BehaviorRecord[]) => {
      const currentSelectedTargetBehaviors: BehaviorRecord[] = [];
      const targetBehaviorIds: string[] = [];
      values.forEach((s) => {
        currentSelectedTargetBehaviors.push(s);
        targetBehaviorIds.push(s.id);
      });
      setSelectedTargetBehaviors(currentSelectedTargetBehaviors);
      setStrategyForm((pV) => ({ ...pV, targetBehaviorsIds: targetBehaviorIds }));
    },
    [setStrategyForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 4 }}
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

export default TargetBehaviorsSelect;
