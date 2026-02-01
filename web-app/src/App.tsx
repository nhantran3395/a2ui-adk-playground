import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { Provider } from "@react-spectrum/s2";

import { Page } from "./layout";

function App() {
  return (
    <CopilotKitProvider runtimeUrl="http://localhost:4000/copilotkit">
      <Provider background="base">
        <Page />
      </Provider>
    </CopilotKitProvider>
  );
}

export default App;
