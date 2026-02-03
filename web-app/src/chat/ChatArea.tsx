import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";
import { Heading, Text } from "@react-spectrum/s2";
import { useEffect, useRef, useState } from "react";

import { ChatHeader } from "./chat-header";
import { ChatMessage } from "./chat-message/ChatMessage.tsx";
import { MessageInput } from "./message-input";
import { PlanIndicator } from "./plan-indicator";
import { PlanModal } from "./plan-modal";

export function ChatArea() {
  const { copilotkit } = useCopilotKit();
  const [userInput, setUserInput] = useState<string>("");
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
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

  const isLoading = agent.isRunning;
  const plan = agent.state?.plan ?? null;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {agent.messages.length === 0 && (
            <div className="text-center py-20">
              <Heading level={2}>How can I help you today?</Heading>
              <Text>
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

      {plan && (
        <PlanIndicator
          title={plan.title}
          onOpen={() => setIsPlanModalOpen(true)}
        />
      )}

      <MessageInput
        value={userInput}
        onChange={setUserInput}
        onSend={onSendMessage}
        isLoading={isLoading}
      />

      {isPlanModalOpen && plan && (
        <PlanModal plan={plan} onClose={() => setIsPlanModalOpen(false)} />
      )}
    </div>
  );
}
