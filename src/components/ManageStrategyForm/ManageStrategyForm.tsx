import { useCallback } from "react";
import { MenuItem, Select, TextField, Typography, SelectChangeEvent } from "@mui/material";
import ReactQuill from "react-quill";
import "quill-paste-smart";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../libraries/objects";
import { useRecoilState } from "recoil";
import { strategyFormAtom } from "../../recoil/strategiesAtoms";
// import AntecedentsSelect from "./AntecedentsSelect";
// import ConsequencesSelect from "./ConsequencesSelect";
import ReplacementBehaviorsSelect from "./ReplacementBehaviorsSelect";
import TargetBehaviorsSelect from "./TargetBehaviorsSelect";
import FunctionOfBehaviorSelect from "./FunctionOfBehaviorSelect";

function ManageStrategyForm() {
  const [strategyForm, setStrategyForm] = useRecoilState(strategyFormAtom);

  const handleContentChange = useCallback(
    (newValue: ReactQuill.Value) => {
      setStrategyForm((pV) => ({ ...pV, content: newValue }));
    },
    [setStrategyForm]
  );

  const handleToolTipChange = useCallback(
    (newValue: ReactQuill.Value) => {
      setStrategyForm((pV) => ({ ...pV, toolTip: newValue }));
    },
    [setStrategyForm]
  );

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategyForm((pV) => ({ ...pV, title: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const type = event.target.value as "PREVENTION" | "EXTINGUISH" | "REINFORCE";
    setStrategyForm((pV) => ({ ...pV, type: type }));
  };

  return (
    <>
      <Typography variant="h6">Strategy Title</Typography>
      <TextField fullWidth value={strategyForm.title} onChange={handleTextChange} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Strategy Description
      </Typography>
      <ReactQuill
        theme="snow"
        style={{ marginTop: "8px" }}
        value={strategyForm.content}
        onChange={handleContentChange}
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
      <Typography variant="h6" sx={{ mt: 2 }}>
        Strategy Type
      </Typography>
      <Select sx={{ mt: 1 }} fullWidth value={strategyForm.type} onChange={handleSelectChange}>
        <MenuItem value="PREVENTION">Prevent Target Behavior</MenuItem>
        <MenuItem value="EXTINGUISH">Extinguish (Negative Reinforcement) Target Behavior</MenuItem>
        <MenuItem value="REINFORCE">
          Celebrate (Positive Reinforcement) Replacement Behavior
        </MenuItem>
      </Select>
      {/* <AntecedentsSelect />
      <ConsequencesSelect /> */}
      {strategyForm.type === "REINFORCE" ? (
        <ReplacementBehaviorsSelect />
      ) : (
        <TargetBehaviorsSelect />
      )}
      <FunctionOfBehaviorSelect />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Suggestions for When to Use
      </Typography>
      <ReactQuill
        theme="snow"
        style={{ marginTop: "8px" }}
        value={strategyForm.toolTip}
        onChange={handleToolTipChange}
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
