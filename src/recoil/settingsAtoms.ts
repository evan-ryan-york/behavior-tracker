import { atom, selector, GetRecoilValue } from "recoil";
import { Setting, SettingRecord } from "../types/types";
import { BLANK_SETTING_FORM } from "../libraries/blankForms";

export const settingsObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const settings = get(settingsAtom);
  if (!settings) return null;
  const tempObj: { [key: string]: SettingRecord } = {};
  settings.forEach((setting) => {
    tempObj[setting.id] = setting;
  });
  return tempObj;
};

export const settingsAtom = atom<SettingRecord[]>({
  key: "settings",
  default: [],
});

export const settingFormAtom = atom<Setting | SettingRecord>({
  key: "settingForm",
  default: BLANK_SETTING_FORM,
});

export const settingsResetAtom = atom({
  key: "settingsReset",
  default: false,
});

export const settingsObjAtom = selector({
  key: "settingsObj",
  get: settingsObjectGetter,
});
