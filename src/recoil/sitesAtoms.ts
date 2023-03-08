import { atom, selector, GetRecoilValue } from "recoil";
import { Site, SiteRecord } from "../types/types";
import { BLANK_SITE_FORM } from "../libraries/blankForms";
import { loggedInStaffAtom } from "./staffAtoms";

export const sitesObjectGetter = ({ get }: { get: GetRecoilValue }) => {
  const sites = get(sitesAtom);
  if (!sites) return null;
  const tempObj: { [key: string]: SiteRecord } = {};
  sites.forEach((site) => {
    tempObj[site.id] = site;
  });
  return tempObj;
};

export const availableSitesGetter = ({ get }: { get: GetRecoilValue }) => {
  const sites = get(sitesAtom);
  const loggedInStaff = get(loggedInStaffAtom);
  if (!sites || !loggedInStaff) return null;
  return sites.filter((site) => loggedInStaff.siteIds.includes(site.id));
};

export const availableSitesAtom = selector({
  key: "availableSites",
  get: availableSitesGetter,
});

export const sitesAtom = atom<SiteRecord[]>({
  key: "sites",
  default: [],
});

export const selectedSiteIdAtom = atom({
  key: "selectedSiteId",
  default: "",
});

export const siteFormAtom = atom<Site | SiteRecord>({
  key: "siteForm",
  default: BLANK_SITE_FORM,
});

export const sitesResetAtom = atom({
  key: "sitesReset",
  default: false,
});

export const sitesObjAtom = selector({
  key: "sitesObj",
  get: sitesObjectGetter,
});
