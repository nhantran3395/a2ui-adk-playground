import { Text } from "@react-spectrum/s2";
import SearchIcon from "@react-spectrum/s2/icons/Search";

import type { ToolCall } from "@copilotkit/shared";

const getToolIcon = (name: string) => {
  if (name.includes("search") || name.includes("google")) {
    return <SearchIcon />;
  }

  return <SearchIcon />;
};

const getToolDisplayName = (name: string) => {
  return `${name}()`;
};

const getToolArgs = (args: string) => {
  try {
    const parsed = JSON.parse(args);
    if (typeof parsed === "object") {
      return Object.values(parsed).join(", ");
    }
    return args;
  } catch {
    return args;
  }
};

export function ToolCallDisplay({
  toolCall,
  status,
}: {
  toolCall: ToolCall;
  status: "pending" | "success" | "error";
}) {
  const statusText =
    status === "success"
      ? "Success"
      : status === "error"
        ? "Error"
        : "Running...";

  const bgColor =
    toolCall.function.name.includes("search") ||
    toolCall.function.name.includes("google")
      ? "bg-blue-50 border-blue-200"
      : "bg-orange-50 border-orange-200";

  const iconBgColor =
    toolCall.function.name.includes("search") ||
    toolCall.function.name.includes("google")
      ? "bg-blue-100 text-blue-600"
      : "bg-orange-100 text-orange-600";

  return (
    <div className={`rounded-lg border p-3 ${bgColor}`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-lg p-2 ${iconBgColor}`}>
          {getToolIcon(toolCall.function.name)}
        </div>
        <div className="flex-1 min-w-0">
          <Text>{getToolDisplayName(toolCall.function.name)}</Text>
          <Text>"{getToolArgs(toolCall.function.arguments)}"</Text>
          <Text>{statusText}</Text>
        </div>
      </div>
    </div>
  );
}
