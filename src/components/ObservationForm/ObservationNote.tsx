import { Typography, Paper, Box } from "@mui/material";
import { Note } from "../../types/types";
import { useRecoilValue } from "recoil";
import { staffObjAtom } from "../../recoil/staffAtoms";

type Props = {
  note: Note;
};

function ObservationNote({ note }: Props) {
  const staffObj = useRecoilValue(staffObjAtom);
  const date = new Date(note.createdAt.toMillis());
  const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  return (
    <>
      {staffObj && (
        <Paper sx={{ padding: 1, mt: 1, mb: 1 }}>
          <Box>
            <Typography component="span" sx={{fontSize: 12}}>
              <b>{`${staffObj[note.authorId].firstName} ${staffObj[note.authorId].lastName}`}</b>
            </Typography>
            <Typography variant="body2" component="span" sx={{fontSize: 10}}>
              {` - ${formattedDate}`}
            </Typography>
          </Box>
          <Typography sx={{fontSize: 14}}>{note.text}</Typography>
        </Paper>
      )}
    </>
  );
}

export default ObservationNote;
