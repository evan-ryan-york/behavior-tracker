import React from "react";
import { Box, Divider, Typography, Chip, Grid } from "@mui/material";
import { antecedentsAtom } from "../../recoil/antecedentsAtoms";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { consequencesAtom } from "../../recoil/consequencesAtoms";
import { useRecoilValue } from "recoil";

type Props = {
  antecedentsArray: string[];
  behaviorsArray: string[];
  consequencesArray: string[];
  setAntecedentsArray: (value: string[]) => void;
  setBehaviorsArray: (value: string[]) => void;
  setConsequencesArray: (value: string[]) => void;
};

const HEIGHT = 300;

function ABCData({
  antecedentsArray,
  behaviorsArray,
  consequencesArray,
  setAntecedentsArray,
  setBehaviorsArray,
  setConsequencesArray,
}: Props) {
  const antecedents = useRecoilValue(antecedentsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const consequences = useRecoilValue(consequencesAtom);
  const handleAntecedentClick = (id: string) => {
    const tempArray = [...antecedentsArray];
    if (tempArray.includes(id)) {
      tempArray.splice(tempArray.indexOf(id), 1);
    } else {
      tempArray.push(id);
    }
    setAntecedentsArray(tempArray);
  };

  const handleBehaviorClick = (id: string) => {
    const tempArray = [...behaviorsArray];
    if (tempArray.includes(id)) {
      tempArray.splice(tempArray.indexOf(id), 1);
    } else {
      tempArray.push(id);
    }
    setBehaviorsArray(tempArray);
  };

  const handleConsequenceClick = (id: string) => {
    const tempArray = [...consequencesArray];
    if (tempArray.includes(id)) {
      tempArray.splice(tempArray.indexOf(id), 1);
    } else {
      tempArray.push(id);
    }
    setConsequencesArray(tempArray);
  };
  return (
    <>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="h4">ABC</Typography>
        <Divider />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#fff",
              pl: 2,
              pr: 2,
              pt: 1,
              height: HEIGHT,
              overflow: "scroll",
            }}
          >
            <Typography variant="h6">Antecedents</Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {antecedents &&
                antecedents.map((antecedent) => (
                  <Chip
                    key={antecedent.id}
                    label={antecedent.label}
                    sx={{ margin: 1 }}
                    clickable
                    onClick={() => handleAntecedentClick(antecedent.id)}
                    color={antecedentsArray.includes(antecedent.id) ? "primary" : "default"}
                  />
                ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#fff",
              pl: 2,
              pr: 2,
              pt: 1,
              height: HEIGHT,
              overflow: "scroll",
            }}
          >
            <Typography variant="h6">Behaviors</Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {behaviors &&
                behaviors.map((behavior) => (
                  <Chip
                    key={behavior.id}
                    label={behavior.label}
                    sx={{ margin: 1 }}
                    clickable
                    onClick={() => handleBehaviorClick(behavior.id)}
                    color={behaviorsArray.includes(behavior.id) ? "primary" : "default"}
                  />
                ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#fff",
              pl: 2,
              pr: 2,
              pt: 1,
              height: HEIGHT,
              overflow: "scroll",
            }}
          >
            <Typography variant="h6">Consequences</Typography>
            <Divider />
            <Box sx={{ mt: 1 }}>
              {consequences &&
                consequences.map((consequence) => (
                  <Chip
                    key={consequence.id}
                    label={consequence.label}
                    sx={{ margin: 1 }}
                    clickable
                    onClick={() => handleConsequenceClick(consequence.id)}
                    color={consequencesArray.includes(consequence.id) ? "primary" : "default"}
                  />
                ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ABCData;
