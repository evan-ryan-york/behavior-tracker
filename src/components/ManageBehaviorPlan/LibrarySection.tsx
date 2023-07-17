import React, { useState, useCallback } from "react";
import { Button, Typography, Grid, Divider } from "@mui/material";
import ReactQuill from "react-quill";
import "quill-paste-smart";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../libraries/objects";
import { useRecoilState, useRecoilValue } from "recoil";
import { behaviorPlanFormAtom } from "../../recoil/behaviorPlansAtoms";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import LibrarySelectDialog from "./LibrarySelectDialog";
import { LibraryItemRecord } from "../../types/types";
import LibraryItemDisplay from "./LibraryItemDisplay";

type Props = {
  title: string;
  libraryItems: LibraryItemRecord[];
  library:
    | "replacementBehaviors"
    | "preventionStrategies"
    | "reinforcementStrategies"
    | "extinguishStrategies";
};

const LibrarySection = ({ title, library, libraryItems }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [planForm, setPlanForm] = useRecoilState(behaviorPlanFormAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const notesKey = `${library}Notes`;

  const handleTextChange = useCallback(
    (newValue: ReactQuill.Value) => {
      setPlanForm((pV) => ({ ...pV, [notesKey]: newValue }));
    },
    [notesKey, setPlanForm]
  );

  const handlePreviewClick = () => {
    setPreviewOpen(true);
  };
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" onClick={handlePreviewClick} fullWidth>
            Select From Library
          </Button>
        </Grid>

        {planForm &&
          planForm[library].map((libraryItemId) => (
            <Grid item xs={12} sm={6} md={4}>
              <LibraryItemDisplay libraryItemId={libraryItemId} library={library} />
            </Grid>
          ))}

        <Grid item xs={12} sm={12}>
          <Typography variant="h6">
            {`Share specific notes about how these ${
              library === "replacementBehaviors" ? "replacement behaviors" : "strategies"
            } will relate to`}
            {selectedStudent?.firstName ?? "the student"}:
          </Typography>
          <ReactQuill
            theme="snow"
            value={planForm[`${library}Notes`]}
            onChange={handleTextChange}
            modules={{
              toolbar: toolbarOptions,
              clipboard: {
                allowed: {
                  tags: ["a", "u", "s", "i", "p", "br", "ul", "ol", "li", "span"],
                  attributes: ["href"],
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <LibrarySelectDialog
        open={previewOpen}
        setOpen={setPreviewOpen}
        libraryItems={libraryItems}
        library={library}
      />
      <Divider sx={{ mt: 4, borderWidth: 2 }} />
    </>
  );
};

export default LibrarySection;
