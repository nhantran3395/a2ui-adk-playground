import { ActionButton, Avatar, Text } from "@react-spectrum/s2";
import CopyIcon from "@react-spectrum/s2/icons/Copy";
import RefreshIcon from "@react-spectrum/s2/icons/Refresh";
import ThumbDownIcon from "@react-spectrum/s2/icons/ThumbDown";
import ThumbUpIcon from "@react-spectrum/s2/icons/ThumbUp";

import { ToolCallDisplay } from "../tool-call";
import { MessageContent } from "./MessageContent";

import type { Message, ToolCall } from "@copilotkit/shared";

export function ChatMessage({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex gap-3 justify-end">
        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-2xl">
          <Text>
            {typeof message.content === "string" ? message.content : ""}
          </Text>
        </div>
        <Avatar src="https://i.pravatar.cc/100?img=12" alt="User" />
      </div>
    );
  }

  if (message.role === "assistant") {
    const hasToolCalls =
      "toolCalls" in message &&
      message.toolCalls &&
      message.toolCalls.length > 0;
    const content = typeof message.content === "string" ? message.content : "";

    return (
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          ✦
        </div>
        <div className="flex-1 space-y-4 max-w-3xl">
          {hasToolCalls && (
            <div>
              <Text UNSAFE_className="text-xs text-purple-600 font-medium mb-2 flex items-center gap-1">
                <span className="text-purple-400">✦</span> ACTIVE TOOLS
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(message as { toolCalls: ToolCall[] }).toolCalls.map(
                  (toolCall: ToolCall) => (
                    <ToolCallDisplay
                      key={toolCall.id}
                      toolCall={toolCall}
                      status="success"
                    />
                  ),
                )}
              </div>
            </div>
          )}

          {content && (
            <div className="prose prose-sm">
              <MessageContent content={content} />
            </div>
          )}

          {content && (
            <div className="flex items-center gap-1 pt-2">
              <ActionButton isQuiet aria-label="Like">
                <ThumbUpIcon />
              </ActionButton>
              <ActionButton isQuiet aria-label="Dislike">
                <ThumbDownIcon />
              </ActionButton>
              <ActionButton isQuiet aria-label="Copy">
                <CopyIcon />
                <Text>Copy</Text>
              </ActionButton>
              <ActionButton isQuiet aria-label="Regenerate">
                <RefreshIcon />
                <Text>Regenerate</Text>
              </ActionButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
