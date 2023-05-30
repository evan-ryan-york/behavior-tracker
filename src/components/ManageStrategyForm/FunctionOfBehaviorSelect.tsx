import React, { useCallback, useEffect, useState } from "react";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";

function FunctionOfBehaviorSelect() {
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const [selectedFunctionsOfBehavior, setSelectedFunctionsOfBehavior] = useState<
    FUNCTIONS_OF_BEHAVIOR[]
  >([]);
  const functionsOfBehaviorArray = Object.values(FUNCTIONS_OF_BEHAVIOR);

  useEffect(() => {
    if (!strategyForm) return;
    const tempFunctionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[] = [];
    strategyForm.functionsOfBehavior.forEach((functionOfBehavior) => {
      tempFunctionsOfBehavior.push(functionOfBehavior);
    });
    setSelectedFunctionsOfBehavior(tempFunctionsOfBehavior);
  }, [strategyForm]);

  const handleFunctionOfBehaviorSelect = useCallback(
    (event: any, values: FUNCTIONS_OF_BEHAVIOR[]) => {
      const currentFunctionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[] = [];
      values.forEach((s) => {
        currentFunctionsOfBehavior.push(s);
      });
      setSelectedFunctionsOfBehavior(currentFunctionsOfBehavior);
      setStrategyForm((pV) => ({ ...pV, functionsOfBehavior: currentFunctionsOfBehavior }));
    },
    [setStrategyForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 4 }}
        options={functionsOfBehaviorArray}
        getOptionLabel={(functionOfBehavior) => functionOfBehavior}
        onChange={handleFunctionOfBehaviorSelect}
        value={selectedFunctionsOfBehavior}
        filterSelectedOptions
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {`${option}`}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Selected Functions Of Behavior"
            placeholder="Select Functions Of Behavior"
          />
        )}
      />
    </>
  );
}

export default FunctionOfBehaviorSelect;
