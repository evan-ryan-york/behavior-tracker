import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { StrategyRecord } from "../../types/types";
import parse from "html-react-parser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { staffObjAtom } from "../../recoil/staffAtoms";
import { Timestamp } from "firebase/firestore";
import { antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { replacementBehaviorsObjAtom } from "../../recoil/replacementBehaviorsAtoms";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";

type Props = {
  strategy: StrategyRecord;
  manageOpen: boolean;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string) => void;
};

const formatDate = (timestamp: Timestamp) => {
  const millis = timestamp.seconds * 1000;
  const date = new Date(millis).toLocaleDateString();
  const time = new Date(millis).toLocaleTimeString();
  return `${date} ${time}`;
};

function StrategyCard({ strategy, manageOpen, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const staffObj = useRecoilValue(staffObjAtom);
  const antecedentObj = useRecoilValue(antecedentsObjAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const setStrategyForm = useSetRecoilState(strategyFormAtom);
  const replacementBehaviorsObj = useRecoilValue(replacementBehaviorsObjAtom);
  const strategyType =
    strategy.type === "EXTINGUISH"
      ? "Extinguish Target Behavior Strategy"
      : strategy.type === "PREVENTION"
      ? "Proactively Prevent Target Behavior Strategy"
      : "Reinforce Replacement Behavior Strategy";

  const handleEdit = () => {
    setStrategyForm(strategy);
    setManageOpen(true);
  };

  const handleDelete = () => {
    setDeleteId(strategy.id);
    setDeleteOpen(true);
  };
  return (
    <Paper sx={{ mt: 2, mb: 2, padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        {staffObj && staffObj[strategy.authorId] && strategy.createdAt && (
          <Box>
            <Typography variant="h5">{strategyType}</Typography>
            <Typography component="span" variant="body2">
              <b>{` Created By: ${staffObj[strategy.authorId].firstName} ${
                staffObj[strategy.authorId].lastName
              }`}</b>
            </Typography>
            <Typography component="span" variant="body2">
              {` on ${formatDate(strategy.createdAt)}`}
            </Typography>
          </Box>
        )}
        <Box>
          <Button sx={{ mr: 2 }} variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h5">{strategy.title}</Typography>
        <Box>{parse(strategy.content as string)}</Box>
        {antecedentObj && strategy.antecedentIds.length > 0 && (
          <>
            <Typography variant="h6">Antecedents</Typography>
            <Divider />
            {strategy.antecedentIds.map((antecedentId) => (
              <Box component="span" key={antecedentId}>
                {antecedentObj[antecedentId] && (
                  <Chip
                    color="secondary"
                    label={antecedentObj[antecedentId].label}
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                  />
                )}
              </Box>
            ))}
          </>
        )}
        {consequencesObj && strategy.consequenceIds.length > 0 && (
          <>
            <Typography variant="h6">Consequences</Typography>
            <Divider />
            {strategy.consequenceIds.map((consequenceId) => (
              <Box component="span" key={consequenceId}>
                {consequencesObj[consequenceId] && (
                  <Chip
                    color="secondary"
                    label={consequencesObj[consequenceId].label}
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                  />
                )}
              </Box>
            ))}
          </>
        )}
        {strategy.functionsOfBehavior.length > 0 && (
          <>
            <Typography variant="h6">Functions Of Behavior</Typography>
            <Divider />
            {strategy.functionsOfBehavior.map((functionOfBehavior) => (
              <Box component="span" key={functionOfBehavior}>
                <Chip color="secondary" label={functionOfBehavior} sx={{ mt: 1, mb: 1, mr: 1 }} />
              </Box>
            ))}
          </>
        )}
        {behaviorsObj && strategy.targetBehaviorsIds.length > 0 && (
          <>
            <Typography variant="h6">Target Behaviors</Typography>
            <Divider />
            {strategy.targetBehaviorsIds.map((targetBehaviorId) => (
              <Box component="span" key={targetBehaviorId}>
                {behaviorsObj[targetBehaviorId] && (
                  <Chip
                    color="secondary"
                    label={behaviorsObj[targetBehaviorId].label}
                    sx={{ mt: 1, mb: 1, mr: 1 }}
                  />
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
}

export default StrategyCard;
