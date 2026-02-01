import { ActionButton } from "@react-spectrum/s2";
import ShareIcon from "@react-spectrum/s2/icons/ShareAndroid";
import UserAvatarIcon from "@react-spectrum/s2/icons/UserAvatar";

export function ChatHeader() {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-2"></div>
      <div className="flex items-center gap-2">
        <ActionButton isQuiet aria-label="Share">
          <ShareIcon />
        </ActionButton>
        <UserAvatarIcon />
      </div>
    </div>
  );
}
