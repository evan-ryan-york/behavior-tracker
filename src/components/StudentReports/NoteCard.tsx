import { Notes } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { Note } from "../../types/types";

type Props = {
  note: Note;
};

function NoteCard({ note }: Props) {
  return (
    <>
      <Paper sx={{ mt: 1, padding: 1 }}>
        <Typography>{note.text}</Typography>
      </Paper>
    </>
  );
}

export default NoteCard;
