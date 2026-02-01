import { Button, Text, TextArea } from "@react-spectrum/s2";
import SendIcon from "@react-spectrum/s2/icons/Send";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

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
      <div className="max-w-5xl mx-auto flex flex-col gap-1 items-center">
        <div className="w-4/5 relative flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-2xl px-4 py-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <TextArea
            aria-label="Message input"
            placeholder="Message..."
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            UNSAFE_className="[&_[role=presentation]]:!border-none"
            styles={style({
              width: "full",
            })}
          />
          <div className="flex items-center gap-2">
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
        <Text
          styles={style({
            font: "body-xs",
            fontWeight: "normal",
            textAlign: "center",
            marginX: "auto",
          })}
        >
          AI can make mistakes. Consider checking important information.
        </Text>
      </div>
    </div>
  );
}
