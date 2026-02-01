import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "../../chat/chat-header";
import { Heading, Text } from "@react-spectrum/s2";
import { useCopilotKit, useAgent } from "@copilotkit/react-core/v2";

import { ChatMessage } from "../../chat/chat-message/ChatMessage.tsx";
import { MessageInput } from "../../chat/message-input";

export function MainContent() {
  const { copilotkit } = useCopilotKit();
  const [userInput, setUserInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { agent } = useAgent({
    agentId: "personal_assistant_agent",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [agent.messages]);

  const onSendMessage = () => {
    if (!userInput.trim()) return;

    agent.addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: userInput,
    });
    setUserInput("");
    copilotkit.runAgent({ agent });
  };

  const isLoading = agent.state === "thinking" || agent.state === "running";

  return (
    <div className="flex h-full bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <ChatHeader />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {agent.messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  ✦
                </div>
                <Heading
                  level={2}
                  UNSAFE_className="text-2xl font-semibold mb-2"
                >
                  How can I help you today?
                </Heading>
                <Text UNSAFE_className="text-gray-500">
                  Ask me anything or start with one of these suggestions
                </Text>
              </div>
            )}
            {agent.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput
          value={userInput}
          onChange={setUserInput}
          onSend={onSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
