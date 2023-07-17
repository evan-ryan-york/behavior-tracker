import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";
import { Box, Typography } from "@mui/material";
import parse from "html-react-parser";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { strategiesAtom } from "../../recoil/strategiesAtoms";
import { LibraryItemRecord } from "../../types/types";

type Props = {
  libraryItemId: string;
  library:
    | "replacementBehaviors"
    | "preventionStrategies"
    | "reinforcementStrategies"
    | "extinguishStrategies";
};

const LibraryItemDisplay = ({ libraryItemId, library }: Props) => {
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const strategies = useRecoilValue(strategiesAtom);
  const [libraryItem, setLibraryItem] = useState<LibraryItemRecord | null>(null);

  useEffect(() => {
    if (library === "replacementBehaviors") {
      const replacementBehavior = replacementBehaviors.find(
        (replacementBehavior) => replacementBehavior.id === libraryItemId
      );
      setLibraryItem(replacementBehavior || null);
    } else {
      const strategy = strategies.find((strategy) => strategy.id === libraryItemId);
      setLibraryItem(strategy || null);
    }
  }, [replacementBehaviors, strategies, libraryItemId, library]);

  return (
    <>
      {libraryItem && (
        <Box
          sx={{
            padding: 1,
            minHeight: 50,
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            borderRadius: 1,
            border: "1px solid #ccc",
            backgroundColor: "#fcfcfc",
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: "primary" }} />
          <Typography className="strippedTag">{parse(libraryItem.content as string)}</Typography>
        </Box>
      )}
    </>
  );
};

export default LibraryItemDisplay;
