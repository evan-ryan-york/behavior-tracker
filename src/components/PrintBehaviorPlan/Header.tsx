import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Header() {
  const organization = useRecoilValue(organizationAtom);
  const storage = getStorage();
  const [avatarURL, setAvatarURL] = useState<string>("");

  useEffect(() => {
    if (!organization) return;
    const getImageURL = async () => {
      let url = await getDownloadURL(ref(storage, organization.avatar));
      setAvatarURL(url + "_2000x2000");
    };
    getImageURL();
  }, [organization, storage]);

  return (
    <>
      {organization && (
        <div className="page-header">
          <img alt={organization.name} src={avatarURL} className="header-image" />
        </div>
      )}
    </>
  );
}

export default Header;
