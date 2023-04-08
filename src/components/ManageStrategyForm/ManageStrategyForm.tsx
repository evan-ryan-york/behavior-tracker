import { useCallback } from "react";
import { MenuItem, Select, TextField, Typography, SelectChangeEvent } from "@mui/material";
import ReactQuill from "react-quill";
import "quill-paste-smart";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../libraries/objects";
import { useRecoilState } from "recoil";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
import AntecedentsSelect from "./AntecedentsSelect";
import ConsequencesSelect from "./ConsequencesSelect";
import TargetBehaviorsSelect from "./TargetBehaviorsSelect";
import ReplacementBehaviorsSelect from "./ReplacementBehaviorsSelect";

function ManageStrategyForm() {
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);

  const handleHTMLChange = useCallback(
    (newValue: ReactQuill.Value) => {
      setStrategyForm((pV) => ({ ...pV, content: newValue }));
    },
    [setStrategyForm]
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategyForm((pV) => ({ ...pV, label: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const type = event.target.value as "PREVENTION" | "EXTINGUISH" | "REINFORCE";
    setStrategyForm((pV) => ({ ...pV, type: type }));
  };

  return (
    <>
      <Typography variant="h6">Strategy Title</Typography>
      <TextField fullWidth value={strategyForm.title} onChange={handleTextChange} />
      <Typography variant="h6">Strategy Type</Typography>
      <Select fullWidth value={strategyForm.type} onChange={handleSelectChange}>
        <MenuItem value="PREVENTION">Prevent Target Behavior</MenuItem>
        <MenuItem value="EXTINGUISH">Extinguish Target Behavior</MenuItem>
        <MenuItem value="REINFORCE">Celebrate Replacement Behavior</MenuItem>
      </Select>
      <AntecedentsSelect />
      <ConsequencesSelect />
      <TargetBehaviorsSelect />
      <ReplacementBehaviorsSelect />
      <Typography variant="h6">Strategy Description</Typography>
      <ReactQuill
        theme="snow"
        style={{ marginTop: "16px" }}
        value={strategyForm.content}
        onChange={handleHTMLChange}
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
    </>
  );
}

export default ManageStrategyForm;
