import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { LibraryItemRecord, LirbraryItemLists, StudentRecord } from "../../types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { FUNCTIONS_OF_BEHAVIOR, FUNCTION_COLORS } from "../../libraries/objects";
import ShowPrimaryFunctionOfBehavior from "./ShowPrimaryFunctionOfBehavior";
import { behaviorPlanFormAtom, functionsWithCountAtom } from "../../recoil/behaviorPlansAtoms";
import { ChangeEvent, useEffect, useState } from "react";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { selectFunctionsForFilter } from "../../libraries/functions";
import LibraryItemCard from "./LibraryItemCard";

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
  libraryItems: LibraryItemRecord[];
  library:
    | "replacementBehaviors"
    | "preventionStrategies"
    | "reinforcementStrategies"
    | "extinguishStrategies";
};

const allFunctions = [
  FUNCTIONS_OF_BEHAVIOR.ATTENTION,
  FUNCTIONS_OF_BEHAVIOR.ACCESS,
  FUNCTIONS_OF_BEHAVIOR.ESCAPE,
  FUNCTIONS_OF_BEHAVIOR.SENSORY,
];

const generateMessage = (library: string, selectedStudent: StudentRecord | null) => {
  switch (library) {
    case "replacementBehaviors":
      return `To support ${
        selectedStudent?.firstName ?? "the student"
      } in their behavior skills, the teacher will
        teach the following replacement behaviors which are appropriate behaviors:`;
  }
};

const generateTitle = (library: string) => {
  switch (library) {
    case "replacementBehaviors":
      return `Select Replacement Behaviors`;
    case "preventionStrategies":
      return `Select Prevention Strategies`;
    case "reinforcementStrategies":
      return `Select Reinforcement Strategies`;
    case "extinguishStrategies":
      return `Select Extinguish Strategies`;
  }
};

const LibrarySelectDialog = ({ open, setOpen, libraryItems, library }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  const functionsWithCount = useRecoilValue(functionsWithCountAtom);
  const [filteredLists, setFilteredLists] = useState<LirbraryItemLists>({
    listOne: [],
    listTwo: [],
  });
  const [filter, setFilter] = useState<string[]>(allFunctions);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (checked) {
      setFilter((pV) => [...pV, name]);
    } else {
      setFilter((pV) => pV.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const length = functionsWithCount.length;
    setFilter(selectFunctionsForFilter(length, functionsWithCount));
  }, [functionsWithCount]);

  useEffect(() => {
    if (!libraryItems) return;
    const tempFilteredReplacementBehaviors = libraryItems.filter((libraryItem) => {
      return libraryItem.functionsOfBehavior.some((functionOfBehavior) =>
        filter.includes(functionOfBehavior)
      );
    });
    const length = tempFilteredReplacementBehaviors.length;
    if (length > 20) {
      const listOne = tempFilteredReplacementBehaviors.slice(0, length / 2);
      const listTwo = tempFilteredReplacementBehaviors.slice(length / 2);
      setFilteredLists({ listOne, listTwo });
    } else {
      setFilteredLists({ listOne: tempFilteredReplacementBehaviors, listTwo: [] });
    }
  }, [filter, libraryItems]);
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>
          {generateTitle(library)}
        </DialogTitle>
        <DialogContent sx={{ pl: 3, pr: 3 }}>
          <Box>
            {functionsWithCount.length > 0 && (
              <ShowPrimaryFunctionOfBehavior
                setPlanForm={setPlanForm}
                behaviorId={planForm.targetBehavior}
                align="center"
              />
            )}
            <Typography textAlign={"center"} variant="h4" sx={{ mt: 1 }}>
              Filter By Function Of Behavior
            </Typography>
            <Grid container sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleFilterChange}
                      checked={filter.includes(FUNCTIONS_OF_BEHAVIOR.ATTENTION)}
                      name={FUNCTIONS_OF_BEHAVIOR.ATTENTION}
                    />
                  }
                  label={FUNCTIONS_OF_BEHAVIOR.ATTENTION}
                />
                <Chip
                  label="AT"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ATTENTION],
                    color: "#FFFFFF",
                  }}
                ></Chip>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleFilterChange}
                      checked={filter.includes(FUNCTIONS_OF_BEHAVIOR.ACCESS)}
                      name={FUNCTIONS_OF_BEHAVIOR.ACCESS}
                    />
                  }
                  label={FUNCTIONS_OF_BEHAVIOR.ACCESS}
                />
                <Chip
                  label="AC"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ACCESS],
                    color: "#FFFFFF",
                  }}
                ></Chip>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleFilterChange}
                      checked={filter.includes(FUNCTIONS_OF_BEHAVIOR.ESCAPE)}
                      name={FUNCTIONS_OF_BEHAVIOR.ESCAPE}
                    />
                  }
                  label={FUNCTIONS_OF_BEHAVIOR.ESCAPE}
                />
                <Chip
                  label="ES"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ESCAPE],
                    color: "#FFFFFF",
                  }}
                ></Chip>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleFilterChange}
                      checked={filter.includes(FUNCTIONS_OF_BEHAVIOR.SENSORY)}
                      name={FUNCTIONS_OF_BEHAVIOR.SENSORY}
                    />
                  }
                  label={FUNCTIONS_OF_BEHAVIOR.SENSORY}
                />
                <Chip
                  label="SE"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.SENSORY],
                    color: "#FFFFFF",
                  }}
                ></Chip>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography textAlign={"center"}>
              {generateMessage(library, selectedStudent)}
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: "#efefef",
              pl: 2,
              pr: 2,
              pb: 2,
              pt: 2,
              height: "50VH",
              overflow: "scroll",
            }}
          >
            <Grid container>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={6}>
                {filteredLists.listOne.map((libraryItem) => (
                  <LibraryItemCard
                    key={libraryItem.id}
                    libraryItem={libraryItem}
                    library={library}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                {filteredLists.listTwo.map((libraryItem) => (
                  <LibraryItemCard
                    key={libraryItem.id}
                    libraryItem={libraryItem}
                    library={library}
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LibrarySelectDialog;
