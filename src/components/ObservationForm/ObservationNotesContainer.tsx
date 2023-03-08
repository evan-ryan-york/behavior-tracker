import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import ObservationNote from "./ObservationNote";
import { Note } from "../../types/types";
import { useRecoilValue } from "recoil";
import { Timestamp } from "firebase/firestore";

type Props = {
  notesArray: Note[];
  setNotesArray: (value: Note[]) => void;
};

function ObservationNotesContainer({ notesArray, setNotesArray }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!loggedInStaff) return;
    const tempNotes = [...notesArray];
    tempNotes.push({
      text: text,
      authorId: loggedInStaff.id,
      createdAt: Timestamp.now(),
      order: notesArray.length,
    });
    setNotesArray(tempNotes);
    setText("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Observation Notes
        </Typography>
        <Box
          sx={{
            mt: 1,
            mb: 1,
            borderRadius: 1,
            padding: 1,
            maxHeight: 200,
            overflow: "scroll",
          }}
        >
          {notesArray &&
            notesArray.map((note, index) => (
              <ObservationNote key={`${note.text}${index}`} note={note} />
            ))}
        </Box>
        <TextField
          multiline
          rows={2}
          fullWidth
          sx={{ mt: 2, backgroundColor: "#fafafa" }}
          value={text}
          onChange={handleChange}
        />
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit}>
          Add Note
        </Button>
      </Box>
    </>
  );
}

export default ObservationNotesContainer;
