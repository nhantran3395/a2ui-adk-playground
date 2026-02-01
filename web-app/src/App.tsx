import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { Provider } from "@react-spectrum/s2";
import { MainContent } from "./layout/main-content";

function App() {
  return (
    <CopilotKitProvider runtimeUrl="http://localhost:4000/copilotkit">
      <Provider background="base">
        <MainContent />
      </Provider>
    </CopilotKitProvider>
  );
}

export default App;
