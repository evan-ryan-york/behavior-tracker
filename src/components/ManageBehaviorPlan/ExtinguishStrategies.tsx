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
import { BehaviorPlan, StrategyRecord } from "../../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManageRichText from "./ManageRichText";
import DeleteConfirmation from "./DeleteConfirmation";
import { useRecoilValue } from "recoil";
import { strategiesAtom } from "../../recoil/strategiesAtoms";
import StrategyPreview from "./StrategyPreview";

type SetterFunction = (pV: BehaviorPlan) => BehaviorPlan;

type Props = {
  planForm: BehaviorPlan;
  setPlanForm: (pV: SetterFunction) => void;
};

function ExtinguishStrategies({ planForm, setPlanForm }: Props) {
  const [text, setText] = useState<ReactQuill.Value>("");
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filteredStrategies, setFilteredStrategies] = useState<StrategyRecord[]>([]);
  const strategies = useRecoilValue(strategiesAtom);
  const [indexToEdit, setIndexToEdit] = useState<number | undefined>(undefined);
  const [indexToDelete, setIndexToDelete] = useState<number | undefined>(undefined);
  const handleTextChange = useCallback((newValue: ReactQuill.Value) => {
    setText(newValue);
  }, []);

  useEffect(() => {
    setFilteredStrategies(strategies.filter((strategy) => strategy.type === "EXTINGUISH"));
  }, [strategies]);

  const handleAddStrategy = () => {
    const newArray = [...planForm.extinguishStrategies];
    newArray.push(text);
    setText("");
    setPlanForm((pV) => ({ ...pV, extinguishStrategies: newArray }));
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
  };
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Strategies to Respond to Target Behavior</Typography>
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
            planForm.extinguishStrategies.map((extinguishStrategy, index) => (
              <Card sx={{ padding: 2, mt: 2 }} key={`extinguishStrategy${index}`}>
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
                  title={`Extinguish Strategy ${index + 1}`}
                />
                <CardContent>{parse(extinguishStrategy as string)}</CardContent>
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
          arrayOfOptions={planForm.extinguishStrategies}
          key="extinguishStrategies"
        />
      )}
      {indexToDelete !== undefined && (
        <DeleteConfirmation
          index={indexToDelete}
          setPlanForm={setPlanForm}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          arrayOfOptions={planForm.extinguishStrategies}
          key="extinguishStrategies"
        />
      )}
      <StrategyPreview
        open={previewOpen}
        setOpen={setPreviewOpen}
        filteredStrategies={filteredStrategies}
        planForm={planForm}
        setPlanForm={setPlanForm}
        type="extinguishStrategies"
        setText={setText}
      />
      <Divider sx={{ mt: 4, borderWidth: 2 }} />
    </>
  );
}

export default ExtinguishStrategies;
