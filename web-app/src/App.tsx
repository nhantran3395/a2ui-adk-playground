import { CopilotKitProvider, CopilotSidebar } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function App() {
  return (
    <CopilotKitProvider runtimeUrl="http://localhost:4000/copilotkit">
      <MainContent />
      <CopilotSidebar agentId="personal_assistant_agent" />
    </CopilotKitProvider>
  );
}

function MainContent() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>My App with CopilotKit v2 + Google ADK</h1>
      <p>Open the sidebar to chat with the AI agent.</p>
    </div>
  );
}

export default App;
