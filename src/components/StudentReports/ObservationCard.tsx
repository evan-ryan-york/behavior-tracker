import { useState } from "react";
import { ObservationRecord } from "../../types/types";
import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { staffObjAtom } from "../../recoil/staffAtoms";
import { antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Timestamp } from "firebase/firestore";
import NoteCard from "./NoteCard";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../shared/DeleteDialog";
import { observationsResetAtom } from "../../recoil/observationAtoms";
import { periodsObjAtom } from "../../recoil/periodsAtoms";

type Props = {
  observation: ObservationRecord;
};

function ObservationCard({ observation }: Props) {
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const staffObj = useRecoilValue(staffObjAtom);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const setObservationsReset = useSetRecoilState(observationsResetAtom);
  const periodsObj = useRecoilValue(periodsObjAtom);

  const renderTimestamp = (timestamp: Timestamp | null) => {
    if (!timestamp) return;
    const toDate = new Date(timestamp.toMillis());
    return `${toDate.toLocaleDateString()} ${toDate.toLocaleTimeString()}`;
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  return (
    <>
      <Paper sx={{ padding: 2, mt: 2, backgroundColor: "#fcfcfc" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {staffObj && (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography component="span" variant="h6">{`${
                      staffObj[observation.authorId].firstName
                    } ${staffObj[observation.authorId].lastName} - `}</Typography>
                    <Typography component="span">
                      {renderTimestamp(observation.createdAt)}
                    </Typography>
                  </Box>
                  <DeleteIcon onClick={handleDeleteOpen} sx={{ cursor: "pointer" }} />
                </Box>
              </>
            )}
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            {antecedentsObj && (
              <Box>
                <Typography component="span">
                  <b>Antecedent: </b>
                </Typography>
                {observation.antecedents.map((antecedentId) => (
                  <span key={antecedentId}>
                    {antecedentsObj[antecedentId] && (
                      <Chip
                        key={antecedentId}
                        label={antecedentsObj[antecedentId].label}
                        sx={{ margin: 1, fontSize: 11 }}
                        color="primary"
                      />
                    )}
                  </span>
                ))}
              </Box>
            )}
            {behaviorsObj && (
              <Box>
                <Typography component="span">
                  <b>Behaviors: </b>
                </Typography>
                {observation.behaviors.map((behaviorId) => (
                  <span key={behaviorId}>
                    {behaviorsObj[behaviorId] && (
                      <Chip
                        key={behaviorId}
                        label={behaviorsObj[behaviorId].label}
                        sx={{ margin: 1, fontSize: 11 }}
                        color="primary"
                      />
                    )}
                  </span>
                ))}
              </Box>
            )}
            {consequencesObj && (
              <Box>
                <Typography component="span">
                  <b>Consequence: </b>
                </Typography>
                {observation.consequences.map((consequenceId) => (
                  <span key={consequenceId}>
                    {consequencesObj[consequenceId] && (
                      <Chip
                        key={consequenceId}
                        label={consequencesObj[consequenceId].label}
                        sx={{ margin: 1, fontSize: 11 }}
                        color="primary"
                      />
                    )}
                  </span>
                ))}
              </Box>
            )}
            <Box>
              <Typography component="span">
                <b>Duration: </b>
              </Typography>
              <Typography component="span">{observation.duration}</Typography>
            </Box>
            <Box>
              <Typography component="span">
                <b>Intensity: </b>
              </Typography>
              <Typography component="span">{observation.intensity}</Typography>
            </Box>
            {periodsObj && (
              <Box>
                <Typography component="span">
                  <b>Part of Day: </b>
                </Typography>
                <Typography component="span">{periodsObj[observation.periodId]?.name}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6">Notes</Typography>
            <Box sx={{ overflow: "scroll", maxHeight: "200px" }}>
              {observation.notes.map((note) => (
                <NoteCard note={note} key={note.createdAt.toString()} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        message={"Are you sure you want to delete this Observation? This can not be undone."}
        collection="observations"
        id={observation.id}
        setReset={setObservationsReset}
      />
    </>
  );
}

export default ObservationCard;
