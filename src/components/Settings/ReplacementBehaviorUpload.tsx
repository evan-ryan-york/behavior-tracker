import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import useAddDoc from "../../hooks/useAddDoc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { replacementBehaviorsResetAtom } from "../../recoil/replacementBehaviorsAtoms";
import Papa from "papaparse";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { organizationAtom } from "../../recoil/organizationAtoms";

type Error = {
  type: string;
  code: string;
  message: string;
  row: number;
};

type Column = {
  behavior: string;
  attention: string;
  escape: string;
  access: string;
  sensory: string;
};

type Result = {
  data: Column[];
  errors: Error[];
};

const ReplacementBehaviorUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { sendRequest: addDoc } = useAddDoc();
  const [last, setLast] = useState(false);
  const [uploadsCount, setUploadsCount] = useState<number>(0);
  const setReplacementBehaviorsReset = useSetRecoilState(replacementBehaviorsResetAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const organization = useRecoilValue(organizationAtom);

  useEffect(() => {
    if (!last || loading) {
      return;
    }
    setSuccessMessage(`${uploadsCount} Replacement Behaviors Uploaded`);
    setLoading(false);
    setSelectedFile(null);
    setReplacementBehaviorsReset((pV) => !pV);
  }, [last, loading, setReplacementBehaviorsReset, uploadsCount]);

  const parseData = async (value: Column, index: number) => {
    if (!organization) return;
    const functionsArray: string[] = [];
    if (value.attention.length > 0) {
      functionsArray.push(value.attention);
    }
    if (value.escape.length > 0) {
      functionsArray.push(value.escape);
    }
    if (value.access.length > 0) {
      functionsArray.push(value.access);
    }
    if (value.sensory.length > 0) {
      functionsArray.push(value.sensory);
    }
    const replacementBehavior = {
      content: `<p>${value.behavior}</p>`,
      order: index,
      targetBehaviorIds: behaviors.map((behavior) => behavior.id),
      functionsOfBehavior: functionsArray,
      organizationId: organization.id,
    };
    setLoading(true);
    await addDoc({ col: "replacementBehaviors", data: replacementBehavior });
    setUploadsCount((pV) => {
      return pV + 1;
    });
    setLoading(false);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    if (selectedFile && selectedFile.type === "text/csv") {
      Papa.parse(selectedFile, {
        complete: function (results: Result) {
          const length = results.data.length;
          results.data.forEach((value, index) => {
            if (length === index + 1) {
              setLast(true);
            }
            parseData(value, index);
          });
        },
        header: true,
      });
    }
  };
  return (
    <>
      <Box sx={{ textAlign: "center", pt: 3 }}>
        <Typography variant="h4">Or</Typography>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            m: 2,
            mb: 2,
          }}
        >
          <CircularProgress size={60} sx={{ mb: 2 }} />
        </Box>
      ) : (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          {successMessage && <Typography variant="h4">{successMessage}</Typography>}
          <input
            id="uploadFile"
            type="file"
            name="file"
            style={{ display: "none" }}
            onChange={changeHandler}
          />
          <label htmlFor="uploadFile">
            {" "}
            <Button variant="contained" sx={{ margin: 3 }} component="span">
              Choose File To Upload Behaviors
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            sx={{ margin: 3 }}
            onClick={() => {
              handleSubmission();
            }}
          >
            Submit
          </Button>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
        </Box>
      )}
    </>
  );
};

export default ReplacementBehaviorUpload;
