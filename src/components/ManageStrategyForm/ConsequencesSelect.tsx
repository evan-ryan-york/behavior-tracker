import { useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { ConsequenceRecord } from "../../types/types";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import { consequencesAtom, consequencesObjAtom } from "../../recoil/consequencesAtoms";

function ConsequencesSelect() {
  const consequences = useRecoilValue(consequencesAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const [selectedConsequences, setSelectedConsequences] = useState<ConsequenceRecord[]>([]);

  useEffect(() => {
    if (!strategyForm || !consequencesObj) return;
    const tempConsequences: ConsequenceRecord[] = [];
    strategyForm.consequenceIds.forEach((consequenceId) => {
      tempConsequences.push(consequencesObj[consequenceId]);
    });
    setSelectedConsequences(tempConsequences);
  }, [consequencesObj, strategyForm]);

  const handleConsequenceSelect = useCallback(
    (event: any, values: ConsequenceRecord[]) => {
      const currentSelectedConsequences: ConsequenceRecord[] = [];
      const consequenceIds: string[] = [];
      values.forEach((s) => {
        currentSelectedConsequences.push(s);
        consequenceIds.push(s.id);
      });
      setSelectedConsequences(currentSelectedConsequences);
      setStrategyForm((pV) => ({ ...pV, consequenceIds: consequenceIds }));
    },
    [setStrategyForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 2 }}
        options={consequences}
        getOptionLabel={(consequence) => consequence.label}
        onChange={handleConsequenceSelect}
        value={selectedConsequences}
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
            label="Selected Consequences"
            placeholder="Select Consequences"
          />
        )}
      />
    </>
  );
}

export default ConsequencesSelect;
