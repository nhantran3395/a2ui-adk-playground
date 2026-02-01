/**
 * A2UI Message Renderer
 *
 * Creates the A2UI message renderer for CopilotKit to render
 * A2UI surfaces/widgets in the chat interface.
 */
import { createA2UIMessageRenderer } from "@copilotkit/a2ui-renderer";

import { theme } from "./theme";

/**
 * A2UI Message Renderer configured with our custom theme
 */
export const A2UIMessageRenderer = createA2UIMessageRenderer({ theme });
