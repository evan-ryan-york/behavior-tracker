import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import useUploadImage from "../../hooks/useUploadImage";
import { ImageProps } from "../../types/types";

type Props = {
  open: boolean;
  setOpen: (prevValue: boolean) => void;
  existingImages: ImageProps[];
  col: string;
  id: string;
};

type Dimensions = {
  width: number | null;
  height: number | null;
};

type FormState = EventTarget & {
  name: string;
  value: string;
};

type ImageState = EventTarget & {
  files: File[];
};

const ImageUploadDialog = ({ open, setOpen, existingImages, col, id }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [imageDimensions, setImageDimensions] = useState<Dimensions>({ width: null, height: null });
  const [caption, setCaption] = useState("");
  const { uploadImage, isLoading } = useUploadImage();

  useEffect(() => {
    if (!image) return;
    const newURL: string = URL.createObjectURL(image);
    setImageURL(newURL);
    let img = new Image();
    img.src = newURL;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [image]);

  const handleChange = (event: React.SyntheticEvent) => {
    const formState = event.target as FormState;
    setCaption(formState.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await uploadImage({ col, id, existingImages, image, caption, imageDimensions });
    setOpen(false);
    setImage(null);
    setCaption("");
    setImageURL("");
  };

  const handleSelectImage = (event: React.SyntheticEvent) => {
    const ImageState = event.target as ImageState;
    setImage(ImageState.files[0]);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogTitle sx={{ fontSize: 44 }}>Edit Image</DialogTitle>
      <DialogContent>
        {image && (
          <Box sx={{ maxWidth: "80VW", textAlign: "center" }}>
            <img
              src={imageURL}
              alt="uploaded for user"
              style={{ maxWidth: "100%", maxHeight: "70VH" }}
            />
          </Box>
        )}
        <Button variant="contained" component="label" fullWidth sx={{ mt: 2, mb: 2 }}>
          {image ? "Change Image" : "Upload Image"}
          <input hidden accept="image/*" type="file" onChange={handleSelectImage} />
        </Button>
        <DialogContentText>Caption:</DialogContentText>
        <TextField
          autoFocus
          name="caption"
          type="text"
          required
          fullWidth
          multiline
          value={caption}
          variant="outlined"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Submit</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ImageUploadDialog);
