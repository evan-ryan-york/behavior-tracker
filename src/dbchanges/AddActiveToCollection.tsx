import { useState } from "react";
import { db } from "../firebase";
import { Button, Select, MenuItem, Box, Typography, SelectChangeEvent } from "@mui/material";
import { doc, getDocs, collection, updateDoc } from "firebase/firestore";
import { COLLECTIONS } from "../libraries/objects";

const AddActiveToCollection = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>("none");

  const addActive = async () => {
    if (selectedCollection === "none") return;
    const ref = collection(db, selectedCollection);
    const snapshot = await getDocs(ref);
    snapshot.forEach((row) => {
      const docRef = doc(db, selectedCollection, row.id);
      if (row.data().active !== false) {
        updateDoc(docRef, { active: true });
      }
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCollection(event.target.value);
  };

  return (
    <>
      <Box sx={{ margin: 4 }}>
        <Typography variant="h5">
          Select a Collection From the Dropdown to add active to all documents in the collection
        </Typography>
        <Button sx={{ mr: 2 }} onClick={addActive} variant="contained">
          Add Active to Collection
        </Button>
        <Select value={selectedCollection} onChange={handleChange}>
          <MenuItem value="none">None</MenuItem>
          {COLLECTIONS.map((collection) => (
            <MenuItem key={collection} value={collection}>
              {collection}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default AddActiveToCollection;
