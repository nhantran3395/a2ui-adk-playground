import { ActionButton, Button, Text, TextArea } from "@react-spectrum/s2";
import SendIcon from "@react-spectrum/s2/icons/Send";

export function MessageInput({
  value,
  onChange,
  onSend,
  isLoading,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-2xl px-4 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <TextArea
            aria-label="Message input"
            placeholder="Message..."
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2 pb-1">
            <ActionButton isQuiet aria-label="Attach file">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </ActionButton>
            <Button
              variant="accent"
              isDisabled={!value.trim() || isLoading}
              onPress={onSend}
              aria-label="Send message"
            >
              <SendIcon />
            </Button>
          </div>
        </div>
        <Text>
          AI can make mistakes. Consider checking important information.
        </Text>
      </div>
    </div>
  );
}
