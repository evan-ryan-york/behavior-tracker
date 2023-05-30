import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Typography,
  Card,
  Grid,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
} from "@mui/material";
import ReactQuill from "react-quill";
import "quill-paste-smart";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { toolbarOptions } from "../../libraries/objects";
import { BehaviorPlan, ReplacementBehaviorRecord, StrategyRecord } from "../../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManageRichText from "./ManageRichText";
import DeleteConfirmation from "./DeleteConfirmation";
import Antecedents from "./Antecedents";
import { useRecoilValue } from "recoil";
import { strategiesAtom } from "../../recoil/strategiesAtoms";
import StrategyPreview from "./StrategyPreview";
import ReplacementBehaviorsPreview from "./ReplacementBehaviorsPreview";
import { replacementBehaviorsAtom } from "../../recoil/replacementBehaviorsAtoms";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
};

function ReplacementBehaviors({ planForm, setPlanForm }: Props) {
  const [text, setText] = useState<ReactQuill.Value>("");
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const replacementBehaviors = useRecoilValue(replacementBehaviorsAtom);
  const [filteredReplacementBehaviors, setFilteredReplacementBehaviors] = useState<
    ReplacementBehaviorRecord[]
  >([]);

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [indexToEdit, setIndexToEdit] = useState<number | undefined>(undefined);
  const [indexToDelete, setIndexToDelete] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log(replacementBehaviors);
    setFilteredReplacementBehaviors(replacementBehaviors);
  }, [replacementBehaviors]);

  const handleTextChange = useCallback((newValue: ReactQuill.Value) => {
    setText(newValue);
    if (Number(newValue.length) > 7 && newValue !== "<p><br></p>") {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, []);

  const handleAddStrategy = () => {
    const newArray = [...planForm.replacementBehaviors];
    newArray.push(text);
    setText("");
    setPlanForm((pV) => ({ ...pV, replacementBehaviors: newArray }));
  };

  const handleEditClick = (index: number) => {
    setIndexToEdit(index);
    setManageOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setIndexToDelete(index);
    setDeleteOpen(true);
  };

  const handlePreviewClick = () => {
    setPreviewOpen(true);
    console.log("Preview Open");
  };
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">What replacement behavior do you want to teach?</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick={handlePreviewClick} fullWidth>
            Select From Library
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            onClick={handleAddStrategy}
            sx={{ height: "100%" }}
            variant="outlined"
            fullWidth
            color="secondary"
            disabled={submitButtonDisabled}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <ReactQuill
            theme="snow"
            value={text}
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
        <Grid item xs={12}>
          {planForm &&
            planForm.replacementBehaviors.map((replacementBehavior, index) => (
              <Card sx={{ padding: 2, mt: 2 }} key={`prventionStrategy${index}`}>
                <CardHeader
                  action={
                    <>
                      <IconButton onClick={() => handleEditClick(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(index)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </>
                  }
                  title={`Replacement Behavior ${index + 1}`}
                />
                <CardContent>{parse(replacementBehavior as string)}</CardContent>
              </Card>
            ))}
        </Grid>
      </Grid>
      {indexToEdit !== undefined && (
        <ManageRichText
          index={indexToEdit}
          setPlanForm={setPlanForm}
          open={manageOpen}
          setOpen={setManageOpen}
          arrayOfOptions={planForm.replacementBehaviors}
          key="replacementBehaviors"
        />
      )}
      {indexToDelete !== undefined && (
        <DeleteConfirmation
          index={indexToDelete}
          setPlanForm={setPlanForm}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          arrayOfOptions={planForm.replacementBehaviors}
          key="replacementBehaviors"
        />
      )}
      <ReplacementBehaviorsPreview
        open={previewOpen}
        setOpen={setPreviewOpen}
        filteredReplacementBehaviors={filteredReplacementBehaviors}
        planForm={planForm}
        setPlanForm={setPlanForm}
        setText={setText}
      />
      <Divider sx={{ mt: 4, borderWidth: 2 }} />
    </>
  );
}

export default ReplacementBehaviors;
