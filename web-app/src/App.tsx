import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

function App() {
  return (
    <CopilotKit
      runtimeUrl="http://localhost:4000/copilotkit"
      agent="personal_assistant_agent"
    >
      <MainContent />
      <CopilotSidebar
        defaultOpen={true}
        clickOutsideToClose={false}
        labels={{
          title: "AI Assistant",
          initial: "👋 Hi! I can check the weather or manage your todos.",
        }}
      />
    </CopilotKit>
  );
}

function MainContent() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>My App with CopilotKit + Google ADK</h1>
      <p>Open the sidebar to chat with the AI agent.</p>
    </div>
  );
}

export default App;
