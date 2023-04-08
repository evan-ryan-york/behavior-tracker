import { useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReplacementBehaviorRecord } from "../../types/types";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import {
  replacementBehaviorsAtom,
  replacementBehaviorsObjAtom,
} from "../../recoil/replacementBehaviorsAtoms";

function ReplacementBehaviorsSelect() {
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const replacementBehaviorsObj = useRecoilValue(replacementBehaviorsObjAtom);
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const [selectedReplacementBehaviors, setSelectedReplacementBehaviors] = useState<
    ReplacementBehaviorRecord[]
  >([]);

  useEffect(() => {
    if (!strategyForm || !replacementBehaviorsObj) return;
    const tempReplacementBehaviors: ReplacementBehaviorRecord[] = [];
    strategyForm.replacementBehaviorIds.forEach((replacementBehaviorId) => {
      tempReplacementBehaviors.push(replacementBehaviorsObj[replacementBehaviorId]);
    });
    setSelectedReplacementBehaviors(tempReplacementBehaviors);
  }, [replacementBehaviorsObj, strategyForm]);

  const handleAReplacementBehaviorSelect = useCallback(
    (event: any, values: ReplacementBehaviorRecord[]) => {
      const currentSelectedReplacementBehaviors: ReplacementBehaviorRecord[] = [];
      const replacementBehaviorIds: string[] = [];
      values.forEach((s) => {
        currentSelectedReplacementBehaviors.push(s);
        replacementBehaviorIds.push(s.id);
      });
      setSelectedReplacementBehaviors(currentSelectedReplacementBehaviors);
      setStrategyForm((pV) => ({ ...pV, replacementBehaviorIds: replacementBehaviorIds }));
    },
    [setStrategyForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 2 }}
        options={replacementBehaviors}
        getOptionLabel={(replacementBehavior) => replacementBehavior.label}
        onChange={handleAReplacementBehaviorSelect}
        value={selectedReplacementBehaviors}
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
            label="Selected Replacement Behaviors"
            placeholder="Select Replacement Behaviors"
          />
        )}
      />
    </>
  );
}

export default ReplacementBehaviorsSelect;
