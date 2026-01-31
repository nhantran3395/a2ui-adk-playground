import {
  CopilotKitProvider,
  useAgent,
  useCopilotKit,
} from "@copilotkit/react-core/v2";
import { Provider, Button, TextArea } from "@react-spectrum/s2";
import type { Message } from "@copilotkit/shared";
import { useState } from "react";

function renderChatMessage(message: Message): string {
  switch (message.role) {
    case "user":
    case "assistant":
    case "system": {
      if (typeof message.content === "string") {
        return message.content;
      }
      return "";
    }

    default: {
      return "";
    }
  }
}

function App() {
  return (
    <CopilotKitProvider runtimeUrl="http://localhost:4000/copilotkit">
      <Provider background="base">
        <MainContent />
      </Provider>
    </CopilotKitProvider>
  );
}

function MainContent() {
  const { copilotkit } = useCopilotKit();
  const [userInput, setUserInput] = useState<string>("");

  const { agent } = useAgent({
    agentId: "personal_assistant_agent",
  });

  const onSendMessage = () => {
    agent.addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: userInput,
    });
    copilotkit.runAgent({ agent });
  };

  return (
    <div>
      <section></section>
      <section>
        {agent.messages.map((message) => (
          <div key={message.id} style={{ marginBottom: "0.5rem" }}>
            {renderChatMessage(message)}
          </div>
        ))}
      </section>
      <div>
        <TextArea
          placeholder="Message ..."
          inputMode="text"
          value={userInput}
          onChange={(event) => setUserInput(event)}
        />
        <Button variant="genai" onPress={onSendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default App;
