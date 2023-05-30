import { useCallback, useEffect, useState } from "react";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { replacementBehaviorFormAtom } from "../../recoil/replacementBehaviorsAtoms";

function ReplacementBehaviorFunctionSelect() {
  const [selectedFunctionsOfBehavior, setSelectedFunctionsOfBehavior] = useState<
    FUNCTIONS_OF_BEHAVIOR[]
  >([]);
  const [replacementBehaviorForm, setReplacementBehaviorForm] = useRecoilState(
    replacementBehaviorFormAtom
  );
  const functionsOfBehaviorArray = Object.values(FUNCTIONS_OF_BEHAVIOR);

  useEffect(() => {
    if (!replacementBehaviorForm) return;
    const tempFunctionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[] = [];
    replacementBehaviorForm.functionsOfBehavior.forEach((functionOfBehavior) => {
      tempFunctionsOfBehavior.push(functionOfBehavior);
    });
    setSelectedFunctionsOfBehavior(tempFunctionsOfBehavior);
  }, [replacementBehaviorForm]);

  const handleFunctionOfBehaviorSelect = useCallback(
    (event: any, values: FUNCTIONS_OF_BEHAVIOR[]) => {
      const currentFunctionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[] = [];
      values.forEach((s) => {
        currentFunctionsOfBehavior.push(s);
      });
      setSelectedFunctionsOfBehavior(currentFunctionsOfBehavior);
      setReplacementBehaviorForm((pV) => ({
        ...pV,
        functionsOfBehavior: currentFunctionsOfBehavior,
      }));
    },
    [setReplacementBehaviorForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 1 }}
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

export default ReplacementBehaviorFunctionSelect;
