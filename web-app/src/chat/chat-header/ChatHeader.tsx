import { ActionButton, Avatar } from "@react-spectrum/s2";

export function ChatHeader() {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center gap-2"></div>
      <div className="flex items-center gap-2">
        <ActionButton isQuiet aria-label="Share">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </ActionButton>
        <Avatar src="https://i.pravatar.cc/100?img=12" alt="User" />
      </div>
    </div>
  );
}
