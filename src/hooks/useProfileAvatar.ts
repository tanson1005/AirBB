// useProfileAvatar.ts
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";

const useProfileAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const profileData = useSelector((state: RootState) => state.sliceUser?.profileData);

  useEffect(() => {
    const avatar = profileData?.avatar;
    if (avatar) {
      setAvatarUrl(avatar);
    } else {
      setAvatarUrl('/path/to/default/avatar.png');
    }
  }, [profileData]);

  return avatarUrl;
};

export default useProfileAvatar;
