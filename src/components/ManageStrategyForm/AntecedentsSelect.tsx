import { useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { antecedentsAtom, antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { AntecedentRecord } from "../../types/types";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";

function AntecedentsSelect() {
  const antecedents = useRecoilValue(antecedentsAtom);
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);
  const [selectedAntecedents, setSelectedAntecedents] = useState<AntecedentRecord[]>([]);

  useEffect(() => {
    if (!strategyForm || !antecedentsObj) return;
    const tempAntecedents: AntecedentRecord[] = [];
    strategyForm.antecedentIds.forEach((antecedentId) => {
      tempAntecedents.push(antecedentsObj[antecedentId]);
    });
    setSelectedAntecedents(tempAntecedents);
  }, [antecedentsObj, strategyForm]);

  const handleAntecedentSelect = useCallback(
    (event: any, values: AntecedentRecord[]) => {
      const currentSelectedAntecedents: AntecedentRecord[] = [];
      const antecedentIds: string[] = [];
      values.forEach((s) => {
        currentSelectedAntecedents.push(s);
        antecedentIds.push(s.id);
      });
      setSelectedAntecedents(currentSelectedAntecedents);
      setStrategyForm((pV) => ({ ...pV, antecedentIds: antecedentIds }));
    },
    [setStrategyForm]
  );
  return (
    <>
      <Autocomplete
        multiple
        sx={{ mt: 2 }}
        options={antecedents}
        getOptionLabel={(antecedent) => antecedent.label}
        onChange={handleAntecedentSelect}
        value={selectedAntecedents}
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
            label="Selected Antecedents"
            placeholder="Select Antecedents"
          />
        )}
      />
    </>
  );
}

export default AntecedentsSelect;
