import parse from "html-react-parser";
import { Box, Checkbox, Chip, FormControlLabel, Typography } from "@mui/material";
import { FUNCTIONS_OF_BEHAVIOR, FUNCTION_COLORS } from "../../libraries/objects";
import { LibraryItemRecord } from "../../types/types";
import { useRecoilState } from "recoil";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";

type Props = {
  libraryItem: LibraryItemRecord;
  library:
    | "replacementBehaviors"
    | "preventionStrategies"
    | "reinforcementStrategies"
    | "extinguishStrategies";
};

const LibraryItemCard = ({ libraryItem, library }: Props) => {
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);

  const handleChange = () => {
    setPlanForm((pV) => {
      if (pV[library].includes(libraryItem.id)) {
        console.log(pV[library]);
        return {
          ...pV,
          [library]: pV[library].filter((item) => item !== libraryItem.id),
        };
      } else {
        return {
          ...pV,
          [library]: [...pV[library], libraryItem.id],
        };
      }
    });
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          m: 1,
          borderRadius: 2,
          pl: 1,
          pr: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChange}
              checked={planForm[library].includes(libraryItem.id)}
              sx={{
                mr: 1,
                "& .MuiSvgIcon-root": { fontSize: 32 },
              }}
            />
          }
          label={
            <>
              <Typography component={"span"}>{parse(libraryItem.content.toString())}</Typography>

              {libraryItem.functionsOfBehavior.includes(FUNCTIONS_OF_BEHAVIOR.ATTENTION) && (
                <Chip
                  label="AT"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ATTENTION],
                    color: "#FFFFFF",
                    mr: 1,
                    mb: 2,
                  }}
                ></Chip>
              )}
              {libraryItem.functionsOfBehavior.includes(FUNCTIONS_OF_BEHAVIOR.ACCESS) && (
                <Chip
                  label="AC"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ACCESS],
                    color: "#FFFFFF",
                    mr: 1,
                    mb: 2,
                  }}
                ></Chip>
              )}
              {libraryItem.functionsOfBehavior.includes(FUNCTIONS_OF_BEHAVIOR.ESCAPE) && (
                <Chip
                  label="ES"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.ESCAPE],
                    color: "#FFFFFF",
                    mr: 1,
                    mb: 2,
                  }}
                ></Chip>
              )}
              {libraryItem.functionsOfBehavior.includes(FUNCTIONS_OF_BEHAVIOR.SENSORY) && (
                <Chip
                  label="SE"
                  sx={{
                    backgroundColor: FUNCTION_COLORS[FUNCTIONS_OF_BEHAVIOR.SENSORY],
                    color: "#FFFFFF",
                    mb: 2,
                  }}
                ></Chip>
              )}
            </>
          }
        />
      </Box>
    </>
  );
};

export default LibraryItemCard;
